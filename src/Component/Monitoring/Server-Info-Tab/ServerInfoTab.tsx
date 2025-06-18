import React from "react";
import "./ServerInfoTab.scss"
import { useTranslation } from "react-i18next";

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
  const {t}=useTranslation();

  return (
    <div className="server-info-tab">
      <h2>{server.name}</h2>
      <ul className="info-list">
        <li>
          <strong>{t('ContentTabs.ServerInfoTabs.Status')}</strong> {server.status === "online" ? "Online" : "Offline"}
        </li>
        <li>
          <strong>{t('ContentTabs.ServerInfoTabs.Address')}</strong> {server.address}
        </li>
        <li>
          <strong>{t('ContentTabs.ServerInfoTabs.OS')}</strong> {server.os}
        </li>
        <li>
          <strong>{t('ContentTabs.ServerInfoTabs.CPU')}</strong> {server.cpu}
        </li>
        <li>
          <strong>{t('ContentTabs.ServerInfoTabs.Memory')}</strong> {server.memory}
        </li>
        <li>
          <strong>{t('ContentTabs.ServerInfoTabs.Disk')}</strong> {server.disk}
        </li>
      </ul>
    </div>
  );
};

export default ServerInfoTab;