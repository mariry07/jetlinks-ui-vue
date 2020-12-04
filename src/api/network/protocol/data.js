import axios from '@/libs/api.request'

export const getTableData = (pageSize,pageIndex) => {
  return axios.request({
    url: '/protocol/_query',
    params: {
      pageSize,
      pageIndex
    },
    method: 'get'
  })
}

export const setRelease = (id) => {
  return axios.request({
    url: `/protocol/${id}/_deploy`,
    method: 'post'
  })
}

export const setUnRelease = (id) => {
  return axios.request({
    url: `/protocol/${id}/_un-deploy`,
    method: 'post'
  })
}

/**
 * 新建
 */
export const addProtocol = (data) => {
  return axios.request({
    url: '/protocol/',
    data: data,
    method: 'PATCH'
  })
}

export const deleCertificate = (id) => {
  return axios.request({
    url: `/protocol/${id}`,
    method: 'DELETE'
  })
}

/**
 * 点击测试按钮
 */
export const convertClick = (data) => {
  return axios.request({
    url: '/protocol/convert',
    data: data,
    method: 'POST'
  })
}

/**
 * 执行编码
 */
export const encodeClick = (data) => {
  return axios.request({
    url: 'protocol/encode',
    data: data,
    method: 'POST'
  })
}

/**
 * 执行解码
 */
export const decodeClick = (data) => {
  return axios.request({
    url: 'protocol/decode',
    data: data,
    method: 'POST'
  })
}
