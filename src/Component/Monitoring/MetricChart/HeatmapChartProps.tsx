import React from "react";
import Chart from "react-apexcharts";
import "./MetricChart.scss";

interface HeatmapChartProps {
    title: string;
    data: number[][];        // двумерный массив: [ядра][время]
    xLabels: string[];       // временные метки по X
    yLabels: string[];       // названия ядер по Y (Core 0, Core 1, …)
    description?: string;    // описание графика
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ title, data, xLabels, yLabels, description }) => {
    // Преобразуем data в формат ApexCharts series

    const chartSeries = yLabels.map((coreLabel, coreIndex) => ({
        name: coreLabel,
        data: xLabels.map((xLabel, timeIndex) => ({
            x: xLabel,
            y: data[timeIndex][coreIndex] ?? null
        })),

    }));

    const allValues = data.flat(); // [числа от всех ядер и всех времен]
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);

/*// Можешь округлять до ближайших 5/10 — будет красивее:
    const step = (max - min) / 4;
    const rounded = (val: number) => Math.round(val * 10) / 10; // например, округление до 0.1

    const dynamicRanges = [
        { from: min, to: min + step, color: "#00A100" },
        { from: min + step, to: min + step * 2, color: "#128FD9" },
        { from: min + step * 2, to: min + step * 3, color: "#FFB200" },
        { from: min + step * 3, to: max, color: "#FF4560" }
    ].map(range => ({
        from: rounded(range.from),
        to: rounded(range.to),
        color: range.color
    }));*/
    const [v0, v1, v2, v3, v4] =
        min === max
            ? [min, min + 1, min + 2, min + 3, min + 4]
            : [
                Math.round(min*100)/100,
                Math.round((min + (max - min) * 0.25)*100)/100 ,
                Math.round((min + (max - min) * 0.5)*100)/100 ,
                Math.round((min + (max - min) * 0.75)*100)/100 ,
                Math.round(max*100)/100 ,
            ];
    const dynamicRanges = [
        { from: v0, to: v1, color: "#00A100" },
        { from: v1, to: v2, color: "#128FD9" },
        { from: v2, to: v3, color: "#FFB200" },
        { from: v3, to: v4, color: "#FF4560" },
    ];

    const chartOptions = {
        chart: {
            type: "heatmap" as const,
            toolbar: {
                show: false,
            },
            background: " [\"var(--primary-color)\", \"var(--secondary-color)\"]", // <-- изменение фона под тему
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: dynamicRanges
                },
                // Отключаем автоматическое затемнение/осветление
                shadeIntensity: 0.0,
                useFillColorAsStroke: true,
            },
        },
        fill: {
            opacity: 1               // полная непрозрачность
        },
        xaxis: {
            type: "category",
            labels: {
                style: {
                    colors: "var(--text-color)",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "var(--text-color)",
                },
            },
        },
        stroke: {
            curve: "smooth",
        },
        tooltip: {
            enabled: true,
            theme: "dark",
        },
    };

    return (
        <div className="metric-chart">
            <div className="chart-header">
                <h3>{title}</h3>
                {description && (
                    <div className="info-icon">
                        <span className="icon">?</span>
                        <div className="tooltip">{description}</div>
                    </div>
                )}
            </div>

            <Chart
                options={chartOptions}
                series={chartSeries}
                type="heatmap"
                width="100%"
                height="400px"
            />
        </div>
    );
};

export default HeatmapChart;
