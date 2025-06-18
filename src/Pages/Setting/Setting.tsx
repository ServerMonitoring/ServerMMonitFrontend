import{ useState } from "react";
import "./Setting.scss"
import UserSettings from "../../Component/Setting/TabUserSetting/UserSetting";
import DesignSettings from "../../Component/Setting/TabDesignSetting/DesignSetting";
import OtherSettings from "../../Component/Setting/TabOtherSetting/OtherSetting";
import ServerSettings from "../../Component/Setting/TabServerSetting/ServerSetting";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
// Компонент для вкладок
const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("design-settings"); // Состояние активной вкладки
    const userRole = useSelector((state: RootState) => state.auth.user.role);
    // Обработчик переключения вкладок
    const handleTabClick = (tab:string) => {
      setActiveTab(tab);
    };
  
    return (
      <main className="netdata-content">
        <section id="settings" className="page active">
          <h2>Settings</h2>
          {

             userRole == 'ADMIN'? <div className="tabs">
             <button
               className={`tab-button ${activeTab === "user-settings" ? "active" : ""}`}
               onClick={() => handleTabClick("user-settings")}
             >
               User
             </button>
             <button
               className={`tab-button ${activeTab === "server-settings" ? "active" : ""}`}
               onClick={() => handleTabClick("server-settings")}
             >
               Server
             </button>
             <button
               className={`tab-button ${activeTab === "design-settings" ? "active" : ""}`}
               onClick={() => handleTabClick("design-settings")}
             >
               Design Settings
             </button>
{           //  <button
            //   className={`tab-button ${activeTab === "other-settings" ? "active" : ""}`}
          //     onClick={() => handleTabClick("other-settings")}
           //  >
            //</div>   Other Settings
           //  </button>
             }
           </div> : <div className="tabs">
            <button
              className={`tab-button ${activeTab === "design-settings" ? "active" : ""}`}
              onClick={() => handleTabClick("design-settings")}
            >
              Design Settings
            </button>
{       //     <button
          //    className={`tab-button ${activeTab === "other-settings" ? "active" : ""}`}
             // onClick={() => handleTabClick("other-settings")}
          //</div>  >
           //   Other Settings
           //</section> </button>
           }
          </div>
          }
          <div className="tab-content">
            {activeTab === "user-settings" && <UserSettings />}
            {activeTab === "server-settings" && <ServerSettings />}
            {activeTab === "design-settings" && <DesignSettings />}
            {//activeTab === "other-settings" && <OtherSettings />
            }
          </div>
        </section>
      </main>
    );
  };
  
 export default SettingsPage;