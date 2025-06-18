import { useEffect } from "react"
import RouterApp from "./Router/RouterApp"
import { toggleTheme } from "./state/slice/themeSlice"
import { useDispatch } from "react-redux"

function App() {
  const dispatch = useDispatch()
  const themeset = localStorage.getItem('theme') === "true"?true:false
  useEffect(()=>{
 
    dispatch(toggleTheme(themeset))

  },[])
  return (
    <>
      <RouterApp />
    </>
  )
}

export default App
