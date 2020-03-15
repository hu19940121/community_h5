import request from '@/utils/request'
export function getWorkList (data) {
  return request({
    url: '/planet/api/program/composition/getHomePageCompositionList',
    method: 'get',
    params: data
  })
}
// export function getWorkList () {
//   return request({
//     url: '/api/v1/swork/list',
//     method: 'get'
//   })
// }
export function getWorkDetailById (data) {
  return request({
    url: '/api/v1/swork/detail',
    method: 'get',
    params: data
  })
}

// 获取作品详情
export function getCompositionInfoById (data) {
  return request({
    url: '/planet/api/program/composition/getCompositionInfoById',
    method: 'get',
    params: data
  })
}
