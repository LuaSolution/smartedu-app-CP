import {
  INIT_DISCUSS_LIST,
  APPEND_DISCUSS_LIST,
  ADD_REPLY_TO_DISCUSS
} from 'redux/actions'

const INIT_STATE = []

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_DISCUSS_LIST:
      return [...action.payload]
    case APPEND_DISCUSS_LIST:
      return [...state, action.payload]
    case ADD_REPLY_TO_DISCUSS:
      const { discuss_id, reply } = action.payload
      const arr = [...state]
      const index = arr.findIndex(i => i.id === discuss_id)
      if (index !== -1) {
        arr[index] = {
          ...arr[index],
          replies: [...arr[index].replies, reply]
        }
      }
      return arr
    default:
      return [...state]
  }
}
