import { request } from './request'

// 秘密
const baseTable = 'relation/'

// 根据id查询
export function selectRelationById (relationId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      relationId
    }
  })
}

// 查询全部
export function showAllRelation () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllRelationByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deleteRelationById (relationId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      relationId
    }
  })
}

// 添加一个
export function insertRelation (relation) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: relation,
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
export function insertRelationSelective (relation) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: relation,
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
export function updateRelationById (relation) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: relation,
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
export function updateRelationByIdSelective (relation) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: relation,
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

// 查看粉丝 showAllFansByUserId
export function showAllFansByUserId (userId) {
  return request({
    url: baseTable + 'showAllFansByUserId',
    params: {
      userId
    }
  })
}

// 关注
export function showAllFollowsByUserId (userId) {
  return request({
    url: baseTable + 'showAllFollowsByUserId',
    params: {
      userId
    }
  })
}
