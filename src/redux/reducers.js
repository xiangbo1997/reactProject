//调用store的dispatch方法会触发该模块的调用
//根据prevstate和action生成新的newstate
//用于将要暴露出去的多个状态整合成一个暴露出去
import {combineReducers} from 'redux'
import {SAVE_USER } from './action-types'
import {setItem,getItem} from "../untils/storage";
//初始化数据信息（redux为内存存储，刷新会丢失所以初始化）
const initUser ={
        user:getItem('user')|| {},
        token:getItem('token')|| ''
}

function user(prevstate=initUser,action) {
    switch (action.type) {
        case SAVE_USER :
            //将数据存储到localStorage
            setItem('user',action.data.user)
            setItem('token',action.data.token)
            return action.data
        default :
            return prevstate
    }
}
export default combineReducers({
    user
})