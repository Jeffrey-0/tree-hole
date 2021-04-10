import { request } from './request'

// 秘密
const baseTable = 'report/'

// 根据id查询
export function selectReportById (reportId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      reportId
    }
  })
}

// 查询全部
export function showAllReport () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllReportByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deleteReportById (reportId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      reportId
    }
  })
}

// 添加一个
export function insertReport (report) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: report,
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
export function insertReportSelective (report) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: report,
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
export function updateReportById (report) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: report,
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
export function updateReportByIdSelective (report) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: report,
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
