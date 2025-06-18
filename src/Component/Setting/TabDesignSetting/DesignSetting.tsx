
import { useDispatch, useSelector } from "react-redux";
import "./DesignSettings.scss";
import { RootState } from "../../../state/store";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { setLanguage } from "../../../state/slice/languageSlice";
import { toggleTheme } from "../../../state/slice/themeSlice";

export default function DesignSettings() {
  const dispatch = useDispatch();
  const  language  = useSelector((state: RootState) => state.language.currentLanguage);
  const  theme  = localStorage.getItem("theme")
  const [valuetheme, setTheme] = useState<string>("")
  useLayoutEffect(()=>{
    console.log(theme)
    setTheme(theme == "true"? "dark":"light")
  },[])
  // Обработчик изменения темы
  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value == "dark"){
      setTheme("dark")
      dispatch(toggleTheme(true));
    } else{
      setTheme("light")
      dispatch(toggleTheme(false));
    }
  };

  // Обработчик изменения языка
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };
  return (
    <div className="design-settings">
      <h3>Design Settings</h3>
      <form id="design-settings-form">
        {/* Выбор темы */}
        <div className="form-group">
          <label htmlFor="theme">Theme:</label>
          <select id="theme" className="custom-select"
          value={valuetheme}
          onChange={(e)=>{handleThemeChange(e)}}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        {/* Выбор языка */}
        <div className="form-group">
          <label htmlFor="language">Language:</label>
          <select 
          id="language" 
          className="custom-select"
          value={language}
          onChange={(e)=>{handleLanguageChange(e)}}>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
      </form>
    </div>
  );
}