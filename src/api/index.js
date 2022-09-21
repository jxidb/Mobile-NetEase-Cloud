import requests from '@/api/axios.js'
export const req = () => {
  return requests({
    url: '/login'
  })
}

// 推荐歌单接口
export const reqSongList = (params) => {
  return requests({
    url: '/personalized',
    method: 'GET',
    params
  })
}

// 最新音乐接口
export const reqNewSong = (params) => {
  return requests({
    url: '/personalized/newsong',
    method: 'GET',
    params
  })
}

// 获取热门搜素列表
export const reqHotList = () => {
  return requests({
    url: '/search/hot',
    method: 'GET'
  })
}

// 获取搜索列表的接口
export const reqSearchList = (params) => {
  return requests({
    url: 'cloudsearch',
    method: 'GET',
    params
  })
}

// 播放页
export const reqgetSongById = (id) => {
  return requests({
    url: `/song/detail?ids=${id}`,
    method: 'GET'
  })
}

// 获取歌词
export const reqLyricById = (id) => {
  return requests({
    url: `/lyric?id=${id}`,
    method: 'GET'
  })
}

// 获取音乐的评论
export const reqGetSongComment = (params) => {
  return requests({
    url: '/comment/music',
    method: 'GET',
    params
  })
}

// 获取二维码key生成接口
export const reqerweimaKey = () => {
  return requests({
    url: '/login/qr/key',
    method: 'GET'
  })
}

// 获取二维码生成接口
export const reqErweima = (params) => {
  return requests({
    url: '/login/qr/create',
    method: 'GET',
    params
  })
}

// 手机登录接口
export const reqPhoneLogin = (params) => {
  return requests({
    url: '/login/cellphone',
    method: 'GET',
    params
  })
}
