import {
  INIT_COURSE_GROUP
} from 'redux/actions'

export const initCourseGroup = courseGroup => ({
  type: INIT_COURSE_GROUP,
  payload: courseGroup
})