import React from "react";
import Chart from "react-apexcharts";
import "./MetricChart.scss";

interface MetricChartProps {
  title: string;
  data: number[];
  description?: string; // Описание метрики (необязательное)
  limit?: number; // Предельное значение (необязательное)
  time: string[]
}

const MetricChart: React.FC<MetricChartProps> = ({ title, data, description, limit, time }) => {
  // Настройки графика
  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: time, 
        labels: {
          style:{
         colors: "var(--text-color)",}, // Цвет текста в легенде
        },
    },
     yaxis: {
      labels: {
        style: {
          colors: "var(--text-color)", // Цвет текста меток Y-оси
        },
      },
    },
    colors: ["var(--primary-color)", "var(--secondary-color)"], // Используем CSS-переменные
    stroke: {
      curve: "smooth",
    },
    legend: {
      labels: {
        colors: "var(--text-color)", // Цвет текста в легенде
      },
    markers: {
      size: 4, // Размер точек на графике
    },
  },
    annotations: {
      yaxis: limit
        ? [
            {
              y: limit,
              borderColor: "var(--secondary-color)",
              label: {
                borderColor: "var(--secondary-color)",
                style: {
                  color: "#fff",
                  background: "var(--secondary-color)",
                },
                text: `Limit: ${limit}`,
              },
            },
          ]
        : [],
    },
  };

  // Серии данных для графика
  const chartSeries = [
    {
      name: title,
      data: data,
    },
    ...(limit
      ? [
          {
            name: "Limit",
            data: Array(data.length).fill(limit), // Горизонтальная линия предельного значения
          },
        ]
      : []),
  ];

  return (
    <div className="metric-chart">
      {/* Заголовок с иконкой вопроса */}
      <div className="chart-header">
        <h3>{title}</h3>
        {description && (
          <div className="info-icon">
            <span className="icon">?</span>
            <div className="tooltip">{description}</div>
          </div>
        )}
      </div>

      {/* График */}
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        width="100%"
        height="300px"
      />
    </div>
  );
};

export default MetricChart;