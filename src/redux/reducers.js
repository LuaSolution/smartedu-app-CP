import { combineReducers } from 'redux'
import settings from './settings/reducer'
import menu from './menu/reducer'
import courseGroups from './courseGroups/reducer'
import courses from './courses/reducer'
import users from './users/reducer'
import QandA from './QandA/reducer'
import discusses from './discusses/reducer'
import courseContents from './courseContents/reducer'

const reducers = combineReducers({
  menu,
  settings,
  courseGroups,
  courses,
  users,
  QandA,
  discusses,
  courseContents
})

export default reducers
