import axios from 'axios'
export function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:8082/', // 服务器接口地址
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1请求拦截
  instance.interceptors.request.use(config => {
    const accessToken = window.sessionStorage.getItem('accessToken')
    console.log('获取sessionStorage中accessToken', accessToken)
    if (accessToken) {
      config.headers.accessToken = accessToken
    }
    return config
  }, err => {
    console.log(err)
  })
  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发起真正的网络请求
  return instance(config)
}
