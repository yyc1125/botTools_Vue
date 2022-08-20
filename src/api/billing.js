import request from '@/utils/request'
export function addProfile(data) {
  return request({
    url: '/profile/addProfile',
    method: 'post',
    data
  })
}
export function selectAllProfile(pageNum, pageSize) {
  return request({
    url: '/profile/selectAllProfile',
    method: 'get',
    params: { pageNum: pageNum, pageSize: pageSize }
  })
}
export function updateProfile(data) {
  return request({
    url: '/profile/updateProfile',
    method: 'post',
    data
  })
}
export function selectProfileById(id) {
  return request({
    url: '/profile/selectProfileById',
    method: 'get',
    params: { id: id }
  })
}
export function deleteProfileById(id) {
  return request({
    url: '/profile/deleteProfileById',
    method: 'get',
    params: { id: id }
  })
}
export function batchDeleteProfile(data) {
  return request({
    url: '/profile/batchDeleteProfile',
    method: 'post',
    data
  })
}
export function batchUpdateProfile(idList, profile) {
  return request({
    url: '/profile/batchUpdateProfile',
    method: 'post',
    data: { idList: idList, profile: profile }
  })
}
