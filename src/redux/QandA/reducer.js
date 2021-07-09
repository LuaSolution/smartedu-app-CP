import {
  INIT_QA_LIST,
  QA_LIST_APPEND
} from 'redux/actions'

const INIT_STATE = []

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_QA_LIST:
      return [...action.payload]
    case QA_LIST_APPEND:
      return [...state, action.payload]
    default:
      return [...state]
  }
}
