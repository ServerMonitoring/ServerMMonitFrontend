import { useTranslation } from "react-i18next";
import "./SidebarRight.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getmininfoServer } from "../../../API/serverapi";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/RootReduceer";

interface Server {
  idserver: number;
  serverName: string;
  address: string;
  hostname:string;
  adddInfo:string;
}

function extractLastNumberFromURL(url: string): number | null {
  const matches = url.match(/\d+/g);
  return matches && matches.length > 0 ? parseInt(matches[matches.length - 1], 10) : null;
}

export default function SideBarRight() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [servers, setServers] = useState<Server[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false); // Состояние для скрытия/раскрытия панели
  const id = extractLastNumberFromURL(window.location.href);
   const jwt  = useSelector((state:RootState) =>( state.auth.user.token));

  useEffect(() =>{
    async function getAllServer(){
      await getmininfoServer(jwt).then((response)=>{

          console.log(response.data)
          setServers(response.data)
    })
    }
    getAllServer()
  
  },[])

  return (
    <aside className={`netdata-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="h2">

      {
        !isCollapsed &&  <h2>{t("Monitoring.SideBarRight.h2")}</h2>
      }
              {/* Кнопка-стрелочка */}
      <button
        className="toggle-button"
        onClick={() => setIsCollapsed(!isCollapsed)} // Переключение состояния
      >
        {isCollapsed ? ">" : "<"}
      </button>
      </div>

      {/* Заголовок и список серверов */}
      {!isCollapsed && (
        <>
          <ul id="sidebar-server-list">
            {servers.map((server) => (
              <li key={server.idserver}>
                <a href={`/server/${server.idserver}`} className={server.idserver === id ? "active" : ""}>
                  {server.serverName?server.serverName: server.address }
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}