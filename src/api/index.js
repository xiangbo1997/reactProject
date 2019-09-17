import axios from './requset'
//请求登陆
export const reqLogin = (username, password)=>axios.post('/login',{username, password});
//请求分类列表数据
export const reqGetCategories = ()=>axios.get('/category/get');
//请求添加列表数据(添加)
export const reqAddGetCategory = (categoryName)=>axios.post('/category/add',{categoryName});

// 更新（修改）数据列表
export const reqUpdateGetCategory = (categoryId,categoryName)=>axios.post('/category/update',{categoryId,categoryName});

//删除数据列表
export const reqDeleteGetCategory = (categoryId)=>axios.post('/category/delete',{categoryId});