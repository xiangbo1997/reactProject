import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
//利用高阶组件进行登录校验的的复用
//判断路由和token，
//1.若路由为'/login',且token值存在那么跳转home
//2.若路由不为‘/login’,且token值不存在跳转 login
function withCheckLogin(Withcomponet) {
    // 返回一个新组件
    return connect(
        (state) => ({token: state.user.token}),
        null
    )(class  extends Component {
        static displayName = `CheckLogin(${Withcomponet.displayName || Withcomponet.name || 'Component'})`;

        render() {
            const {token, ...rest} = this.props
            const {location :{pathname}} = this.props;
            if (pathname === '/login' && token) {
                return <Redirect to='/'/>
            }
            if (pathname !== '/login' && !token) {

                return <Redirect to='/login'/>

            }

            //将rute的三大属性传给login组件
            return (<Withcomponet{...rest}/>)
        }
    })

}

export default withCheckLogin