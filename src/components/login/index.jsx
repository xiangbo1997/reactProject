import React, {Component} from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import logo from './logo.png';
import './index.less';
import {connect} from 'react-redux';
import {saveUser} from '../../redux/action-creators'
import {reqLogin} from '../../api'

// 引入存储数据的方法:利用高阶组件
@connect(
    null,
    {saveUser}
)

// 装饰器语法给Login组件添加Form属性（高阶组件）
@Form.create()
class Login extends Component {
    //点击提交时发送Ajax请求
    handleSubmit = (e) => {
        e.preventDefault();
        //检验输入是否合法（合法通过后继续发送请求）(form属性上的方法)
        const {validateFields} = this.props.form


        // 方法一
        /*  validateFields(['username', 'password'], (errors, values) => {
              if (!errors) {
                  const {username, password} = values
                  axios.post('/login ', {
                      username: username,
                      password: password
                  })
                  //请求成功
                      .then((response) => {
                          if (response.data.status === 0) {
                              //数据响应成功
                              message.success('登录成功');
                              // 登录成功将数据保存到redux中和localStorage
                              this.props.saveUser(response.data.data)
                              this.props.history.replace('/')
                              return console.log(response.data.data)
                          } else {
                              //数据响应失败
                              message.error(response.data.msg)

                          }
                      })
                      //请求失败
                      .catch((err) => {
                          console.log(err)
                          message.error('网路请求超时，请联系管理员')
                      })
                  //无论成功和失败都触发，利用此来清空password
                      .finally(()=>{
                          this.props.form.resetFields(['password']);
                           })

              }
              /!*  console.log(errors)
                return message.error('输入的用户名或密码不合法');
              // 发送axios请求
                console.log(values)*!/

          });*/


        validateFields(['username', 'password'], (errors, values) => {
            if (!errors) {
                const {username, password} = values
                reqLogin(username, password)
                //请求成功
                    .then((result) => {
                        message.success('登录成功');
                        this.props.saveUser(result)
                        this.props.history.replace('/')
                    })
                    //请求失败
                    .catch((err) => {

                    })
                    //无论成功和失败都触发，利用此来清空password
                    .finally(() => {
                        this.props.form.resetFields(['password']);
                    })

            }
            /*  console.log(errors)
              return message.error('输入的用户名或密码不合法');
            // 发送axios请求
              console.log(values)*/

        });


    };
    //进行校验的函数方便复用
    validator = (rule, value, callback) => {
        const name = rule.field === 'username' ? '用户名' : '密码';
        if (!value) {
            callback(`请输入${name}`)
            return
        }
        if (value.length < 3) {
            callback(`${name}不少于三位`)
            return
        }
        if (value.length > 13) {
            callback(`${name}最多十三位`)
            return
        }
        const regular = /^[a-zA-Z0-9_]{3,13}$/
        if (!(regular.test(value))) {
            callback(`${name}输入为英文字母,数字或下划线，且为3-13位`)
            return
        }
        callback()
    }

    render() {
        //prop属性中的form的属性
        const {getFieldDecorator} = this.props.form
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className='login-section'>
                    <h3>用户登录</h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {/*  高阶组件，对表单的数据进行验证（第一次调用传两个参数，参数一key（以后使用到的），参数二（表单数据的验证规则）
                            传入的为一个{{rules:[{检验的规则1},{检验的规则2}]}*/}
                            {/*方式一*/}
                            {/* {getFieldDecorator('username',{
                                rules:[
                                    {required:true,message:'请输入用户名'},
                                    {max:13,message:'用户名最多十三位'},
                                    {min:3,message:'用户名不少于三位'},
                                    {pattern:/^[a-zA-Z0-9_]{3,13}$/,message:'用户名输入为英文字母,数字或下划线，且为3-13位'}
                                ]
                            })(<Input prefix={<Icon type='user'/>} placeholder="用户名"/>)}*/}
                            {/*方式二*/}
                            {getFieldDecorator('username', {
                                rules: [
                                    {validator: this.validator}
                                ]
                            })(<Input prefix={<Icon type='user'/>} placeholder="用户名"/>)}

                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {validator: this.validator}//给追加到组件上方便复用
                                ]
                            })(<Input prefix={<Icon type='lock'/>} type="password" placeholder="密码"/>)}

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>

        )
    }
}

export default Login














