import request from '@/utils/request'
import { NetworkApi } from '@/config/api/network'
import encodeQueryParam from '@/utils/encodeParam'

/**
 * @description 网络组件 --- 组件类型
 */
export function getComponentTypes () {
  return request({
    url: NetworkApi.componentTypes,
    method: 'GET'
  })
}
/**
 * @description 网络组件 --- 组件列表
 */
export function getComponentLists (params) {
  return request({
    url: NetworkApi.componentLists,
    method: 'GET',
    params: encodeQueryParam(params)
  })
}
/**
 * @description 网络组件 --- 组件列表
 */
export function getCertificateList (params) {
  return request({
    url: NetworkApi.certificateList,
    method: 'GET',
    params: encodeQueryParam(params)
  })
}
/**
 * @description 网络组件 --- 修改组件列表
 */
export function editCertificateList (data) {
  return request({
    url: NetworkApi.editCertificateList,
    method: 'PATCH',
    data
  })
}
/**
 * @description 网络组件 --- 修改组件列表
 */
export function deleteCertificateList (id) {
  return request({
    url: NetworkApi.deleteCertificateList(id),
    method: 'DELETE'
  })
}
