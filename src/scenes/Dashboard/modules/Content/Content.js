import React from 'react'

import '../Content/Content.scss'

import {HashRouter as Router, useRouteMatch ,Switch, Route, Redirect, withRouter} from 'react-router-dom'

import Layout from './modules/Layout.js'

import UpdateNotes from '../../../../components/Notes/UpdateNotes'

import geti18N from '../../../../strings'

const {notes, trash, archive, reminders} = geti18N()

import Search from '../../modules/Content/modules/Search'

const Content = (props) => {
  return <div className="content">
              <Switch>
                  <Route exact path={`/Notes`} component={() => <Layout name={notes} />} />
                  <Route path={`/Trash`} component={() => <Layout name={trash} />} />
                  <Route path={`/Reminders`} component={() => <Layout name={reminders} />} />
                  <Route path={`/Archive`} component={() => <Layout name={archive} />} />
                  <Route exact path={`/`} component={() => <Redirect to={'/Notes'} />} />
                  <Route exact path={`/Note/:id`} component={UpdateNotes} />
                  <Route exact path={`/Search/:query`} component={Search} />
              </Switch>
    </div>
}

export default withRouter(Content)