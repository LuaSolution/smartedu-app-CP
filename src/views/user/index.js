import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import 'assets/user/ifa-common.css'

const Main = React.lazy(() =>
  import(/* webpackChunkName: "user-main" */ './main')
)
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "user-profile" */ './profile')
)
const EditProfile = React.lazy(() =>
  import(/* webpackChunkName: "user-edit-profile" */ './profileEdit')
)
const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
)
const Wishlist = React.lazy(() =>
  import(/* webpackChunkName: "user-wishlist" */ './wishlist')
)
const Bonus = React.lazy(() =>
  import(/* webpackChunkName: "user-bonus" */ './bonus')
)
const Expert = React.lazy(() =>
  import(/* webpackChunkName: "user-bonus" */ './expert')
)
const ExpertDetail = React.lazy(() =>
  import(/* webpackChunkName: "user-bonus" */ './expertDetail')
)
const News = React.lazy(() =>
  import(/* webpackChunkName: "user-news" */ './news')
)
const CartList = React.lazy(() =>
  import(/* webpackChunkName: "user-carts" */ './carts')
)
const NotifyList = React.lazy(() =>
  import(/* webpackChunkName: "user-notify" */ './notifies')
)
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
)
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ './forgotPassword')
)
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './resetPassword')
)
const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "user-dashboards" */ './dashboards')
)
const CourseDetails = React.lazy(() =>
  import(/* webpackChunkName: "user-course-details" */ './courseDetails')
)
const CourseContents = React.lazy(() =>
  import(/* webpackChunkName: "user-course-contents" */ './courseContents')
)
const SurveyDetail = React.lazy(() =>
  import(/* webpackChunkName: "user-survey-detail" */ './surveyDetail')
)
const Experts = React.lazy(() =>
  import(/* webpackChunkName: "user-experts" */ './expert')
)
const ExpertAbout = React.lazy(() =>
  import(/* webpackChunkName: "user-expert-about" */ './expertAbout')
)
const OneByOneAbout = React.lazy(() =>
  import(/* webpackChunkName: "user-1b1" */ './oneByOneAbout')
)
/*=========================================================================== */
const TakeSurvey2 = React.lazy(() =>
  import(/* webpackChunkName: "user-take-surveys2" */ './takeSurvey2')
)
const TakeSurveyLC = React.lazy(() =>
  import(/* webpackChunkName: "user-take-surveys3" */ './takeSurveyLC')
)
const Wheel = React.lazy(() =>
  import(/* webpackChunkName: "user-chatting" */ './wheel')
)
const VideoCall = React.lazy(() =>
  import(/* webpackChunkName: "user-video-call" */ './videoCall')
)
/*+========================================================================== */
const ViewComingSoon = React.lazy(() =>
  import(/* webpackChunkName: "views-coming-soon" */ 'views/comingSoon')
)
const ViewError404 = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ 'views/404')
)
const ViewException = React.lazy(() =>
  import(/* webpackChunkName: "views-error2" */ 'views/exception')
)
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ 'views/unauthorized')
)

const User = () => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Route exact path="/"
          render={props => <Main {...props} />}
        />
        <Route
          path="/courses"
          render={props => <Wishlist {...props} />}
        />
        <Route
          path="/bonus"
          render={props => <Bonus {...props} />}
        />
        <Route
          path="/expert"
          render={props => <Expert {...props} />}
        />
        <Route
          path="/expert-detail/:id"
          render={props => <ExpertDetail {...props} />}
        />
        <Route
          path="/experts"
          render={props => <Experts {...props} />}
        />
        <Route
          path="/news"
          render={props => <News {...props} />}
        />
        <Route
          path="/carts"
          render={props => <CartList {...props} />}
        />
        <Route
          path="/notify"
          render={props => <NotifyList {...props} />}
        />
        <Route
          path="/profile/:id/:section"
          render={props => <Profile {...props} />}
        />
        <Route
          path="/edit-profile"
          render={props => <EditProfile {...props} />}
        />
        <Route
          path="/login"
          render={props => <Login {...props} />}
        />
        <Route
          path="/register"
          render={props => <Register {...props} />}
        />
        <Route
          path="/forgot-password"
          render={props => <ForgotPassword {...props} />}
        />
        <Route
          path="/reset-password"
          render={props => <ResetPassword {...props} />}
        />
        <Route
          path="/dashboards"
          render={props => <Dashboards {...props} />}
        />
        <Route
          path="/course-details/:slug"
          render={props => <CourseDetails {...props} />}
        />
        <Route
          path="/course-contents/:slug/:lesson"
          render={props => <CourseContents {...props} />}
        />
        <Route
          path="/take-survey/:id"
          render={props => <SurveyDetail {...props} />}
        />
        <Route
          path="/khao-sat"
          render={props => <TakeSurvey2 {...props} />}
        />
        <Route
          path="/loc-troi"
          render={props => <TakeSurveyLC {...props} />}
        />
        <Route
          path="/video-call/:roomID"
          render={props => <VideoCall {...props} />}
        />
          <Route
          path="/expert-about"
          render={props => <ExpertAbout {...props} />}
        />
          <Route
          path="/onebyone-live"
          render={props => <OneByOneAbout {...props} />}
        />
        {/* ============================================== */}
        <Route
          path="/coming-soon"
          exact
          render={props => <ViewComingSoon {...props} />}
        />
        <Route
          path="/wheel"
          render={props => <Wheel {...props} />}
        />
        <Route
          path="/error"
          exact
          render={props => <ViewError404 {...props} />}
        />
        <Route
          path="/exception"
          exact
          render={props => <ViewException {...props} />}
        />
        <Route
          path="/unauthorized"
          exact
          render={props => <ViewUnauthorized {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  )
}

export default User
