import request from '@/utils/request'
import { NetworkApi } from '@/config/api/network'
import { DeviceManageApi } from '@/config/api/device'

/**
 * @description 设备接入 --- 获取设备网关列表
 */
export function getGateWayList () {
  return request({
    url: NetworkApi.gateWayList,
    method: 'GET'
  })
}
/**
 * @description 设备接入 --- 获取设备类型列表
 */
export function getProviders () {
  return request({
    url: NetworkApi.gateWayProviders,
    method: 'GET'
  })
}
/**
 * @description 设备接入 --- 获取设备类型列表
 */
export function gateWayNetCom () {
  return request({
    url: NetworkApi.gateWayNetCom,
    method: 'GET'
  })
}

/**
 * @description 设备接入 --- 获取当前类型的网络组件
 */
export function getNetComponts (type) {
  return request({
    url: NetworkApi.NetComponts(type),
    method: 'GET'
  })
}
/**
 * @description 设备接入 --- 获取消息协议
 */
export function getProtocolList () {
  return request({
    url: DeviceManageApi.protocolSupport,
    method: 'GET'
  })
}
/**
 * @description 设备接入 --- 修改设备网关列表
 */
export function editGateWayList (data) {
  return request({
    url: NetworkApi.editGateWayList,
    method: 'PATCH',
    data
  })
}
/**
 * @description 设备接入 --- 删除设备网关列表
 */
export function deleteGateWayList (id) {
  return request({
    url: NetworkApi.deleteGateWayList(id),
    method: 'DELETE'
  })
}
