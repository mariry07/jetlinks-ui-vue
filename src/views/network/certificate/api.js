import request from '@/utils/request'
import { NetworkApi } from '@/config/api/network'
import encodeQueryParam from '@/utils/encodeParam'

/**
 * @description 证书管理 --- 获取证书管理列表
 */
export function getCertificateLists (params) {
  return request({
    url: NetworkApi.certificateLists,
    method: 'GET',
    params: encodeQueryParam(params)
  })
}
/**
 * @description 证书管理 --- 增加证书管理列表
 */
export function addCertificateLists (data) {
  return request({
    url: NetworkApi.addCertificateLists,
    method: 'PATCH',
    data
  })
}
/**
 * @description 证书管理 --- 增加证书管理列表
 */
export function deleteCertificateLists (id) {
  return request({
    url: NetworkApi.deleteCertificateLists(id),
    method: 'DELETE'
  })
}
