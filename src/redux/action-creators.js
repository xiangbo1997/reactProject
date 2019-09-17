/*
包含生成n个action对象的工厂函数模块
        同步action和异步action
*/
//引入action-types
import {
    SAVE_USER,
    REMOVE_USER,
    SET_TITLE,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORIES_SUCCESS,
    UPDATE_CATEGORIES_SUCCESS,
    DELETE_CATEGORIES_SUCCESS
    } from './action-types'
import {
    reqGetCategories,
    reqAddGetCategory,
    reqUpdateGetCategory,
    reqDeleteGetCategory
} from '@api'
//同步action返回值是一个对象
//添加用户信息的方法
export  const saveUser =(value)=>({type:SAVE_USER,data:value});
//删除用户信息的方法
export  const removeUser = ()=>({type:REMOVE_USER });

//更新title标题的方法
export  const  setTitle = (value)=>{
    return{
        type:SET_TITLE,
        data:value
    }
}

//同步action获取后台传输过来的分类数据
export  const getCategoriesSuccess = (categories)=>({type:GET_CATEGORIES_SUCCESS,data:categories})

//异步action返回值是一个函数
//获取分类数据
export  const getCategories= ()=>{
    return async (dispatch)=>{
        //获取请求成功返回的分类数据
        const result = await reqGetCategories()
        // 调用dispatch方法进而触发reducers函数
        dispatch(getCategoriesSuccess(result))

    }

}

//添加分类数据
export  const addCategorySuccess = (category)=>({type:ADD_CATEGORIES_SUCCESS,data:category})

//添加分类数据
export  const addCategory= (categoryName)=>{
    return async (dispatch)=>{
        //获取请求成功返回的分类数据
        const result = await reqAddGetCategory(categoryName);
        console.log(categoryName);
        console.log(result)
        // 调用dispatch方法进而触发reducers函数
        dispatch(addCategorySuccess(result))

    }

}





//更新修改分类数据
export  const updateCategorySuccess = (category)=>({type:UPDATE_CATEGORIES_SUCCESS,data:category})

//修改分类数据
export  const updateCategory= (categoryId, categoryName)=>{
    return async (dispatch)=>{
        //获取请求成功返回的分类数据
        const result = await reqUpdateGetCategory(categoryId,categoryName);
        // 调用dispatch方法进而触发reducers函数
        dispatch(updateCategorySuccess(result))

    }

}
//删除数据

export  const deleteCategorySuccess = (category)=>({type:DELETE_CATEGORIES_SUCCESS,data:category})

//修改分类数据
export  const deleteCategory= (categoryId)=>{
    return async (dispatch)=>{
        //获取请求成功返回的分类数据
        const result = await reqDeleteGetCategory(categoryId);
        // 调用dispatch方法进而触发reducers函数
        dispatch(deleteCategorySuccess(result))

    }

}