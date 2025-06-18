import { useSelector } from "react-redux";
import MetricChart from "../../MetricChart/MetricHart";
import { addTimeToCurrent, calculateTimeIntervals, extractMetricData } from "../generalfunction";
import { RootState } from "../../../../state/RootReduceer";
import {useEffect, useMemo, useState} from "react";
import { getMemoryMetrics } from "../../../../API/metric";

 
export default function MemoryTAbs({ Timeout }){
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
            const response = await getMemoryMetrics(id, start, end, jwt);
            setData(response);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        }
    };

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
        updateTimeAndFetch(); 

        const intervalId = setInterval(() => {
            updateTimeAndFetch(); 
        }, 65000);

        return () => clearInterval(intervalId);
    }, [Timeout]);

        const memoryUsed = extractMetricData(data, "memoryUsed");
        const memoryTotal = extractMetricData(data, "memoryTotal");
        const memoryCached = extractMetricData(data, "memoryCached");
        const memoryFree = extractMetricData(data, "memoryFree");
        const memoryUsedPercent = extractMetricData(data, "memoryUsedPercent");
    const time = useMemo(() => {
        if (!startTime || !endTime || data.length === 0) return [];
        return calculateTimeIntervals(endTime, startTime, data.length-1 || 1);
    }, [startTime, endTime, data]);

    //const time = calculateTimeIntervals(endTime,startTime,data.length || 1)
    return(
        <>
        <MetricChart
            title="Memory Used"
            data={memoryUsed}
            description="Это показатель загрузки процессора в процентах. Высокие значения могут указывать на перегрузку системы."
            //limit={memoryTotal[0]}
            time={time}
        />
        <MetricChart
            title="Memory Cached"
            data={memoryCached}
            description="Это показатель загрузки процессора в процентах. Высокие значения могут указывать на перегрузку системы."
            //limit={memoryTotal[0]}
            time={time}
            
        />
        <MetricChart
            title="Memory Free"
            data={memoryFree}
            description="Это показатель загрузки процессора в процентах. Высокие значения могут указывать на перегрузку системы."
            //limit={memoryTotal[0]}
            time={time}
            
        />
         <MetricChart
            title="Memory Used Percent"
            data={memoryUsedPercent}
            description="Это показатель загрузки процессора в процентах. Высокие значения могут указывать на перегрузку системы."
            //limit={memoryTotal[0]}
            time={time}
            
        />
        </>
    )
}