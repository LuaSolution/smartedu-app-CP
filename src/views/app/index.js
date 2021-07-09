import React, { useEffect } from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import AppLayout from './layout'
import ColorSwitcher from 'components/common/ColorSwitcher'
import {
  isMultiColorActive,
  defaultColor,
  isDarkSwitchActive,
  UserRole,
} from 'defines'
import { getCurrentColor, setCurrentColor } from 'helpers/Utils'

// import CSS
import 'assets/admin/simple-line-icons/css/simple-line-icons.css'

const color =
  isMultiColorActive || isDarkSwitchActive ? getCurrentColor() : defaultColor
setCurrentColor(color)
import(`assets/admin/sass/themes/gogo.${color}.scss`).then((res) => {
  console.log('theme changed !')
})

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
)
const Surveys = React.lazy(() =>
  import(/* webpackChunkName: "surveys" */ './surveys')
)
const Users = React.lazy(() =>
  import(/* webpackChunkName: "users" */ './users')
)
const Managers = React.lazy(() =>
  import(/* webpackChunkName: "managers" */ './managers')
)
const Transactions = React.lazy(() =>
  import(/* webpackChunkName: "transactions" */ './transactions')
)
const Exams = React.lazy(() =>
  import(/* webpackChunkName: "exams" */ './exams')
)
const Analytics = React.lazy(() =>
  import(/* webpackChunkName: "analytics" */ './analytics')
)
const Settings = React.lazy(() =>
  import(/* webpackChunkName: "settings" */ './settings')
)

const roleTable = [UserRole.Root, UserRole.Admin, UserRole.Mentor]

const App = ({ match }) => {
  useEffect(() => {
    if (!localStorage.getItem('@token')) {
      window.location.href = '/login'
    } else {
      const _user = JSON.parse(localStorage.getItem('@current_user'))
      if (!roleTable.includes(parseInt(_user.level))) {
        window.location.href = '/unauthorized'
      }
    }
  }, [])

  return (
    <>
      {isMultiColorActive && <ColorSwitcher />}
      <AppLayout>
        <div className="dashboard-wrapper">
          <Switch>
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/surveys`}
              render={(props) => <Surveys {...props} />}
            />
            <Route
              path={`${match.url}/users`}
              render={(props) => <Users {...props} />}
            />
            <Route
              path={`${match.url}/managers`}
              render={(props) => <Managers {...props} />}
            />
             <Route
              path={`${match.url}/transactions`}
              render={(props) => <Transactions {...props} />}
            />
            <Route
              path={`${match.url}/exams`}
              render={(props) => <Exams {...props} />}
            />
            <Route
              path={`${match.url}/analytics`}
              render={(props) => <Analytics {...props} />}
            />
            <Route
              path={`${match.url}/settings`}
              render={(props) => <Settings {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </div>
      </AppLayout>
    </>
  )
}

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu
  return { containerClassnames }
}

export default withRouter(connect(mapStateToProps, null)(App))
