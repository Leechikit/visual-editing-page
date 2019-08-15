import axios from 'axios'
import qs from 'qs'

export const BASE_URL = '/ctg-workflow'

axios.defaults.timeout = 20000 // 响应时间
axios.defaults.baseURL = BASE_URL // 配置接口地址
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'post' && !config.FormData) {
      config.data = qs.stringify(config.data, {
        arrayFormat: 'repeat'
      })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    // 对响应数据做些事
    if (res.status !== 200) {
      return Promise.reject(res)
    }
    return res
  },
  error => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      if (error.response.status === 401 || error.response.status === 403) {
        window.location.href = '/#/login'
        return
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    return Promise.reject(error)
  }
)
// 返回一个Promise(发送post请求)
export function fetch(url, params, config, { beforeFetch, afterFetch } = {}) {
  return new Promise((resolve, reject) => {
    if (typeof beforeFetch === 'function') beforeFetch(axios)
    axios
      .post(url, params, config)
      .then(
        response => {
          if (typeof afterFetch === 'function') afterFetch(axios)
          if (response) resolve(response.data)
        },
        err => {
          if (typeof afterFetch === 'function') afterFetch(axios)
          console.log(err)
          reject(err)
        }
      )
      .catch(error => {
        if (typeof afterFetch === 'function') afterFetch(axios)
        console.log(error)
        reject(error)
      })
  })
}
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(
        response => {
          if (response) resolve(response.data)
        },
        err => {
          console.log(err)
          reject(err)
        }
      )
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}
