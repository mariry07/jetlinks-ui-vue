import * as dashboard from '@/views/dashboard/api.js'
import * as networkCertificate from '@/views/network/certificate/api.js'
import * as networkProtocol from '@/views/network/protocol/api.js'
import * as networkType from '@/views/network/type/api.js'
import * as networkGateway from '@/views/network/gateway/api.js'
import * as deviceProduct from '@/views/device/product/api.js'
import * as deviceInstance from '@/views/device/instance/api.js'
import * as noticeConfig from '@/views/notice/config/api.js'
import * as noticeTemplate from '@/views/notice/template/api.js'
import * as ruleEngine from '@/views/rule-engine/sqlRule/api.js'
import * as loggerAccess from '@/views/logger/access/api.js'
import * as loggerSystem from '@/views/logger/system/api.js'

const apis = {
  dashboard,
  deviceProduct,
  deviceInstance,
  networkCertificate,
  networkProtocol,
  networkType,
  networkGateway,
  noticeConfig,
  noticeTemplate,
  ruleEngine,
  loggerAccess,
  loggerSystem
}

export default apis
