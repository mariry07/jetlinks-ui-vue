import request from '@/utils/request'
import { NetworkApi } from '@/config/api/network'

/**
 * @description 获取协议列表数据
 * @param {*} params
 */
export function GetProtocolList (params) {
  return request({
    url: NetworkApi.ProtocolList,
    method: 'GET',
    params: params
  })
}

/**
 * @description 获取协议类型数据
 */
export function GetProviders () {
  return request({
    url: NetworkApi.Providers,
    method: 'GET'
  })
}
/**
 * @description 获取协议类型数据接口封装
 */
export function editProtocolList (data) {
  return request({
    url: NetworkApi.editProtocolList,
    method: 'PATCH',
    data
  })
}
/**
 * @description 获取协议类型数据接口封装
 */
export function deleteProtocolList (id) {
  return request({
    url: NetworkApi.deleteProtocolList(id),
    method: 'DELETE'
  })
}
