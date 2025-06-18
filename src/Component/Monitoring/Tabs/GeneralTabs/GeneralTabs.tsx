import React, { useEffect, useState } from "react";
import "./GeneralTabs.scss";
import { RootState } from "../../../../state/RootReduceer";
import  { getStaticMetrics } from "../../../../API/metric";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface Tab {
  id: string;
  label: string;
  icon: string;
  content: JSX.Element;
}

export default function ServerDetails() {
  const [activeTab, setActiveTab] = useState("general");
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [serverData, setServerData] = useState<any>(null); // Данные сервера
  const jwt = useSelector((state: RootState) => state.auth.user.token);
  const {t}=useTranslation();
  function extractLastNumberFromURL(url: string): number | null {
    const matches = url.match(/\d+/g);
    return matches && matches.length > 0 ? parseInt(matches[matches.length - 1], 10) : null;
  }

  useEffect(() => {
    const id = extractLastNumberFromURL(window.location.href);
    if (id) {
      async function fetchServerInfo() {
        try {
          await getStaticMetrics(jwt, id)
          .then((response)=>{
            console.log(response.data)
            setServerData(response.data[0]); 
          })
          console.log(serverData)
        } catch (error) {
          console.error("Ошибка при загрузке данных сервера:", error);
        }
      }
      fetchServerInfo();
    }
  }, [jwt]);

  const tabs: Tab[] = [
    {
      id: "general",
      label: "Общие",
      icon: "📋",
      content: (
        <div className="tab-content">
          {serverData ? (
            <>
              <p><strong>{t('GeneralTabs.serverName')}</strong> {serverData.serverName || "Не указано"}</p>
              <p><strong>{t('GeneralTabs.ipAddress')}</strong> {serverData.address || "Не указано"}</p>
              <p><strong>{t('GeneralTabs.osInfo')}</strong> {serverData.osInfo || "Не указано"}</p>
              <p><strong>{t('GeneralTabs.additionalInfo')}</strong> {serverData.addInfo || "Не указано"}</p>
            </>
          ) : (
            <p>{t('GeneralTabs.loadingData')}</p>
          )}
        </div>
      ),
    },
    {
      id: "cpu",
      label: "Процессор",
      icon: "💻",
      content: (
        <div className="tab-content">
          {serverData ? (
            <>
              <p><strong>{t('GeneralTabs.cpuModel')}</strong> {serverData.cpuModel || "Не указано"}</p>
              <p><strong>{t('GeneralTabs.cpuCoresPhysical')}</strong> {serverData.cpuCountCoresPhysical || "Не указано"}</p>
              <p><strong>{t('GeneralTabs.cpuCoresLogical')}</strong> {serverData.cpuCountCores || "Не указано"}</p>
              <p><strong>{t('GeneralTabs.maxFrequency')}</strong> {serverData.maxFreq ? `${serverData.maxFreq} MHz` : "Не указано"}</p>
              <p><strong>{t('GeneralTabs.minFrequency')}</strong> {serverData.minFreq ? `${serverData.minFreq} MHz` : "Не указано"}</p>
            </>
          ) : (
            <p>{t('GeneralTabs.loadingData')}</p>
          )}
        </div>
      ),
    }
  ];

  // Плавное обновление контента
  const handleTabChange = (tabId: string) => {
    setIsContentVisible(false); // Скрываем текущий контент
    setTimeout(() => {
      setActiveTab(tabId);
      setIsContentVisible(true); // Показываем новый контент
    }, 300); // Задержка для анимации
  };

  return (
    <div className="server-details-container">
      {/* Панель вкладок */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => handleTabChange(tab.id)}
          >
            <span className="icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Содержимое активной вкладки */}
      <div className={`tab-content-wrapper ${isContentVisible ? "visible" : ""}`}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}