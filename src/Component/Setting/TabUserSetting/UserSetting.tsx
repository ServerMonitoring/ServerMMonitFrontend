import React, { useEffect, useState } from "react";
import "./UserSettings.scss";
import { deleteOneUser, getListUsers } from "../../../API/adminapi";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/RootReduceer";
import { signUp } from "../../../API/authapi";
import { useTranslation } from "react-i18next";

interface User {
  userId: number;
  name: string;
  surname: string;
  patronymic: string;
  department: string;
  position: string;
  login: string;
  preferredLanguage: any;
  addInfo: string;
  role: string;
}

export default  function UserSettings() {
  const [listuser,setListUser] = useState<User[]>([])
  const {t}=useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null); // Текущий редактируемый пользователь
  const jwt  = useSelector((state:RootState) => state.auth.user.token);
  const [newUser, setNewUser] = useState({
    name: "",
    surname:"",
    patronymic: "",
    login: "",
    department: "",
    position: "",
    password: "",
    preferredLanguage: 0,
    addInfo: "",
    role: "USER",
  });

  useEffect(()=>{
      function getInfo(){
      getListUsers(jwt)
      .then((res)=>{
        setListUser(res);
      }) 
    }
    getInfo();
  },[])

  // Открытие/закрытие модального окна
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditingUser(null); // Очищаем редактируемого пользователя
    setNewUser({ name: "", surname:"",   patronymic: "",login: "", department: "", position: "", preferredLanguage: 0,addInfo: "", password: "", role: "USER" });
  };

  // Обработка изменений в форме
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Добавление нового пользователя
  const addUser = async () => {
    if (!newUser.name || !newUser.password || !newUser.login) return;
    await signUp(newUser,jwt)
    .then(()=>{
      window.location.reload();
    })
    toggleModal();
  };

  // Редактирование пользователя
  const editUser = () => {
    if (!editingUser || !newUser.name || !newUser.password) return;
    toggleModal();
  };

  // Удаление пользователя
  const deleteUser =async (id: number) => {
    await deleteOneUser(id,jwt)
    .then(()=>{
      console.log("Пользователь удален")
      window.location.reload();
    })
    console.log("Удалили")
  };

  // Открытие модального окна для редактирования
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="user-settings">
      <h3>{t('SettingsTabs.UserTabs.h3')}</h3>

      {/* Таблица пользователей */}
      <table className="user-table">
        <thead>
          <tr>
            <th>{t('SettingsTabs.UserTabs.Login')}</th>
            <th>{t('SettingsTabs.UserTabs.Name')}</th>
            <th>{t('SettingsTabs.UserTabs.Surname')}</th>
            <th>{t('SettingsTabs.UserTabs.Department')}</th>
            <th>{t('SettingsTabs.UserTabs.Position')}</th>
            <th>{t('SettingsTabs.UserTabs.Role')}</th>
            <th>{t('SettingsTabs.UserTabs.Actions')}</th>
          </tr>
        </thead>
        <tbody>
          {listuser.map((user:User) => (
            <tr key={user.userId}>
              <td>{user.login}</td>
              <td>{user.name}</td>
               <td>{user.surname}</td>
              <td>{user.department}</td>
              <td>{user.position}</td>
              <td>{user.role}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteUser(user.userId)}>
                  {t('SettingsTabs.UserTabs.Delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Кнопка добавления пользователя */}
      <button className="add-user-btn" onClick={toggleModal}>
        {t('SettingsTabs.UserTabs.AddUser')}
      </button>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>{editingUser ? "Edit User" : "Add New User"}</h4>
            <form>
              <label>
                {t('SettingsTabs.UserTabs.Name')}
                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={newUser.name}
                  onChange={handleInputChange}
                />
              </label>
                            <label>
                {t('SettingsTabs.UserTabs.Surname')}
                <input
                  type="text"
                  name="surname"
                  placeholder="Enter surname"
                  value={newUser.surname}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                {t('SettingsTabs.UserTabs.Login')}
                <input
                  type="text"
                  name="login"
                  placeholder="Enter login"
                  value={newUser.login}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                {t('SettingsTabs.UserTabs.Department')}
                <input
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  value={newUser.department}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                {t('SettingsTabs.UserTabs.Position')}
                <input
                  type="text"
                  name="position"
                  placeholder="Enter position"
                  value={newUser.position}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                {t('SettingsTabs.UserTabs.Password')}
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                {t('SettingsTabs.UserTabs.Role')}
                <select name="role" value={newUser.role} className="custom-select" onChange={handleInputChange}>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={toggleModal}>
                  {t('SettingsTabs.UserTabs.Cancel')}
                </button>
                <button
                  type="button"
                  className="save-btn"
                  onClick={editingUser ? editUser : addUser}
                >
                  {t('SettingsTabs.UserTabs.Save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}