import React, {Component} from 'react'
import {Icon, Button, Modal} from 'antd'
import './index.less';
import screenfull from 'screenfull';
import {withTranslation, getI18n} from 'react-i18next'
import {connect} from 'react-redux';
import {removeUser} from '@redux/action-creators.js';
import dayjs from 'dayjs'

@connect(
    (state) => {
        return {
            username: state.user.user.username,
            title: state.setTitle

        }
    },
    {
        removeUser,

    }
)

@withTranslation()
class HeaderMain extends Component {
    state = {
        isScreenFull: true,
        isEnglish: getI18n().language !== 'en',
        time: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    screenFull = () => {
        if (screenfull.isEnabled) {
            //全屏切换的方法
            screenfull.toggle();
        }
    }
    changLanguage = () => {
        const {isEnglish} = this.state
        this.props.i18n.changeLanguage(isEnglish ? 'en' : 'zh-CN');
        this.setState({
            isEnglish: !isEnglish
        })
    }
    change = () => {
        this.setState({
            isScreenFull: !this.state.isScreenFull
        })
    }

    componentDidMount() {
        if (screenfull.isEnabled) {
            screenfull.on('change', this.change);
        }
        setInterval(() => {
            this.setState({
                time: dayjs().format('YYYY-MM-DD HH:mm:ss')
            })

        }, 1000)

    }

    componentWillUnmount() {
        screenfull.off('change', this.change)
    }

    // 删除localstorage和redux
    logout = () => {

        Modal.confirm({
            title: '你确定要退出吗',
            onOk: () => {
                this.props.removeUser()
            },
            okText: '确认',
            cancelText: '取消'
        })
    }

    render() {
        const {username, title, t} = this.props
        const {
            isScreenFull,
            isEnglish,
            time
        } = this.state
        return (
            <div className='header-main'>
                <div className='header-main-top'>
                    <Button size='small' onClick={this.screenFull}><Icon
                        type={isScreenFull ? 'fullscreen' : 'fullscreen-exit'}/></Button>
                    <Button size='small' className='header-main-btn'
                            onClick={this.changLanguage}>{isEnglish ? 'English' : '中文'}</Button>
                    <span>欢迎，{username}</span>
                    <Button type="link" onClick={this.logout}>退出</Button>
                </div>
                <div className='header-main-bottom'>
                    <h3>{t(title)}</h3>
                    <span>{time}</span>
                </div>
            </div>
        )
    }
}

export default HeaderMain