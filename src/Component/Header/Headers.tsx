import {  useState } from "react"
import "./headers.scss"
import { setLanguage } from "../../state/slice/languageSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { useTranslation } from "react-i18next"
import { toggleTheme } from "../../state/slice/themeSlice"
import Avatar from "../Avatar/Avatar"

export default function Headers(){
  const isAuth = useSelector((state:RootState) => state.auth.isAuthenticated);
  const {t}= useTranslation();

  const dispatch = useDispatch();
  const selectedLang = useSelector((state:RootState) => state.language.currentLanguage);
  const selectedTheme = useSelector((state:RootState) => state.theme.isDarkMode);
  const ArrHeadersRight=()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuOpenTheme, setIsMenuOpenTheme] = useState(false); // Состояние для видимости меню
      // Обработчик выбора языка
  const handleLanguageClick = (lang: string) => {
    dispatch(setLanguage(lang));
    setIsMenuOpen(false); // Закрываем меню после выбора
  };
  const handleThemeClick = (theme:boolean) => {
    dispatch(toggleTheme(theme));
    setIsMenuOpenTheme(false); // Закрываем меню после выбора
  };
    if(isAuth){
      return [
        <li><a href="/setting">{t('Headers.ElementSetting')}</a></li>,
        <li><a href="/server">{t('Headers.ElementServer')}</a></li>,
        <li><a href="/help">{t('Headers.ElementHelp')}</a></li>,
        <Avatar />
      ]
    } else{
      return     (
      <>
      <div
      className="language-dropdown"
      onMouseEnter={() => setIsMenuOpenTheme(true)}
      onMouseLeave={() => setIsMenuOpenTheme(false)}
    >
      {/* Кнопка с выбранным языком */}
      <button className="language-button" onClick={() => handleThemeClick(!selectedTheme)}>
      {selectedTheme ? (
        <span className="icon moon">🌙</span>
      ) : (
        <span className="icon sun">☀️</span>
      )}
    </button>
    </div>
      <div
      className="language-dropdown"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      {/* Кнопка с выбранным языком */}
      <button className="language-button">
      {t('Headers.Language')}: {selectedLang}
      </button>

      {/* Выпадающее меню */}
      {isMenuOpen && (
        <ul className="dropdown-menu">
          <li>
            <a  onClick={() => handleLanguageClick("en")}>
              English
            </a>
          </li>
          <li>
            <a  onClick={() => handleLanguageClick("ru")}>
              Русский
            </a>
          </li>
        </ul>
      )}
    </div>
    </>)
    }
  }
    return(
        <header className="netdata-header">
        <div className="header-left">
          <img src="/icons.png"></img>
          <h1>Server Monitoring</h1>
        </div>
        <div className="header-right">
          <nav>
            <ul>
                <ArrHeadersRight />
            </ul>
          </nav> 
        </div>
      </header>
    )
}