import React, { useState } from "react";
import MetricChart from "../MetricChart/MetricHart";
import ServerDetails from "../Tabs/GeneralTabs/GeneralTabs";
import CPUTAbs from "../Tabs/CPUTabs/CPUTabs";
import MemoryTAbs from "../Tabs/MemoryTabs/MemoryTabs";
import DiskTAbs from "../Tabs/DiskTabs/DiskTabs";
import GPUTAbs from "../Tabs/GPUTabs/GPUTabs";
import MetricsAbs from "../Tabs/MetrisTabs/MetrisTabs";
import NetworkTAbs from "../Tabs/NetworkTabs/NetworkTabs";
import SwapTAbs from "../Tabs/SwapTabs/SwapTabs";
import "./Timerange.scss";

interface Metrics {
  cpu: number[];
  memory: number[];
  disk: number[];
}



const ContentTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cpu");
  const [Timeout, setTimeRange] = useState("5m"); // По умолчанию "1 час"
  const [isTimeSelectorVisible, setIsTimeSelectorVisible] = useState(false); // Видимость переключателя времени

  return (
    <div className="content-tabs">
      {/* Контейнер для табов и триггера */}
      <div className="tabs-container">
        {/* Триггер для выпадающего меню */}
        <div
          className="time-range-trigger"
          onMouseEnter={() => setIsTimeSelectorVisible(true)}
          onMouseLeave={() => setIsTimeSelectorVisible(false)}
        >
          <h1>⏰</h1>
        </div>

        {/* Выпадающее меню */}
        {isTimeSelectorVisible && (
          <div
            className={`time-range-selector ${isTimeSelectorVisible ? "visible" : ""}`}
            onMouseEnter={() => setIsTimeSelectorVisible(true)}
            onMouseLeave={() => setIsTimeSelectorVisible(false)}
          >
            <button
              className={Timeout === "1m" ? "active" : ""}
              onClick={() => setTimeRange("1m")}
            >
              1 Minute
            </button>
            <button
              className={Timeout === "5m" ? "active" : ""}
              onClick={() => setTimeRange("5m")}
            >
              5 Minutes
            </button>
            <button
              className={Timeout === "15m" ? "active" : ""}
              onClick={() => setTimeRange("15m")}
            >
              15 Minutes
            </button>
            <button
              className={Timeout === "1h" ? "active" : ""}
              onClick={() => setTimeRange("1h")}
            >
              1 Hour
            </button>
            <button
              className={Timeout === "1d" ? "active" : ""}
              onClick={() => setTimeRange("1d")}
            >
              1 Day
            </button>
            <button
              className={Timeout === "1w" ? "active" : ""}
              onClick={() => setTimeRange("1w")}
            >
              1 Week
            </button>
            <button
              className={Timeout === "1M" ? "active" : ""}
              onClick={() => setTimeRange("1M")}
            >
              1 Month
            </button>
          </div>
        )}

        {/* Вкладки */}
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "Общие характеристики" ? "active" : ""}`}
            onClick={() => setActiveTab("Общие характеристики")}
          >
            Общие характеристики
          </button>
          <button
            className={`tab-button ${activeTab === "cpu" ? "active" : ""}`}
            onClick={() => setActiveTab("cpu")}
          >
            CPU
          </button>
          <button
            className={`tab-button ${activeTab === "memory" ? "active" : ""}`}
            onClick={() => setActiveTab("memory")}
          >
            Memory
          </button>
          <button
            className={`tab-button ${activeTab === "disk" ? "active" : ""}`}
            onClick={() => setActiveTab("disk")}
          >
            Disk
          </button>
          <button
            className={`tab-button ${activeTab === "gpu" ? "active" : ""}`}
            onClick={() => setActiveTab("gpu")}
          >
            GPU
          </button>

          <button
            className={`tab-button ${activeTab === "network" ? "active" : ""}`}
            onClick={() => setActiveTab("network")}
          >
            Network
          </button>
          <button
            className={`tab-button ${activeTab === "swap" ? "active" : ""}`}
            onClick={() => setActiveTab("swap")}
          >
            Swap
          </button>
        </div>
      </div>

      {/* Графики */}
      <div className="tab-content">
        {activeTab === "Общие характеристики" && <ServerDetails />}
        {activeTab === "cpu" && <CPUTAbs Timeout={Timeout}/>}
        {activeTab === "memory" && <MemoryTAbs Timeout={Timeout} />}
        {activeTab === "disk" && <DiskTAbs Timeout={Timeout} />}
        {activeTab === "gpu" && <GPUTAbs Timeout={Timeout} />}
        {activeTab === "network" && <NetworkTAbs Timeout={Timeout} />}
        {activeTab === "swap" && <SwapTAbs Timeout={Timeout} />}
      </div>
    </div>
  );
};

export default ContentTabs;