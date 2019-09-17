import Home from "@comps/home";
import Category from '@conts/category'
//将路由统一管理起来方便使用
const routes= [
    {
        path:'/',
        exact:true,
        component:Home

    },
    {
        path:'/category',
        exact:true,
        component:Category

    },

]
export default routes