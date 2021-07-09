import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Users = React.lazy(() =>
  import(/* webpackChunkName: "users-users" */ './users')
)
const Partners = React.lazy(() =>
  import(/* webpackChunkName: "users-partners" */ './partners')
)
const Departments = React.lazy(() =>
  import(/* webpackChunkName: "users-departments" */ './departments')
)
const Positions = React.lazy(() =>
  import(/* webpackChunkName: "users-positions" */ './positions')
)
const Permissions = React.lazy(() =>
  import(/* webpackChunkName: "users-permissions" */ './permissions')
)
const MentorCalls = React.lazy(() =>
  import(/* webpackChunkName: "users-mentor-calls" */ './mentorCalls')
)

export default ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/list`}
        render={props => <Users {...props} />}
      />
      <Route
        path={`${match.url}/partners`}
        render={props => <Partners {...props} />}
      />
      <Route
        path={`${match.url}/departments`}
        render={props => <Departments {...props} />}
      />
      <Route
        path={`${match.url}/positions`}
        render={props => <Positions {...props} />}
      />
      <Route
        path={`${match.url}/permissions`}
        render={props => <Permissions {...props} />}
      />
       <Route
        path={`${match.url}/mentor-calls`}
        render={props => <MentorCalls {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
)
