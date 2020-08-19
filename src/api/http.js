import axios from 'axios'
// const BASE = window.location.host
const baseUrl = process.env.NODE_ENV === 'production' ? '/jee' : ''
const service = axios.create({
  timeout: 2000000,
  //baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }, 
  withCredentials: true
}) 

service.interceptors.request.use(config => {
  return Promise.resolve(config)
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = {}
    res.data = response.data
    res.status = response.status
    return res
    // return response
  },
  error => {
    return Promise.reject(error.response)
  }
)

export default service