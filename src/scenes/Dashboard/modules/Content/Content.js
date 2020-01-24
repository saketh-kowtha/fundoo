import React from 'react'

import '../Content/Content.scss'

import {HashRouter as Router, Switch, Route} from 'react-router-dom'

import Notes from './modules/Notes/Notes'
import Trash from './modules/Trash/Trash'
import Reminders from './modules/Reminders/Reminders'
import Archive from './modules/Archive/Archive'

const createHistory =  require("history").createBrowserHistory;

const history = createHistory();

const Content = (props) => {
    return <div className="content">
            <Router basename={"/Dashboard"}>
              <Switch>
                <Route exact path="/Notes" component={Notes} />
                <Route exact path="/Trash" component={Trash} />
                <Route exact path="/Reminders" component={Reminders} />
                <Route exact path="Archive" component={Archive} />
                <Route exact path="/" component={Notes} />
              </Switch>
          </Router>
    </div>
}

export default Content