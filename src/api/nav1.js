import request from '../utils/request';

export function companyList(type) {
  return request({
    url: `/school-map/serviceInfo/getByType?type=${type}`,
    method: 'get'
  })
}

export function setCompanyList(data) {
  return request({
    url: '/manageBase/company',
    method: 'put',
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
