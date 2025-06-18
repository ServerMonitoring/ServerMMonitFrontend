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
  // Функция для загрузки данных
  /*const fetchData = async () => {
    try {
        const now = new Date();
        const endTime = new Date(now.getTime() - 1 * 60 * 1000);
        const startTime = addTimeToCurrent(Timeout)

        setStartTime(startTime);
        setEndTime(endTime.toISOString());

        console.log("Начальное время"+ startTime)
        console.log("Конечно время"+ endTime.toISOString())

        await getMemoryMetrics(id,startTime,endTime,jwt)
        .then((response)=>{
            console.log(response)
            setData(response)
        })
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };
      useEffect(() => {
            fetchData(); // Загружаем данные при монтировании

            const intervalId = setInterval(() => {
            fetchData(); // Загружаем данные каждую минуту

            }, 60000); // 60000 мс = 1 минута

    // Очистка интервала при размонтировании
    return () => clearInterval(intervalId);
  }, [Timeout]);*/

    // Функция для загрузки данных
    const fetchData = async (start: string, end: string) => {
        try {
            const response = await getMemoryMetrics(id, start, end, jwt);
            setData(response);
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