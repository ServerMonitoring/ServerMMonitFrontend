import { useState } from "react";
import "./Avatar.scss"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/slice/authslice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../state/store";
import { useTranslation } from "react-i18next";

export default function Avatar(){
      const {t} = useTranslation();
      const urlLogin = "/auth"
      const username = useSelector((state: RootState) => state.auth.user.username);
      const urlLK = "/profile"
      const navigator = useNavigate();
      const dispatch = useDispatch();
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const handleOpenProfileClick = () => {
          navigator(urlLK);
          setIsMenuOpen(false); 
        };
        const handleGotoHomeClick = () => {
          dispatch(logout());
          navigator(urlLogin);
          setIsMenuOpen(false); 
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
              {t('Avatar.Profile')}
            </a>
          </li>
          <li>
            <a onClick={() => {handleGotoHomeClick()}}>
              {t('Avatar.Logout')}
            </a>
          </li>
        </ul>
      )}
      </div>
      </>
    )
}