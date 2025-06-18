import React, { useEffect, useState } from "react";
import ServerList from "../../Component/ServerList/serverList";
import "./MenuServer.scss"
import { useSelector } from "react-redux";
import { getmininfoServer } from "../../API/serverapi";
import { RootState } from "../../state/RootReduceer";

interface Server {
  idserver: number;
  name: string;
  address: string;
  hostname:string;
  adddInfo:string;
}

const ServersPage: React.FC = () => {
  const [servers, setServers] = useState<Server[]>([]);
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
      <h1>Servers</h1>
      <ServerList servers={servers} />
    </div>
  );
};

export default ServersPage;