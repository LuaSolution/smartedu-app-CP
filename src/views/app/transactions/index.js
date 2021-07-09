import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Orders = React.lazy(() =>
  import(/* webpackChunkName: "transactions-orders" */ './orders')
)
const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/orders`}
        render={props => <Orders {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
)
export default Dashboards
