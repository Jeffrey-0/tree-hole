import { request } from './request'

// 秘密
const baseTable = 'album/'

// 根据id查询
export function selectAlbumById (albumId) {
  return request({
    url: baseTable + 'selectById',
    params: {
      albumId
    }
  })
}

// 查询全部
export function showAllAlbum () {
  return request({
    url: baseTable + 'showAll'
  })
}

// 普通分页查询
export function showAllAlbumByPage (page, rows) {
  return request({
    url: baseTable + 'showAllByPage',
    params: {
      page,
      rows
    }
  })
}

// 根据id删除
export function deleteAlbumById (albumId) {
  return request({
    url: baseTable + 'deleteById',
    params: {
      albumId
    }
  })
}

// 添加一个
export function insertAlbum (album) {
  return request({
    url: baseTable + 'insert',
    method: 'post',
    data: album,
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
export function insertAlbumSelective (album) {
  return request({
    url: baseTable + 'insertSelective',
    method: 'post',
    data: album,
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
export function updateAlbumById (album) {
  return request({
    url: baseTable + 'updateById',
    method: 'post',
    data: album,
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
export function updateAlbumByIdSelective (album) {
  return request({
    url: baseTable + 'updateByPrimaryKeySelective',
    method: 'post',
    data: album,
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

// 根据用户ID查询相册
export function showAllByUserId (userId, page, rows) {
  return request({
    url: baseTable + 'showAllByUserId',
    params: {
      userId,
      page,
      rows
    }
  })
}

export function SelectFuzzy (album, page, rows) {
  album.page = page
  album.rows = rows
  return request({
    url: baseTable + 'selectByConditions',
    params: album
  })
}
