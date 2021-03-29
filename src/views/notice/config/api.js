import request from '@/utils/request'
import { NoticeApi } from '@/config/api/notice'

/**
 * @description 通知管理 --- 获取通知模板列表
 */
export function getConfigLists (params) {
  return request({
    url: NoticeApi.ConfigLists,
    method: 'GET',
    params
  })
}
/**
 * @description 通知管理 --- 获取通知配置组件类型
 */
export function getConfigTypes () {
  return request({
    url: NoticeApi.ConfigTypes,
    method: 'GET'
  })
}
/**
 * @description 通知管理 --- 获取通知对应配置组件类型的选项菜单
 */
export function getConfigTypesMeta (type, id) {
  return request({
    url: NoticeApi.ConfigTypesMeta(type, id),
    method: 'GET'
  })
}

/**
 * @description 通知管理 --- 增加通知配置列表
 */
export function addConfigLists (data) {
  return request({
    url: NoticeApi.addConfigLists,
    method: 'PATCH',
    data
  })
}
/**
 * @description 通知管理 --- 删除通知配置列表
 */
export function deleteConfigLists (id) {
  return request({
    url: NoticeApi.deleteConfigLists(id),
    method: 'DELETE'
  })
}
