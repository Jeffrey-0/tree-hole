// 百度api接口
import axios from 'axios'

function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    // baseURL: 'https://aip.baidubce.com/', // 百度服务器接口地址
    baseURL: '/baiduApi/', // 百度服务器接口地址
    timeout: 50000
  })

  // 2.axios的拦截器
  // 2.1请求拦截
  instance.interceptors.request.use(config => {
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

// 获取新的access_token
export function getNewAccessToken (grant_type, client_id, client_secret) {
  return request({
    url: 'oauth/2.0/token',
    params: {
      grant_type,
      client_id,
      client_secret
    },
    agent: false
  })
}

// 文本审核
export function textReview (text) {
  return request({
    url: 'rest/2.0/solution/v1/text_censor/v2/user_defined',
    params: {
      access_token: JSON.parse(window.localStorage.getItem('access_token')).access_token
    },
    method: 'post',
    data: {
      text: text
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// 图片审核
export function imgReview (image, imgUrl) {
  let img = {}
  if (image) {
    img = {
      image
    }
  } else {
    img = {
      imgUrl
    }
  }
  return request({
    url: 'rest/2.0/solution/v1/img_censor/v2/user_defined',
    params: {
      access_token: JSON.parse(window.localStorage.getItem('access_token')).access_token
    },
    method: 'post',
    data: img,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
