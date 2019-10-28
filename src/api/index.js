import request from '../utils/request';
// 修改位置
export function setCentertData(data) {
  return request({
    url: '/school-map/sitePosition/update',
    method: 'post',
    data,
  })
}
// 删除位置
export function delCenterData(id) {
  return request({
    url: `/school-map/sitePosition/delete?id=${id}`,
    method: 'post'
  })
}
// 添加位置
export function addCenterData(data) {
  return request({
    url: '/school-map/sitePosition/add',
    method: 'post',
    data,
  })
}