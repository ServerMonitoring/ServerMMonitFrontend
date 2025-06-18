import { Route, Routes } from "react-router-dom";
import { AllPage, No_AuthPage } from "../Data/UrlArray";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/RootReduceer";


export default function RouterApp(){
    
    const dispatch = useDispatch();
    const isAuth = useSelector((state:RootState) => state.auth.isAuthenticated);
    const Role = useSelector((state:RootState) => state.auth.user.role);
  if(isAuth){

    return(
        <>
            <Routes>
               {
                AllPage.map((Page)=>{
                        return(
                            <Route path={Page.url} element={Page.element} />
                        )
                })
               }
            </Routes>
        </>
    )
  } else{
    return(
        <>
            <Routes>
               {
                No_AuthPage.map((Page)=>{
                        return(
                            <Route path={Page.url} element={Page.element} />
                        )
                })
               }
            </Routes>
        </>
    )
  }

}