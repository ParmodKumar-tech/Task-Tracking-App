import { useRoutes } from "react-router-dom"
import NotFound from "./pages/not_found/NotFound"
import DashboardPage from "./pages/dashboard/DashboardPage"
import RegisterPage from "./pages/register/RegisterPage"
import LoginPage from "./pages/login/LoginPage";


const PageRoutes=()=>{
  

  let elements=useRoutes([
    {path:"/" ,element:<DashboardPage/>},
    {path:"/register",element:<RegisterPage/>},
    {path:"/login",element:<LoginPage/>},
    {path:"*",element:<NotFound/>}
  ])

  return elements;
}
export default PageRoutes;