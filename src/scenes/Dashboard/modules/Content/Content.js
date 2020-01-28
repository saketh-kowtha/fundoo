import React from 'react'

import '../Content/Content.scss'

import {HashRouter as Router, useRouteMatch ,Switch, Route, Redirect, withRouter} from 'react-router-dom'

import Layout from './modules/Layout.js'



const Content = (props) => {
  return <div className="content">
              <Switch>
                  <Route exact path={`/Notes`} component={() => <Layout name="notes" />} />
                  <Route path={`/Trash`} component={() => <Layout name="trash" />} />
                  <Route path={`/Reminders`} component={() => <Layout name="reminders" />} />
                  <Route path={`/Archive`} component={() => <Layout name="archive" />} />
                  <Route exact path={`/`} component={() => <Layout name="notes" />} />
              </Switch>
    </div>
}

export default withRouter(Content)