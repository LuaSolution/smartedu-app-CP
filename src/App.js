import React, { Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import AppLocale from 'lang'
import { adminRoot } from 'defines'
import { BackTop, Button, Tooltip, notification } from 'antd'
import { UpOutlined, BellOutlined } from '@ant-design/icons'
import { messaging } from 'helpers/Firebase'
import firebase from 'firebase/app'

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ 'views/app')
)

const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ 'views/user')
)

const openNotification = (data) => {
  notification.open({
    message: data.title,
    description: data.body,
    icon: <BellOutlined style={{ color: '#108ee9' }} />,
  })
}

const App = ({ ...props }) => {
  const currentAppLocale = AppLocale[props.locale]

  useEffect(() => {
    if (window.navigator.onLine) {
      console.log('online')
    } else {
      console.log('offline')
    }
  }, [])

  useEffect(() => {
    if (firebase.messaging.isSupported()) {
      messaging.onMessage((payload) => {
        const notifications = JSON.parse(localStorage.getItem('@notifications'))
        localStorage.setItem(
          '@notifications',
          JSON.stringify([
            {
              title: payload.notification.title,
              content: payload.notification.body,
              created_at: null,
              status: 0,
            },
            ...notifications,
          ])
        )

        openNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        })
      })
    }
  }, [])

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <Suspense fallback={<div className="loading" />}>
        <Router>
          <Switch>
            <Route path={adminRoot} component={ViewApp} />
            <Route path="/" component={ViewUser} />
          </Switch>
        </Router>
      </Suspense>
      <BackTop>
        <Tooltip title="Lên đầu trang">
          <Button type="link" icon={<UpOutlined style={{ fontSize: 32 }} />} />
        </Tooltip>
      </BackTop>
    </IntlProvider>
  )
}

const mapStateToProps = ({ authUser, settings }) => {
  const { locale } = settings
  return { locale }
}

export default connect(mapStateToProps, null)(React.memo(App))
