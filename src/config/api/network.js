/**
 * @param ProtocolList 协议管理 --- 获取协议列表
 * @param Providers 协议管理 --- 协议类型数据
 * @param editProtocolList 协议管理 --- 修改协议列表
 * @param deleteProtocolList 协议管理 --- 删除协议列表
 *
 * @param certificateLists 证书管理 --- 获取证书管理列表
 * @param addCertificateLists 证书管理 --- 增加证书管理列表
 * @param deleteCertificateLists 证书管理 --- 删除证书管理列表
 *
 *
 * @param componentTypes 网络组件 --- 组件类型
 * @param componentLists 网络组件 --- 组件列表
 * @param certificateList 网络组件 --- 证书列表
 * @param editCertificateList 网络组件 --- 修改证书列表
 * @param deleteCertificateList 网络组件 --- 删除证书列表
 *
 * @param gateWayList 设备接入 --- 获取设备网关列表
 * @param gateWayProviders 设备接入 --- 获取设备网关类型列表
 * @param gateWayNetCom 设备接入 --- 获取设备网关网络组件列表
 * @param NetComponts 设备接入 --- 获取对应类型的网关组件
 * @param editGateWayList 设备接入 --- 修改设备网关网络组件列表
 * @param deleteGateWayList 设备接入 --- 删除设备网关网络组件列表
 */

export const NetworkApi = {
  // 证书管理
  certificateLists: `/network/certificate/_query`,
  addCertificateLists: `/network/certificate/`,
  deleteCertificateLists: (id) => `/network/certificate/${id}`,
  // 协议管理
  ProtocolList: '/protocol/_query',
  Providers: '/protocol/providers',
  editProtocolList: '/protocol/',
  deleteProtocolList: (id) => `/protocol/${id}`,
  // 网络组件
  componentTypes: `/network/config/supports`,
  componentLists: `/network/config/_query/no-paging`,
  certificateList: `/network/certificate/_query/no-paging`,
  editCertificateList: `/network/config/`,
  deleteCertificateList: (id) => `/network/config/${id}`,

  // 设备网关
  gateWayList: '/gateway/device/_query',
  gateWayProviders: '/gateway/device/providers',
  gateWayNetCom: '/network/config/_query/no-paging',
  NetComponts: (type) => `/network/config/${type}/_detail`,
  editGateWayList: `/gateway/device`,
  deleteGateWayList: (id) => `/gateway/device/${id}`
}
