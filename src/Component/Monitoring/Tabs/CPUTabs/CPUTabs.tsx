import { useSelector } from "react-redux";
import { RootState } from "../../../../state/RootReduceer";
import {useEffect, useMemo, useState} from "react";
import MetricChart from "../../MetricChart/MetricHart";
import {addTimeToCurrent, calculateTimeIntervals, extractMetricData} from "../generalfunction";
import {getCpuMetrics} from "../../../../API/metric.ts";
import HeatmapChart from "../../MetricChart/HeatmapChartProps.tsx";


export default function CPUTAbs({ Timeout }){

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

            await getCpuMetrics(request,jwt)
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


    const cpuPercentTotalLoad = extractMetricData(data, "cpuPercentTotalLoad");
    const cpuTimeUser = extractMetricData(data, "cpuTimeUser");
    const cpuTimeSystem = extractMetricData(data, "cpuTimeSystem");
    const cpuTimeIdle = extractMetricData(data, "cpuTimeIdle");
    const cpuTimeInterrupt = extractMetricData(data, "cpuTimeInterrupt");
    const cpuTimeDpc = extractMetricData(data, "cpuTimeDpc");
    const ctxSwitches = extractMetricData(data, "ctxSwitches");
    const interrupts = extractMetricData(data,"interrupts")
    const softInterrupts = extractMetricData(data,"softInterrupts");
    const syscalls = extractMetricData(data,"syscalls");
    const currentFreq = extractMetricData(data,"currentFreq");


    function extractCoreLoadData(metricData: any[]): number[][] {
        return metricData.map(entry => {
            if (!entry.cores || !Array.isArray(entry.cores)) return [];

            // Сортируем по coreIndex, чтобы всегда был один и тот же порядок
            const sortedCores = [...entry.cores].sort((a, b) => a.coreIndex - b.coreIndex);

            return sortedCores.map(core => core.corePercentLoad);
        });
    }
    function extractCoreNames(metricData: any[]): string[] {
        if (!metricData.length || !metricData[0].cores || !Array.isArray(metricData[0].cores)) {
            return [];
        }

        // Сортируем ядра по coreIndex, чтобы порядок был правильный
        const sortedCores = [...metricData[0].cores].sort((a, b) => a.coreIndex - b.coreIndex);

        // Формируем массив имён, ядра нумеруем с 0
        return sortedCores.map(core => `Core ${core.coreIndex - 1}`);
    }


    //TODO для ядер сделать типа BAR
    const cores = extractCoreLoadData(data)
    const coresName = extractCoreNames(data)

    const time = useMemo(() => {
        if (!startTime || !endTime || data.length === 0) return [];
        return calculateTimeIntervals(endTime, startTime, data.length-1 || 1);
    }, [startTime, endTime, data]);


    return(
        <>
            <MetricChart
                title="cpuPercentTotalLoad"
                data={cpuPercentTotalLoad}
                description=""
                time={time}
            />
            <MetricChart
                title="cpuTimeUser"
                data={cpuTimeUser}
                description=""
                time={time}
            />
            <MetricChart
                title="cpuTimeSystem"
                data={cpuTimeSystem}
                description=""
                time={time}
            />
            <MetricChart
                title="cpuTimeIdle"
                data={cpuTimeIdle}
                description=""
                time={time}
            />
            <MetricChart
                title="cpuTimeInterrupt"
                data={cpuTimeInterrupt}
                description=""
                time={time}
            />
            <MetricChart
                title="cpuTimeDpc"
                data={cpuTimeDpc}
                description=""
                time={time}
            />
            <MetricChart
                title="ctxSwitches"
                data={ctxSwitches}
                description=""
                time={time}
            />
            <MetricChart
                title="interrupts"
                data={interrupts}
                description=""
                time={time}
            />
            <MetricChart
                title="softInterrupts"
                data={softInterrupts}
                description=""
                time={time}
            />
            <MetricChart
                title="syscalls"
                data={syscalls}
                description=""
                time={time}
            />
            <MetricChart
                title="currentFreq"
                data={currentFreq}
                description=""
                time={time}
            />

            <HeatmapChart
                title="CPU Core Load Heatmap"
                data={cores}              // двумерный массив: [ядро][время]
                xLabels={time}                 // время по X
                yLabels={coresName} // ядра по Y
                description="Тепловая карта загрузки ядер процессора за выбранный интервал времени."
            />

        </>
    )
}

