// 封装axio代码简化发送请求

import axios from 'axios';
import {message} from "antd";
import  store  from '../redux/store'


// 创建axios实例
const instance = axios.create({
        baseURL: 'http://localhost:3000/api',
        timeout: 5000,
    })
//设置请求拦截器
instance.interceptors.request.use(
    // config就是发送请求的配置信息（请求方法、请求头、请求参数。。。）
    (config) => {

        const {token} = store.getState().user
        if(token){
            //追加公共的请求头
            config.headers.authorization = `Bearer ${token}`;

        }
        return config
    },
    //几乎不会触发（两个请求拦截器，第一个失败后，第二个的失败才会触发）
    (err) => {
        console.log('请求发送失败')
    }
);
//设置响应拦截器
instance.interceptors.response.use(
    // 响应成功
    (response) => {
        if (response.data.status === 0) {
            //数据响应成功(功能)
            return (response.data.data)

        } else {
            //数据响应失败（功能）
            message.error(response.data.msg)
            return Promise.reject(response.data.msg)

        }
    },
    // 响应失败
    (err) => {
        console.log(err)
        message.error('网路请求超时，请联系管理员')
        return Promise.reject('网路请求超时，请联系管理员')
    }
)

export default  instance