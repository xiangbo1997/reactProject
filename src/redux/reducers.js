//调用store的dispatch方法会触发该模块的调用
//根据prevstate和action生成新的newstate
//用于将要暴露出去的多个状态整合成一个暴露出去
import {combineReducers} from 'redux'
import {
  SAVE_USER,
  REMOVE_USER,
  SET_TITLE,
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_SUCCESS
} from './action-types'
import {setItem, getItem, removeItem} from "../untils/storage";
//初始化数据信息（redux为内存存储，刷新会丢失所以初始化）
const initUser = {
  user: getItem('user') || {},
  token: getItem('token') || ''
}

//对用户数据进行操作的函数（返回一个新的状态）
function user(prevstate = initUser, action) {
  switch (action.type) {
    case SAVE_USER :
      //将数据存储到localStorage
      setItem('user', action.data.user)
      setItem('token', action.data.token)
      return action.data
    case REMOVE_USER:
      removeItem('user');
      removeItem('token');
      return {
        user: {},
        token: ''
      }
    default :
      return prevstate
  }
}

//对页面中的title进行操做（更新）
function setTitle(prevstate = '', action) {
  switch (action.type) {
    case SET_TITLE :
      return action.data
    default :
      return prevstate

  }

}


//对分类数据进行操作
function categories(prevstate = [], action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS :
      return action.data;
    case ADD_CATEGORIES_SUCCESS :
      return [...prevstate, action.data]
    case UPDATE_CATEGORIES_SUCCESS :
      return prevstate.map((category) => {
        if (category._id === action.data._id) {
          return action.data;
        }
        return category;
      });
    case DELETE_CATEGORIES_SUCCESS :
      return prevstate.filter((category) => {
        console.log(action.data)
        if (category._id !== action.data) {
          return action.data;
        }
      });
    default :
      return prevstate
  }
}

export default combineReducers({
  user,
  setTitle,
  categories
})
