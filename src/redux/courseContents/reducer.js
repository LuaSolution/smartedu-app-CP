import {
  INIT_FINISHED_LECTURES,
  EDIT_COURSE_CONTENT_INFO
} from 'redux/actions'

const INIT_STATE = {
  courseId: null,// mã môn học hiện tại
  courseTitle: '',
  lectureId: null, // mã bài học hiện tại
  lectureTitle: null, // tên bài học hiện tại
  lectureType: null, // mã bài học hiện tại
  timeToSkip: null,// thời gian qua bài
  allowToNext: false,// đc qua bài ?
  questionsToSkip: null,//danh sách bài học qua bài
  questionsToSkipBak: null,
  finishedLectures: [] // danh sách bài học đã hoàn thành
}

export default (state = INIT_STATE, action) => {
  const { payload } = action
  switch (action.type) {
    case INIT_FINISHED_LECTURES:
      return { ...state, allowToNext: true, timeToSkip: null, questionsToSkip: null, finishedLectures: [...payload] }
    case EDIT_COURSE_CONTENT_INFO:
      if (payload.key) { // nếu có key thì chỉ update by key
        const tmpCourse = { ...state }
        tmpCourse[payload.key] = payload.value
        return { ...tmpCourse }
      }
    default:
      return { ...state }
  }
}