/**
 * @params ConfigLists 通知管理 --- 获取通知配置列表
 * @params ConfigTypes 通知管理 --- 获取通知配置组件类型
 * @params ConfigTypesMeta 通知管理 --- 获取通知对应配置组件类型的选项菜单
 * @params addConfigLists 通知管理 --- 增加通知配置列表
 * @params deleteConfigLists 通知管理 --- 删除通知配置列表
 */
export const NoticeApi = {
  // config
  ConfigLists: `/notifier/config/_query`,
  ConfigTypes: `/notifier/config/types`,
  ConfigTypesMeta: (type, id) => `/notifier/config/${type}/${id}/metadata`,
  addConfigLists: `/notifier/config`,
  deleteConfigLists: (id) => `/notifier/config/${id}`,
  // template
  getAccessLists: `notifier/template/_query`
}
