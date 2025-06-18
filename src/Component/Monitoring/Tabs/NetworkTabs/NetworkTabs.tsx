import {useSelector} from "react-redux";
import {RootState} from "../../../../state/RootReduceer.ts";
import {useEffect, useMemo, useState} from "react";
import {getNetworkConnections,getNetInterfaceMetrics} from "../../../../API/metric.ts";
import {addTimeToCurrent, calculateTimeIntervals, extractMetricData} from "../generalfunction.ts";
import {data} from "react-router-dom";
import MetricChart from "../../MetricChart/MetricHart.tsx";

export default function NetworkTAbs({ Timeout }){
    const jwt = useSelector((state: RootState) => state.auth.user.token);
    const [networkConnectionData, setNetworkConnectionData] = useState<any[]>([]);
    const [netInterfaceData, setNetInterfaceData] = useState<any[]>([]);

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

            await getNetInterfaceMetrics(request,jwt)
                .then((response)=>{
                    console.log(response)
                    setNetInterfaceData(response)
                })
            await getNetworkConnections(request,jwt)
                .then((response)=>{
                    console.log(response)
                    setNetworkConnectionData(response)
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

    const dropIn = extractMetricData(netInterfaceData, "dropIn");
    const dropOut = extractMetricData(netInterfaceData, "dropOut");
    const errIn = extractMetricData(netInterfaceData, "errIn");
    const errOut = extractMetricData(netInterfaceData, "errOut");
    const packetsRecv = extractMetricData(netInterfaceData, "packetsRecv");
    const packetsSent = extractMetricData(netInterfaceData, "packetsSent");
    const recv = extractMetricData(netInterfaceData, "recv");
    const sent = extractMetricData(netInterfaceData, "sent");

    const tcp = extractMetricData(networkConnectionData, "tcp");
    const udp = extractMetricData(networkConnectionData, "udp");

    const time = useMemo(() => {
        if (!startTime || !endTime || networkConnectionData.length === 0) return [];
        return calculateTimeIntervals(endTime, startTime, netInterfaceData.length-1 || 1);
    }, [startTime, endTime, networkConnectionData]);
    return(
        <>
            <MetricChart
                title="recv"
                data={recv}
                description=""
                time={time}
            />
            <MetricChart
                title="sent"
                data={sent}
                description=""
                time={time}
            />
            <MetricChart
                title="packetsRecv"
                data={packetsRecv}
                description=""
                time={time}
            />
            <MetricChart
                title="packetsSent"
                data={packetsSent}
                description=""
                time={time}
            />
            <MetricChart
                title="errIn"
                data={errIn}
                description=""
                time={time}
            />
            <MetricChart
                title="errOut"
                data={errOut}
                description=""
                time={time}
            />
            <MetricChart
                title="dropIn"
                data={dropIn}
                description=""
                time={time}
            />
            <MetricChart
                title="dropOut"
                data={dropOut}
                description=""
                time={time}
            />

            <MetricChart
                title="tcp"
                data={tcp}
                description=""
                time={time}
            />
            <MetricChart
                title="udp"
                data={udp}
                description=""
                time={time}
            />
        
        </>
    )
}