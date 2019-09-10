import Home from "../components/home";
import Login from "../components/login";
//将路由统一管理起来方便使用
const routes= [
    {
        path:'/',
        exact:true,
        component:Home

    },
    {
        path:'/login',
        exact:true,
        component:Login
    }
]
export default routes