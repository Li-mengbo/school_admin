import request from '../utils/request';
// 获取列表
export function companyList(type) {
  return request({
    url: `/school-map/serviceInfo/getByType?type=${type}`,
    method: 'get'
  })
}
// 修改内容
export function setContent(data) {
  return request({
    url: '/school-map/serviceInfo/update',
    method: 'post',
    data,
  })
}
// 修改坐标
export function setCenter(data) {
  return request({
    url: '/school-map/serviceInfoPosition/update',
    method: 'post',
    data,
  })
}
export function addCompanyList(data) {
  return request({
    url: '/manageBase/company',
    method: 'post',
    data,
  })
}
