import {
  INIT_USER_LIST
} from 'redux/actions'

export const initUserList = users => ({
  type: INIT_USER_LIST,
  payload: users
})