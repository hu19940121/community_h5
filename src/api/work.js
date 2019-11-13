import request from '@/utils/request'
export function getWorkList () {
  return request({
    url: '/api/v1/swork/list',
    method: 'get'
  })
}
export function getWorkDetailById (data) {
  return request({
    url: '/api/v1/swork/detail',
    method: 'get',
    params: data
  })
}
