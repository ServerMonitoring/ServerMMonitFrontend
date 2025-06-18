import React from "react";
import "./ServerInfoTab.scss"

interface Server {
  id: number;
  name: string;
  address: string;
  status: "online" | "offline";
  os: string;
  cpu: string;
  memory: string;
  disk: string;
}

interface ServerInfoTabProps {
  server: Server;
}

const ServerInfoTab: React.FC<ServerInfoTabProps> = ({ server }) => {
  return (
    <div className="server-info-tab">
      <h2>{server.name}</h2>
      <ul className="info-list">
        <li>
          <strong>Status:</strong> {server.status === "online" ? "Online" : "Offline"}
        </li>
        <li>
          <strong>Address:</strong> {server.address}
        </li>
        <li>
          <strong>OS:</strong> {server.os}
        </li>
        <li>
          <strong>CPU:</strong> {server.cpu}
        </li>
        <li>
          <strong>Memory:</strong> {server.memory}
        </li>
        <li>
          <strong>Disk:</strong> {server.disk}
        </li>
      </ul>
    </div>
  );
};

export default ServerInfoTab;