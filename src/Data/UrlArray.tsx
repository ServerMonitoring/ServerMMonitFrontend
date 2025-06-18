import { useEffect, useState } from "react";
import Loader from "../Component/Loader/Lodader";
import NotFoundPage from "../Pages/404error/NotFound";
import ErrorServer from "../Pages/500error/ErrorServer";
import HelpPage from "../Pages/Help Page/HelpPage";
import LoginPage from "../Pages/Login/Login";
import ServersPage from "../Pages/MenuServer/MenuServer";
import MonitoringPage from "../Pages/Monitoring/MonitoringPage";
import ProfileUser from "../Pages/ProfileUser/ProfileUser";
import SettingsPage from "../Pages/Setting/Setting";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/RootReduceer";

interface UrlPage{
    name: string,
    element: JSX.Element,
    url: string

}

export const AllPage: UrlPage[]= [
    {
        name: "Server_Page",
        element: <MonitoringPage />,
        url: "/server/:id"
    },
    {
        name: "Login_Page",
        element: <LoginPage />,
        url: "/auth"
    },
    {   name: "NorFound_Page",
        element: <NotFoundPage />,
        url: "*"
    },
    {   name: "ErrorServer_Page",
        element: <ErrorServer />,
        url: "/errorserver"
    },    
    {   name: "Setting_Page",
        element: <SettingsPage />,
        url: "/setting"
    },
    {
        name:"Menu_Server_Page",
        element: <ServersPage />,
        url: "/server"
    },
    {
        name:"Help_Page",
        element: <HelpPage />,
        url: "/help"
    }, 
    {
        name:"Help_Page",
        element: <Loader />,
        url: "/loader"
    },
    {
        name:"ProfileUser_Page",
        element: <ProfileUser />,
        url: "/profile"
    },

]

export const No_AuthPage: UrlPage[]= [

    {
        name: "Login_Page",
        element: <LoginPage />,
        url: "/auth"
    },
    {   name: "NorFound_Page",
        element: <NotFoundPage />,
        url: "*"
    },
    {   name: "ErrorServer_Page",
        element: <ErrorServer />,
        url: "/errorserver"
    }
]
export const UserPage: UrlPage[] =[

    {   name: "NorFound_Page",
        element: <NotFoundPage />,
        url: "*"
    },
    {   name: "ErrorServer_Page",
        element: <ErrorServer />,
        url: "/errorserver"
    },    
    {   name: "Setting_Page",
        element: <SettingsPage />,
        url: "/setting"
    },
    {
        name:"Menu_Server_Page",
        element: <ServersPage />,
        url: "/server"
    },
    {
        name: "Server_Page",
        element: <MonitoringPage />,
        url: "/server/:id"
    },
    {
        name:"Help_Page",
        element: <HelpPage />,
        url: "/help"
    } 
]


// Функция для получения элемента по имени
export function getPageElementByName(name: string): JSX.Element | null {
    const [Page,SetPage]=useState(No_AuthPage);
    const dispatch = useDispatch();
    const role  = useSelector((state:RootState) => state.auth.user.role);
    const auth = useSelector((state:RootState) => state.auth.isAuthenticated);
    useEffect(()=>{
        function selectPage(){
            if(auth){
                if(role == "admin"){
                    SetPage(AllPage);
                }else{
                    SetPage(UserPage);
                }
            } else{
                SetPage(No_AuthPage);
            }
        }
        selectPage();
    },[])
    const page = Page.find(page => page.name === name);
    return page ? page.element : null;
}