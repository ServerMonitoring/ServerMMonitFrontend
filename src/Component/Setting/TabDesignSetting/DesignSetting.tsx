
import { useDispatch, useSelector } from "react-redux";
import "./DesignSettings.scss";
import { RootState } from "../../../state/store";
import { ChangeEvent, useEffect, useLayoutEffect, useState } from "react";
import { setLanguage } from "../../../state/slice/languageSlice";
import { toggleTheme } from "../../../state/slice/themeSlice";
import { useTranslation } from "react-i18next";

export default function DesignSettings() {
  const dispatch = useDispatch();
  const  language  = useSelector((state: RootState) => state.language.currentLanguage);
  const  theme  = localStorage.getItem("theme")
  const [valuetheme, setTheme] = useState<string>("")
  const {t}=useTranslation();
  useLayoutEffect(()=>{
    console.log(theme)
    setTheme(theme == "true"? "dark":"light")
  },[])

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value == "dark"){
      setTheme("dark")
      dispatch(toggleTheme(true));
    } else{
      setTheme("light")
      dispatch(toggleTheme(false));
    }
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };
  return (
    <div className="design-settings">
      <h3>{t('SettingsTabs.DesignTabs.h3')}</h3>
      <form id="design-settings-form">
        <div className="form-group">
          <label htmlFor="theme">T{t('SettingsTabs.DesignTabs.labelone')}</label>
          <select id="theme" className="custom-select"
          value={valuetheme}
          onChange={(e)=>{handleThemeChange(e)}}>
            <option value="dark">{t('SettingsTabs.DesignTabs.Black')}</option>
            <option value="light">{t('SettingsTabs.DesignTabs.White')}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="language">{t('SettingsTabs.DesignTabs.Language')}</label>
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