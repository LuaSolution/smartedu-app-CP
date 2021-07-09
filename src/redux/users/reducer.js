import {
  INIT_USER_LIST
} from 'redux/actions'

const INIT_STATE = {
  loading: false,
  error: '',
  list: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_USER_LIST:
      return { ...state, list: [...action.payload] }
    default:
      return { ...state }
  }
}
