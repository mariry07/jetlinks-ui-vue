import axios from '@/libs/api.request'

export const getTableData = (pageSize,pageIndex) => {
  return axios.request({
    url: '/user/_query',
    params: {
      pageSize,
      pageIndex
    },
    method: 'get'
  })
}

/**
 * 消息协议
 */
export const getProtocol = ()=>{
    return axios.request({
        url:'/protocol/supports',
        params:{

        },
        method:'get'
    })
}

/**
 * 传输协议
 */
export const getSupports = (protocolId)=>{
    return axios.request({
        url:'/protocol/'+protocolId+'/transports',
        params:{

        },
        method:'get'
    })
}

/**
 * 所属机构
 * /organization/_all
 */
export const getOrganization = ()=>{
    return axios.request({
        url:'/organization/_all',
        params:{

        },
        method:'get'
    })
}

/**
 * /device/category/_tree
 */
export const getCategory = ()=>{
    return axios.request({
        url:'/device/category/_tree',
        params:{

        },
        method:'get'
    })
}