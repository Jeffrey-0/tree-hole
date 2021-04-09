import { request } from './request'

// 秘密
const baseTable = 'secret/'

// 根据id查询
export function selectSecretById (secretId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      secretId
    }
  })
}

// 查询全部
export function showAllSecret () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllSecretByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deleteSecretById (secretId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      secretId
    }
  })
}

// 添加一个
export function insertSecret (secret) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: secret,
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

// 选择添加（只添加值不为空的属性)
export function insertSecretSelective (secret) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: secret,
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

// 修改一个
export function updateSecretById (secret) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: secret,
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

// 选择修改（只修改值不为空的属性)
export function updateSecretByIdSelective (secret) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: secret,
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
