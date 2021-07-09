import {
  CLEAR_COURSE,
  UPDATE_COURSE_INFO,

  INIT_COURSE_CHAPTERS,
  ADD_COURSE_CHAPTER,
  UPDATE_COURSE_CHAPTERS,
  RM_COURSE_CHAPTER,

  INIT_COURSE_BENEFITS,
  ADD_COURSE_BENEFIT,
  UPDATE_COURSE_BENEFITS,
  RM_COURSE_BENEFITS,

  UPDATE_COURSE_LECTURES,
  ADD_LECTURE,
  UPDATE_LECTURE,
  RM_LECTURE,
  UPDATE_LECTURE_NAME,
  INIT_COURSE_RESOURCES
} from 'redux/actions'

export const clearCourse = () => ({
  type: CLEAR_COURSE
})

export const updateCourseInfo = (courseInfo, key = null) => ({
  type: UPDATE_COURSE_INFO,
  payload: { courseInfo, key }
})

export const initCourseChapters = chapters => ({
  type: INIT_COURSE_CHAPTERS,
  payload: chapters
})

export const addCourseChapter = data => ({
  type: ADD_COURSE_CHAPTER,
  payload: data
})

export const updateCourseChapters = (data, index) => ({
  type: UPDATE_COURSE_CHAPTERS,
  payload: { data, index }
})

export const removeCourseChapter = index => ({
  type: RM_COURSE_CHAPTER,
  payload: index
})

export const initCourseBenefits = benefits => ({
  type: INIT_COURSE_BENEFITS,
  payload: benefits
})

export const addCourseBenefit = data => ({
  type: ADD_COURSE_BENEFIT,
  payload: data
})

export const updateCourseBenefits = (index, data) => ({
  type: UPDATE_COURSE_BENEFITS,
  payload: { index, data }
})

// Xóa lợi ích khóa học theo index
export const removeCourseBenefits = index => ({
  type: RM_COURSE_BENEFITS,
  payload: index
})

// Cập nhật thứ tự bài học
export const updateLectures = (index, data) => ({
  type: UPDATE_COURSE_LECTURES,
  payload: { index, data }
})

// Thêm 1 bài học mới
export const addLecture = (chap_index, data) => ({
  type: ADD_LECTURE,
  payload: { chap_index, data }
})

// Cập nhật thông tin 1 bài học
export const updateLecture = (chap_index, lec_index, data) => ({
  type: UPDATE_LECTURE,
  payload: { chap_index, lec_index, data }
})

// Xóa bài học theo index
export const removeLecture = (chap_index, lec_index) => ({
  type: RM_LECTURE,
  payload: { chap_index, lec_index }
})

// Cập nhật thông tin 1 bài học
export const updateLectureName = (chap_index, lec_index, name) => ({
  type: UPDATE_LECTURE_NAME,
  payload: { chap_index, lec_index, name }
})

//course resources
export const initCourseResources = list => ({
  type: INIT_COURSE_RESOURCES,
  payload: list
})