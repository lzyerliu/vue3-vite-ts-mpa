import axios, { AxiosInstance } from 'axios'

// console.log(import.meta.env.VITE_APP_HOST)
const baseHost: string = `/h5`

const err = (err: any) => {
  console.log(err)
  return Promise.reject(err)
}

export class Interceptors {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: baseHost,
      timeout: 5 * 60000, // 请求超时时间
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    this.init()
  }

  // 初始化拦截器
  init() {
    // 请求拦截
    this.instance.interceptors.request.use(config => {
      return config
    }, err)
    // 相应拦截
    this.instance.interceptors.response.use(response => {
      // console.log(response)
      if (response.status == 200) {
        return response.data
      } else {
        return Promise.reject(err)
      }
    }, err)
  }

  // 返回
  getInterceptors() {
    return this.instance
  }
}
