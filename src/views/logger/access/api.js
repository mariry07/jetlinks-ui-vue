import request from '@/utils/request'
import { LoggerApi } from '@/config/api/logger'
import encodeQueryParam from '@/utils/encodeParam'

/**
 * @description 日志管理 --- 获取证书管理列表
 */
export function getAccessLists (params) {
  return request({
    url: LoggerApi.getAccessLists,
    method: 'GET',
    params: encodeQueryParam(params)
  })
}
