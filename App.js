/**
 *   
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

import ProtectedRoute from './src/config/ProtectedRoute.js'

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
class App extends React.Component{
	state={
		error: false
	}
	componentDidCatch(error, info) {
        this.setState({
         error: error + "<br />" + info.componentStack.replace(new RegExp('\r?\n','g'), '<br />')
        });
	}
	render(){
		if(this.state.error)
	return <div dangerouslySetInnerHTML={{__html:this.state.error}} />

		return (
			<Router history={history} basename={"/"}>
				<Switch>
					<ProtectedRoute role="login" path="/login" component={() => <Login view={LOGIN}/>} />
					<ProtectedRoute role="login" path="/signup" component={() => <Login view={SIGNUP}/>} />
					<ProtectedRoute role="login" path="/resetpassword" component={() => <Login view={RESETPASSWORD} />} />
					<ProtectedRoute path="/Dashboard" component={Dashboard} />
					<Route exact path="/">
						{() => history.push("/login")}
					</Route>
					<Route component={NotFound}/>
				</Switch>
		</Router>
	)
	}
}

export default App


/**
 * 
 // TODO: 1. New Notes Component
 // TODO: 2. ADD Reminder Modal
 // TODO: 3. Add Labels Dropdown
 // TODO: 5. Testing
 * L
 */