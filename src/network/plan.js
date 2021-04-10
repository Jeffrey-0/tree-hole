import { request } from './request'

// 秘密
const baseTable = 'plan/'

// 根据id查询
export function selectPlanById (planId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      planId
    }
  })
}

// 查询全部
export function showAllPlan () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllPlanByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deletePlanById (planId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      planId
    }
  })
}

// 添加一个
export function insertPlan (plan) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: plan,
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
export function insertPlanSelective (plan) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: plan,
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
export function updatePlanById (plan) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: plan,
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
export function updatePlanByIdSelective (plan) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: plan,
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

// 根据用户id查询全部
export function showAllPlanByUserId (userId) {
  return request({
    url: baseTable + 'showAllByUserId',
    params: {
      userId
    }
  })
}

// 查询今日需要打卡的目标
export function showAllByCurrentDate (userId) {
  return request({
    url: baseTable + 'showAllByCurrentDate',
    params: {
      userId
    }
  })
}