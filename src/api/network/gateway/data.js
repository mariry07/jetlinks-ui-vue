import axios from '@/libs/api.request'

export const getTableData = (pageSize,pageIndex) => {
  return axios.request({
    url: '/gateway/device/_query',
    params: {
      pageSize,
      pageIndex
    },
    method: 'get'
  })
}
export const getProviders = () => {
  return axios.request({
    url: '/gateway/device/providers',
    method: 'get'
  })
}
export const getNoPaging = () => {
  return axios.request({
    url: '/network/config/_query/no-paging',
    method: 'get'
  })
}

/*
 消息协议
*/
export const getSupports = () => {
  return axios.request({
    url: '/protocol/supports',
    method: 'get'
  })
}
export const addCertificate = (data) => {
  return axios.request({
    url: '/network/certificate/',
    data: data,
    method: 'PATCH'
  })
}

/*
 消息协议
*/
export const getDetail = (id) => {
  return axios.request({
    url: `network/config/${id}/_detail`,
    method: 'get'
  })
}
export const setDevice = (data) => {
  return axios.request({
    url: `/gateway/device`,
    data,
    method: 'PATCH'
  })
}

export const deleDevice = (id) => {
  return axios.request({
    url: `/gateway/device/${id}`,
    method: 'DELETE'
  })
}

export const setStartup = (id) => {
  return axios.request({
    url: `/gateway/device/${id}/_startup`,
    method: 'POST'
  })
}

export const setPause = (id) => {
  return axios.request({
    url: `/gateway/device/${id}/_startup`,
    method: 'POST'
  })
}
// export const setStartup = (id) => {
//   return axios.request({
//     url: `/gateway/device/${id}/_startup`,
//     method: 'POST'
//   })
// }
