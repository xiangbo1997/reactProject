import {Layout} from 'antd';
import React, {Component} from 'react'
import logo from '@assets/images/logo.png';
import './index.less'
import LeftNav from './left-nav'
import withCheckLogin from '@conts/with-check-login'
import HeaderMain from './header-main';
import {withTranslation} from 'react-i18next'

const {Header, Content, Footer, Sider} = Layout;

//利用高阶组件追加t属性
@withTranslation()
//给父组件添加登录校验（给父组件加）
@withCheckLogin
class BasicLayout extends Component {
    state = {
        collapsed: false,
        isDisplay: true
    };
    //点击消失或隐藏
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({
            collapsed,
            isDisplay: !this.state.isDisplay
        });
    };

    render() {
        const {t} = this.props
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    {/*//logol 标题*/}
                    <div className="basic-layout-logo">
                        <img src={logo} alt="logo"/>
                        <h1 style={{display: this.state.isDisplay ? 'block' : 'none'}}>{t('title')}</h1>
                    </div>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0, height: 80}}>
                        <HeaderMain/>
                    </Header>

                    <Content style={{margin: '25px 16px 0 16px'}}>

                        <div style={{padding: 24, background: '#fff', minHeight: 470}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>欢迎使用硅谷后台管理系统~~</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default BasicLayout