/*
包含生成n个action对象的工厂函数模块
        同步action和异步action
*/
//引入action-types
import {SAVE_USER} from './action-types'

//同步action返回值是一个对象

export  const saveUser =(value)=>({type:SAVE_USER,data:value})

//异步action返回值是一个函数
export const xx =()=> {
    return (dispatch)=>{

         }
}