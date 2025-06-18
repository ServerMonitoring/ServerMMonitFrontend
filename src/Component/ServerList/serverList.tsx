import React from "react";
import { useNavigate } from "react-router-dom";

interface Server {
  idserver: number;
  serverName: string;
  address: string;
  hostname:string;
  adddInfo:string;
}

interface ServerListProps {
  servers: Server[];
}

const ServerList: React.FC<ServerListProps> = ({ servers }) => {
    const navigator = useNavigate()
  return (
    <ul className="server-list">
      {servers.map((server) => (
        <li onClick={()=>{navigator(`/server/${server.idserver}`)}} key={server.idserver} className="server-item">
          <div className="server-info">
            <h3>{server.serverName}</h3>
            <p>{server.hostname + `(${server.address})`}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ServerList;