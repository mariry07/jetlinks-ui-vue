import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: '/network/config/_query/no-paging',
    params: {
      paging: false,
      "sorts[0].name": "id",
      "sorts[0].order": "desc"
    },
    method: 'get'
  })
}

export const setStatus = (id,url) => {
  return axios.request({
    url: `/network/config/${id}/${url}`,
    method: 'POST'
  })
}

export const deleConfig = (id) => {
  return axios.request({
    url: `/network/config/${id}`,
    method: 'DELETE'
  })
}

export const getSupports = () => {
  return axios.request({
    url: '/network/config/supports',
    method: 'GET'
  })
}

export const noPaging = () => {
  return axios.request({
    url: '/network/certificate/_query/no-paging?paging=false',
    method: 'GET'
  })
}
export const setConfig = (data) => {
  return axios.request({
    url: '/network/config/',
    method: 'PATCH',
    data
  })
}

