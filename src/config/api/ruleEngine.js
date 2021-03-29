/**
 * @params sqlRuleLists 规则引擎 --- 获取数据转发列表
 * @params deleteSqlRule 规则引擎 --- 删除数据转发列表
 * @params addSqlRule 规则引擎 --- 增加数据转发列表
 */
export const ruleEngineApi = {
  sqlRuleLists: `/rule-engine/instance/_query`,
  deleteSqlRule: (id) => `/rule-engine/instance/${id}`,
  addSqlRule: `/rule-engine/instance/`
}
