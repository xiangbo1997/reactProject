import React, {Component} from 'react'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import routes from './config/routes'

export default class App extends Component {
    render() {
        return (
            <Router>
                {
                    routes.map((route,index)=>{
                        // return  <Route path={route.path}exact={route.exact} component={route.component} key={index}/>
                        return <Route {...route} key={index} />
                         })
                }


            </Router>
        )
    }
}