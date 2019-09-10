//调用store的dispatch方法会触发该模块的调用
//根据prevstate和action生成新的newstate
//用于将要暴露出去的多个状态整合成一个暴露出去
import {combineReducers} from 'redux'
import {} from './action-types'
function xxx(prevstate='',action) {
    switch (action.type) {
        default :
            return prevstate
    }
}
export default combineReducers({
    xxx
})