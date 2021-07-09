import {
  INIT_COURSE_GROUP
} from 'redux/actions'

const INIT_STATE = {
  list: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_COURSE_GROUP:
      return { ...state, list: [...action.payload] }
    default:
      return { ...state }
  }
}
