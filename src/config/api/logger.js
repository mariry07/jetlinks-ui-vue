/**
 * @params getAccessLists 获取日志管理列表
 * @params getSystemLists 获取系统日志列表
 */
export const LoggerApi = {
  getAccessLists: `/logger/access/_query`,
  getSystemLists: `/logger/system/_query`
}
