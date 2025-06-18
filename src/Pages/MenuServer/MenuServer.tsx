import React, { useEffect, useState } from "react";
import ServerList from "../../Component/ServerList/serverList";
import "./MenuServer.scss"
import { useSelector } from "react-redux";
import { getmininfoServer } from "../../API/serverapi";
import { RootState } from "../../state/RootReduceer";
import { useTranslation } from "react-i18next";

interface Server {
  idserver: number;
  name: string;
  address: string;
  hostname:string;
  adddInfo:string;
}

const ServersPage: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const {t}= useTranslation()
  const jwt  = useSelector((state:RootState) =>( state.auth.user.token));
  // Загрузка данных из JSON-файла
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
    <div className="servers-page">
      <h1>{t("MenuServers")}</h1>
      <ServerList servers={servers} />
    </div>
  );
};

export default ServersPage;