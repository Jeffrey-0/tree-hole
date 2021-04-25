import { request } from './request'

// 秘密
const baseTable = 'user/'

// 根据id查询
export function selectUserById (userId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      userId
    }
  })
}

// 查询全部
export function showAllUser () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllUserByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deleteUserById (userId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      userId
    }
  })
}

// 添加一个
export function insertUser (user) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: user,
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
export function insertUserSelective (user) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: user,
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
export function updateUserById (user) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: user,
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
export function updateUserByIdSelective (user) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: user,
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

// 后台
// 分页查询 SelectUser
export function SelectUser (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 禁用，解禁 forbiddenUser
export function forbiddenUser (user) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: user,
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

// 筛选查询
export function SelectFuzzy (user, page, rows) {
  user.page = page
  user.rows = rows
  return request({
    url: baseTable + 'selectByConditions',
    params: user
  })
}

// 登录
export function login (user) {
  return request({
    url: baseTable + 'login',
    params: user
  })
}

// 根据当前用户id+用户id
export function selectByCurrentUserId (userId, currentUserId) {
  if (!currentUserId) {
    currentUserId = -1
  }
  return request({
    url: baseTable + 'selectByCurrentUserId',
    params: {
      userId,
      currentUserId
    }
  })
}
