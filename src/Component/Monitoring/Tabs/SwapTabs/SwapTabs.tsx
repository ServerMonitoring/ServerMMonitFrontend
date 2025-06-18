import {useSelector} from "react-redux";
import {RootState} from "../../../../state/RootReduceer.ts";
import {useEffect, useMemo, useState} from "react";
import {getSwapMetrics} from "../../../../API/metric.ts";
import {addTimeToCurrent, calculateTimeIntervals, extractMetricData} from "../generalfunction.ts";
import MetricChart from "../../MetricChart/MetricHart.tsx";

export default function SwapTAbs({ Timeout }){

    const jwt = useSelector((state: RootState) => state.auth.user.token);
    const [data, setData] = useState<any[]>([]);

    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const id = extractLastNumberFromURL(window.location.href);

    function extractLastNumberFromURL(url: string): number | null {
        const matches = url.match(/\d+/g);
        return matches && matches.length > 0 ? parseInt(matches[matches.length - 1], 10) : null;
    }

    const fetchData = async (start: string, end: string) => {
        try {

            const request = {
                "metricTimeCriteria":{
                    "startTime":start,
                    "endTime":end,
                    "serverID":id
                }
            }

            await getSwapMetrics(request,jwt)
                .then((response)=>{
                    console.log(response)
                    setData(response)
                })
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    };
    // Перерасчёт времени и вызов fetchData
     const updateTimeAndFetch = () => {
        const now = new Date();
        const end = new Date(now.getTime() - 1 * 60 * 1000).toISOString();
        const start = addTimeToCurrent(Timeout);

        setStartTime(start);
        setEndTime(end);

        console.log("Начальное время", start);
        console.log("Конечное время", end);

        fetchData(start, end);
    };

    useEffect(() => {
        updateTimeAndFetch(); // при монтировании и смене Timeout

        const intervalId = setInterval(() => {
            updateTimeAndFetch(); // каждую минуту
        }, 65000);

        return () => clearInterval(intervalId);
    }, [Timeout]);

    const swapFree = extractMetricData(data, "swapFree");
    const swapPercentUsed = extractMetricData(data, "swapPercentUsed");
    const swapTotal = extractMetricData(data, "swapTotal");
    const swapUsed = extractMetricData(data, "swapUsed");

    const time = useMemo(() => {
        if (!startTime || !endTime || data.length === 0) return [];
        return calculateTimeIntervals(endTime, startTime, data.length-1 || 1);
    }, [startTime, endTime, data]);

    return(
        <>
            <MetricChart
                title="swapFree"
                data={swapFree}
                description=""
                time={time}
            />
            <MetricChart
                title="swapPercentUsed"
                data={swapPercentUsed}
                description=""
                time={time}
            />
            <MetricChart
                title="swapUsed"
                data={swapUsed}
                description=""
                time={time}
            />
        </>
    )
}