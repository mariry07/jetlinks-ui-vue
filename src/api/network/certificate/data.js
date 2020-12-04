import axios from '@/libs/api.request'

export const getTableData = (pageSize,pageIndex) => {
  return axios.request({
    url: '/network/certificate/_query',
    params: {
      pageSize,
      pageIndex
    },
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

export const deleCertificate = (id) => {
  return axios.request({
    url: `/network/certificate/${id}`,
    method: 'DELETE'
  })
}
