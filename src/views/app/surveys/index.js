import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Default = React.lazy(() =>
  import(/* webpackChunkName: "surveys-default" */ './default')
)

const Questions = React.lazy(() =>
  import(/* webpackChunkName: "surveys-questions" */ './questions')
)

const Categories = React.lazy(() =>
  import(/* webpackChunkName: "surveys-categories" */ './question-categories')
)

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={props => <Default {...props} />}
      />
      <Route
        path={`${match.url}/questions`}
        render={props => <Questions {...props} />}
      />
      <Route
        path={`${match.url}/question-categories`}
        render={props => <Categories {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
)
export default Dashboards
