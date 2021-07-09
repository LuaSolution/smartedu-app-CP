import {
  INIT_DISCUSS_LIST,
  APPEND_DISCUSS_LIST,
  ADD_REPLY_TO_DISCUSS
} from 'redux/actions'

export const initDiscussList = list => ({
  type: INIT_DISCUSS_LIST,
  payload: list
})

export const addToDiscussList = discuss => ({
  type: APPEND_DISCUSS_LIST,
  payload: discuss
})

export const addReplyToDiscuss = (discuss_id, reply) => ({
  type: ADD_REPLY_TO_DISCUSS,
  payload: { discuss_id, reply }
})