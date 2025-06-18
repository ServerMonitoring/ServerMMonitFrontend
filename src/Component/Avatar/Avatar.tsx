import { useState } from "react";
import "./Avatar.scss"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/slice/authslice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../state/store";

export default function Avatar(){
      const urlLogin = "/auth"
        // Получаем ник из Redux
      const username = useSelector((state: RootState) => state.auth.user.username);
      const urlLK = "/profile"
      const navigator = useNavigate();
      const dispatch = useDispatch();
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const handleOpenProfileClick = () => {
          navigator(urlLK);
          setIsMenuOpen(false); // Закрываем меню после выбора
        };
        const handleGotoHomeClick = () => {
          dispatch(logout());
          navigator(urlLogin);
          setIsMenuOpen(false); // Закрываем меню после выбора
        };
    return(
        <>
        <div className="user-avatar" id="user-avatar"       
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}>
        <span>{username?.charAt(0).toUpperCase()}</span> 
        {isMenuOpen && (
        <ul className="dropdown-menu">
          <li>
            <a onClick={()=>{handleOpenProfileClick()}}>
              Профиль
            </a>
          </li>
          <li>
            <a onClick={() => {handleGotoHomeClick()}}>
              Выйти из Аккаунта
            </a>
          </li>
        </ul>
      )}
      </div>
      </>
    )
}