import { request } from './request'

// 秘密
const baseTable = 'comment/'

// 根据id查询
export function selectCommentById (commentId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      commentId
    }
  })
}

// 查询全部
export function showAllComment () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllCommentByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deleteCommentById (commentId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      commentId
    }
  })
}

// 添加一个
export function insertComment (comment) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: comment,
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
export function insertCommentSelective (comment) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: comment,
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
export function updateCommentById (comment) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: comment,
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
export function updateCommentByIdSelective (comment) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: comment,
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
export function SelectFuzzy (comment, page, rows) {
  comment.page = page
  comment.rows = rows
  return request({
    url: baseTable + 'selectByConditions',
    params: comment
  })
}