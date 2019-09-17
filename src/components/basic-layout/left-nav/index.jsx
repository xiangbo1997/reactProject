import React, {Component} from 'react'
import {Icon, Menu} from "antd";
import menus from '@config/menus'
import {withRouter, Link} from 'react-router-dom'
import {withTranslation} from 'react-i18next'
import {connect} from 'react-redux';
import {setTitle} from '@redux/action-creators.js'

const {SubMenu} = Menu;

//引入更新title的方法
@connect(
    null,
    {
        setTitle
    }
)
@withTranslation()
@withRouter
class LeftNav extends Component {
    //点击跳转路由
    creatItem = (menu) => {
        return <Menu.Item key={menu.key}>
            <Link to={menu.key}>
                <Icon type={menu.icon}/>
                <span>{this.props.t(menu.title)}</span>
            </Link>
        </Menu.Item>
    }
    creatMenus = () => {
        return menus.map((menu) => {
            //判断是否有二级菜单
            if (menu.children) {
                return <SubMenu key={menu.key} title={
                    <span>
                                <Icon type={menu.icon}/>
                                <span>{this.props.t(menu.title)}</span>
                                </span>}>
                    {menu.children.map((cmenu) => {
                        return this.creatItem(cmenu)
                    })}
                </SubMenu>
            } else {
                return this.creatItem(menu)
            }
        })
    }
    findOpenKeys = (pathname) => {
        for (let i = 0; i < menus.length; i++) {
            const menu = menus[i];
            if (menu.children) {
                for (let j = 0; j < menu.children.length; j++) {
                    const cMenu = menu.children[j];
                    if (cMenu.key === pathname) {
                        return menu.key;
                    }
                }
            }
        }
    }
    findTitle = (pathname) => {
        for (let i = 0; i < menus.length; i++) {
            const menu = menus[i];
            if (menu.children) {
                for (let j = 0; j < menu.children.length; j++) {
                    const cMenu = menu.children[j];
                    if (cMenu.key === pathname) {
                        return cMenu.title;
                    }
                }
            } else {
                if (menu.key === pathname) {
                    return menu.title;
                }
            }
        }
    }
    select = ({key}) => {
        const title = this.findTitle(key)
        this.props.setTitle(title)

    }

    componentDidMount() {
        const {location: {pathname}} = this.props;
        const title = this.findTitle(pathname);
        this.props.setTitle(title);
    }

    render() {
        const {pathname} = this.props.location;
        const menus = this.creatMenus();
        const openKeys = this.findOpenKeys(pathname)
        return (
            <Menu
                theme="dark"
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={[openKeys]}
                mode="inline"
                onSelect={this.select}
            >
                {
                    menus
                }

            </Menu>
        )
    }
}

export default LeftNav