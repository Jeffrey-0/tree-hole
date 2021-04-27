import { request } from './request'

// 秘密
const baseTable = 'blacklist/'

// 根据id查询
export function selectBlacklistById (blacklistId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      blacklistId
    }
  })
}

// 查询全部
export function showAllBlacklist () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllBlacklistByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deleteBlacklistById (blacklistId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      blacklistId
    }
  })
}

// 添加一个
export function insertBlacklist (blacklist) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: blacklist,
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
export function insertBlacklistSelective (blacklist) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: blacklist,
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
export function updateBlacklistById (blacklist) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: blacklist,
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
export function updateBlacklistByIdSelective (blacklist) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: blacklist,
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
export function SelectFuzzy (blacklist, page, rows) {
  blacklist.page = page
  blacklist.rows = rows
  return request({
    url: baseTable + 'selectByConditions',
    params: blacklist
  })
}

// 取消拉黑cancelBlock
export function cancelBlock (userId, blockId) {
  return request({
    url: baseTable + 'cancelBlock',
    params: {
      userId,
      blockId
    }
  })
}
