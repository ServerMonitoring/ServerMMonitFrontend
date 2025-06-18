import React, { useEffect, useState } from "react";
import SideBarRight from "../../Component/Monitoring/SideBarRight/SideBarRight";
import ContentTabs from "../../Component/Monitoring/ContentTabs/ContentTabs"
import "./Monitoring.scss"
import { getmininfoServer } from "../../API/serverapi";
import { RootState } from "../../state/RootReduceer";
import { useSelector } from "react-redux";

interface Server {
  idserver: number;
  name: string;
  address: string;
  status: "online" | "offline";
  metrics: {
    cpu: number[];
    memory: number[];
    disk: number[];
  };
}


export default function MonitoringPage() {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const jwt = useSelector((state: RootState) => state.auth.user.token);
  // Загрузка данных из JSON-файла
  useEffect(() => {
     async function getAllServer(){
          await getmininfoServer(jwt)
          .then((response) => {
              setServers(response.data);
              const id = extractLastNumberFromURL(window.location.href);
              const found = response.data.find((server:Server) => server.idserver == id);
              if (found) {
                 setSelectedServer(found);
              }
      })
      .catch((error) => console.error("Error loading server data:", error));
        }
        getAllServer()
  }, []);

  function extractLastNumberFromURL(url: string): number | null {
    const matches = url.match(/\d+/g);
    return matches && matches.length > 0 ? parseInt(matches[matches.length - 1], 10) : null;
  }

  if (!selectedServer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="monitoring-page">
      {/* Боковая панель */}
      <div className="sidebaritems">
        <SideBarRight />
      </div>
      {/* Основной контент */}
      <div className="main-content">
        <ContentTabs />
      </div>
    </div>
  );
}