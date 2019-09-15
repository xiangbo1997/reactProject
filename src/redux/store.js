//store共享数据状态管理模块

import {createStore,applyMiddleware} from 'redux';
//引入reducers对状态操作模块dispath调用时自动触发reducers模块的执行
import reducers from './reducers';
//异步action时使用
import thunk from 'redux-thunk';
//与Chrome插件配合使用的组件（调试工具）
import {composeWithDevTools} from 'redux-devtools-extension'
import {isEnv} from '@config';
let store ;
if (isEnv){
    //开发环境
    store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

}else{
    //生产环境
    store = createStore(reducers,applyMiddleware(thunk))
}
export default store