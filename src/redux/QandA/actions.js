import {
  INIT_QA_LIST,
  QA_LIST_APPEND
} from 'redux/actions'

export const initQAList = list => ({
  type: INIT_QA_LIST,
  payload: list
})

export const addToQAList = question => ({
  type: QA_LIST_APPEND,
  payload: question
})