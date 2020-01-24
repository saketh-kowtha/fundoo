/**
 * @author Kowtha Saketh
 * @description Fundoo App  root files
 */

import React from 'react';
import './index.scss'
import {
    Router,
    Switch,
    Route,
  } from "react-router-dom";

import Login from './src/scenes/Login/Login'
import Dashboard from './src/scenes/Dashboard/Dashboard'
import NotFound from './src/scenes/NotFound/NotFound'


import {LOGIN, SIGNUP, RESETPASSWORD} from './src/constants'

//Creating Routes History 
const createHistory =  require("history").createBrowserHistory;
const history = createHistory();


//History listener to update language param in URL
history.listen((location, action) => {
  if(window.location.href.indexOf("Dashboard") == -1)
    window.history.pushState({}, null, "?lang="+(localStorage.getItem('lang') || 'en'))
})

/**
 * @class App
 * @description Root Component of this project routes are declared here
 */
export default class App extends React.Component {
    render() {
        return (
            <Router history={history} basename={"/"}>
              <Switch>
                <Route path="/login" component={() => <Login view={LOGIN}/>} />
                <Route path="/signup" component={() => <Login view={SIGNUP}/>} />
                <Route path="/resetpassword" component={() => <Login view={RESETPASSWORD} />} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route exact path="/">
                  {() => history.push("/login")}
                </Route>
                <Route component={NotFound}/>
              </Switch>
          </Router>
        )
    }
}
