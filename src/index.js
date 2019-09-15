import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import store from './redux/store';
import {Provider} from 'react-redux';
import  './assets/less/index.less'
import './i18n/index';
ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,document.getElementById('root'))

