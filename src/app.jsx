import React, {Component,Suspense} from 'react'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import routes from './config/routes'
import BasicLayout from '@comps/basic-layout'
import NoMatch from '@comps/basic-layout/no-match'
import Login from '@conts/login'
import { Spin } from 'antd'
export default class App extends Component {
    render() {
        return (
            <Suspense fallback={<Spin size='large' />}>
                <Router>
                    <Switch>
                        <Route path={'/login'} component={Login} exact/>
                        <BasicLayout>
                            <Switch>
                                {
                                    routes.map((route,index)=>{
                                        // return  <Route path={route.path}exact={route.exact} component={route.component} key={index}/>
                                        return <Route {...route} key={index} />
                                    })
                                }
                                <Route component={NoMatch}/>
                            </Switch>
                        </BasicLayout>

                    </Switch>

                </Router>
            </Suspense>


        )
    }
}