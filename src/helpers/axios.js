import axios from 'axios'
import { ROOT } from 'defines'

const API_URL = ROOT + 'api/'

axios.defaults.baseURL = API_URL
axios.defaults.timeout = 1000 * 60 *  10// 10 phút
axios.defaults.headers.common.Accept = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

axios.interceptors.request.use(config => {
  if (localStorage.getItem('@token')) {
    config.headers.Authorization = localStorage.getItem('@token')
  }
  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/'
      ) {
        alert('Vui lòng đăng nhập lại')
        localStorage.removeItem('@current_user')
        localStorage.removeItem('@token')
        window.location.href = '/login'
      } else {
        window.location.href = '/'
      }
    }
    return error
  }
)

export default axios
