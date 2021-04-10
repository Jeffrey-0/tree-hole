import { request } from './request'

// 秘密
const baseTable = 'sign/'

// 根据id查询
export function selectSignById (signId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      signId
    }
  })
}

// 查询全部
export function showAllSign () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllSignByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deleteSignById (signId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      signId
    }
  })
}

// 添加一个
export function insertSign (sign) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: sign,
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
export function insertSignSelective (sign) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: sign,
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
export function updateSignById (sign) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: sign,
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
export function updateSignByIdSelective (sign) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: sign,
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

// deleteByPlanIdAndTime
// 根据计划id和当前时间删除
export function deleteByPlanIdAndTime (planId, createTime) {
  return request({
    url: baseTable + 'deleteByPlanIdAndTime',
    params: {
      planId
    }
  })
}