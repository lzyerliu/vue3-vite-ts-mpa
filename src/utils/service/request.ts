import axios, { AxiosInstance } from 'axios'

console.log(import.meta.env.VITE_APP_HOST)

const err = (err: any) => {
  console.log(err)
  return Promise.reject(err)
}

export class Interceptors {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_HOST,
      timeout: 60000, // 请求超时时间
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }

  // 初始化拦截器
  init() {
    // 请求拦截
    this.instance.interceptors.request.use(config => {
      return config
    }, err)
    // 相应拦截
    this.instance.interceptors.response.use(response => {
      console.log(response)
      return response
    }, err)
  }

  // 返回
  getInterceptors() {
    return this.instance
  }
}
