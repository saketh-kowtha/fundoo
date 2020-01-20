import React from 'react';
import './index.css'
import {
    Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Login from './src/scenes/Login'
import Dashboard from './src/scenes/Dashboard'

import {LOGIN, SIGNUP, RESETPASSWORD} from './src/constants'

const createHistory =  require("history").createBrowserHistory;
const history = createHistory();   

history.listen((location, action) => {
    window.history.pushState({}, null, "?lang="+(localStorage.getItem('lang') || 'en'))
})

export default class App extends React.Component {
    render() {
        return (
            <Router history={history} basename={"/"}>
              <Switch>
                <Route path="/login" component={() => <Login view={LOGIN}/>} />
                <Route path="/signup" component={() => <Login view={SIGNUP}/>} />
                <Route path="/resetpassword" component={() => <Login view={RESETPASSWORD} />} />
                <Route path="/Dashboard" component={Dashboard} />
              </Switch>
          </Router>
        )
    }
}