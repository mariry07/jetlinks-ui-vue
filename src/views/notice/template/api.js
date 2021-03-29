import request from '@/utils/request'
import { NoticeApi } from '@/config/api/notice'
import encodeQueryParam from '@/utils/encodeParam'

/**
 * @description 通知管理 --- 获取通知模板列表
 */
export function getTemplateLists (params) {
  return request({
    url: NoticeApi.getAccessLists,
    method: 'GET',
    params: encodeQueryParam(params)
  })
}
