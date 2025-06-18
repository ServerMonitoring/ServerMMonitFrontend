import React, { useEffect, useState } from "react";
import "./ServerSettings.scss";
import { getmininfoServer } from "../../../API/serverapi";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/RootReduceer";

interface Server {
  idserver: number;
  serverName: string;
  address: string;
  hostname:string;
  addInfo:string;
}

interface newServer{
  serverName: string;
  address: string;
  addInfo:string;
}

export default function ServerSettings() {
  const [servers, setServers] = useState<Server[]>([
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token,settoken]= useState("");
  const [newServer, setNewServer] = useState<newServer>({
    serverName: "",
    address:"",
    addInfo:""
  });
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
  // Открытие/закрытие модального окна
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Обработка изменений в форме
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewServer((prev) => ({ ...prev, [name]: value }));
  };

  // Добавление нового сервера
  const addServer = () => {
    if (!newServer.name || !newServer.ip) return;

    setNewServer();
  };

  // Удаление сервера
  const deleteServer = (id: number) => {
    setServers(servers.filter((server) => server.idserver !== id));
  };

  return (
    <div className="server-settings">
      <h3>Server Settings</h3>

      {/* Таблица серверов */}
      <table className="server-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>IP Address</th>
            <th>Hostname</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr key={server.idserver}>
              <td>{server.serverName}</td>
              <td>{server.address}</td>
              <td>{server.hostname}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteServer(server.idserver)}>
                  Delete
                </button>
              </td>
              <td>
                <button className="delete-btn" onClick={() => deleteServer(server.idserver)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Кнопка добавления сервера */}
      <button className="add-server-btn" onClick={toggleModal}>
        Add Server
      </button>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Add New Server</h4>
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  placeholder="Enter server name"
                  value={newServer.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                IP Address:
                <input
                  type="text"
                  name="ip"
                  placeholder="Enter server IP"
                  value={newServer.ip}
                  onChange={handleInputChange}
                />
              </label>
                <button type="button" className="delete-btn" onClick={addServer}>
                  Add Server
                </button>
                            <label>
                Cерверный токен:
                <input
                  type="text"
                  name="Token"
                  placeholder="Token Server"
                  color="white"
                  value={jwt || ""}
                />
              </label>
              <div className="modal-actions">
                <button type="button" className="delete-btn" onClick={toggleModal}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}