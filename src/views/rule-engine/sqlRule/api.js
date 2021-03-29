import request from '@/utils/request'
import { ruleEngineApi } from '@/config/api/ruleEngine'
import encodeQueryParam from '@/utils/encodeParam'

/**
 * @description 规则引擎 --- 数据转发列表
 */
export function getSqlRuleLists (params) {
  return request({
    url: ruleEngineApi.sqlRuleLists,
    method: 'GET',
    params: encodeQueryParam(params)
  })
}

/**
 * @description 规则引擎 --- 数据转发列表
 */
export function deleteSqlRuleLists (id) {
  return request({
    url: ruleEngineApi.deleteSqlRule(id),
    method: 'DELETE'
  })
}
/**
 * @description 规则引擎 --- 数据转发列表
 */
export function addSqlRuleLists (data) {
  return request({
    url: ruleEngineApi.addSqlRule,
    method: 'PATCH',
    data
  })
}
