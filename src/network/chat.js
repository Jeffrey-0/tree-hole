import { request } from './request'

// 秘密
const baseTable = 'chat/'

// 根据id查询
export function selectChatById (chatId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      chatId
    }
  })
}

// 查询全部
export function showAllChat () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllChatByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deleteChatById (chatId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      chatId
    }
  })
}

// 添加一个
export function insertChat (chat) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: chat,
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
export function insertChatSelective (chat) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: chat,
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
export function updateChatById (chat) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: chat,
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
export function updateChatByIdSelective (chat) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: chat,
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

// 根据俩用户查询

// 普通分页查询
export function showAllByTowUserId (userId1, userId2, page, rows) {
  return request({
    url: baseTable + 'showAllByTowUserId',
    params: {
      userId1,
      userId2,
      page,
      rows
    }
  })
}

// 筛选查询
export function SelectFuzzy (chat, page, rows) {
  chat.page = page
  chat.rows = rows
  return request({
    url: baseTable + 'selectByConditions',
    params: chat
  })
}

// 普通分页查询
export function showRecentChatByUserId (userId) {
  return request({
    url: baseTable + 'showRecentChatByUserId',
    params: {
      userId
    }
  })
}

// 设置俩人聊天已查看updateChatLook
export function updateChatLook (userId1, userId2) {
  return request({
    url: baseTable + 'updateChatLook',
    params: {
      userId1,
      userId2
    }
  })
}
