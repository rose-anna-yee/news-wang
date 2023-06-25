import React from 'react'
import {HashRouter} from 'react-router-dom'
import Detail from '../views/news/Details'
import News from '../views/news/News'
import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Login from '../views/login/Login'
import NewSandBox from '../views/newsandbox/NewSandBox'
export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/news" component={News}/>
            <Route path="/detail/:id" component={Detail}/>
            {/* <Route path="/" component={NewsSandBox}/> */}
            <Route path="/" render={()=>
                localStorage.getItem("token")?
                <NewSandBox></NewSandBox>:
                <Redirect to="/login"/>
            }/>
      </Switch>
      
    </HashRouter>
  )
}
