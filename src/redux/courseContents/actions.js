import axios from 'helpers/axios'
import {
  INIT_FINISHED_LECTURES,
  EDIT_COURSE_CONTENT_INFO
} from 'redux/actions'

export const initFinishedLectures = list => ({
  type: INIT_FINISHED_LECTURES,
  payload: list
})

export const updateCourseContents = (key, value) => ({
  type: EDIT_COURSE_CONTENT_INFO,
  payload: { key, value }
})

export const addLectureToFinishedCourses = (courseId, lectureId) => {
  const params = {
    courseId: courseId,
    lectureId: lectureId
  }

  axios.post('courses/add-finished-lecture', params)
    .then(res => {
      if (res.data.status === 200) {
        console.log('ok')
      }
    })
}