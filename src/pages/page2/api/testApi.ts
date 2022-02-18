import http from '@/utils/service/axios.ts'

const testGetRes = (params?: Object) => {
  return http.request({
    url: '/test',
    method: 'GET',
    params: params
  })
}

export {
  testGetRes
}
