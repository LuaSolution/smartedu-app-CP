import {
  CLEAR_COURSE,
  UPDATE_COURSE_INFO,
  ADD_COURSE_CHAPTER,
  UPDATE_COURSE_CHAPTERS,
  INIT_COURSE_CHAPTERS,
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

const INIT_STATE = {
  courseInfo: {
    image: null
  },
  courseBenefits: [
  ],
  courseChapters: [
  ],
  courseResources: [
  ]
}

export default (state = INIT_STATE, action) => {
  const { payload } = action

  switch (action.type) {
    case CLEAR_COURSE:
      return INIT_STATE
    case UPDATE_COURSE_INFO:
      if (payload.key) { // nếu có key thì chỉ update by key
        const tmpCourseInfo = {
          ...state.courseInfo,
        }
        tmpCourseInfo[payload.key] = payload.courseInfo
        return {
          ...state,
          courseInfo: {
            ...tmpCourseInfo
          }
        }
      } else { // key == null thì update toàn bộ courseInfo
        return {
          ...state,
          courseInfo: {
            ...payload.courseInfo
          }
        }
      }
    case INIT_COURSE_CHAPTERS:
      return {
        ...state,
        courseChapters: payload
      }
    case ADD_COURSE_CHAPTER:
      return {
        ...state,
        courseChapters: [...state.courseChapters, payload]
      }
    case UPDATE_COURSE_CHAPTERS:
      const { courseChapters: tmpUpdateC } = state
      tmpUpdateC[payload.index] = payload.data && { ...payload.data }
      return {
        ...state,
        courseChapters: [...tmpUpdateC]
      }
    case RM_COURSE_CHAPTER:
      const { courseChapters: listRm } = state
      listRm.splice(payload, 1)
      return {
        ...state,
        courseChapters: [...listRm]
      }
    // COURSE BENEFIT
    case INIT_COURSE_BENEFITS:
      return {
        ...state,
        courseBenefits: payload
      }
    case ADD_COURSE_BENEFIT:
      return {
        ...state,
        courseBenefits: [...state.courseBenefits, payload]
      }
    case UPDATE_COURSE_BENEFITS:
      const { courseBenefits: updateTmp } = state
      updateTmp[payload.index] = payload.data && { ...payload.data }
      return {
        ...state,
        courseBenefits: [...updateTmp]
      }
    case RM_COURSE_BENEFITS:
      const { courseBenefits: list } = state
      list.splice(payload, 1)
      return {
        ...state,
        courseBenefits: [...list]
      }
    //Course Lecture
    case UPDATE_COURSE_LECTURES:
      const { courseChapters: tmpUpLecturesSeq } = state
      tmpUpLecturesSeq[payload.index].lectures = [...payload.data]
      return {
        ...state,
        courseChapters: [...tmpUpLecturesSeq]
      }
    case ADD_LECTURE:
      const { courseChapters: tmp3 } = state
      if (tmp3[payload.chap_index].lectures) {
        tmp3[payload.chap_index].lectures.push(payload.data)
      } else {
        tmp3[payload.chap_index].lectures = [payload.data]
      }

      return {
        ...state,
        courseChapters: tmp3
      }
    case UPDATE_LECTURE:
      const { courseChapters: tmp4 } = state
      tmp4[payload.chap_index]
        .lectures[payload.lec_index] = { ...payload.data }
      console.log(payload.data)
      return {
        ...state,
        courseChapters: tmp4
      }
    case RM_LECTURE:
      const { courseChapters: tmpRmLecture } = state
      tmpRmLecture[payload.chap_index].lectures.splice(payload.lec_index, 1)

      return {
        ...state,
        courseChapters: [...tmpRmLecture]
      }
    case UPDATE_LECTURE_NAME:
      const { courseChapters: tmpUpLName } = state
      tmpUpLName[payload.chap_index]
        .lectures[payload.lec_index].name = payload.name

      return {
        ...state,
        courseChapters: [...tmpUpLName]
      }
    // COURSE_RESOURCES
    case INIT_COURSE_RESOURCES:
      return {
        ...state,
        courseResources: payload
      }
    default:
      return { ...state }
  }
}
