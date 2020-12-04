import axios from '@/libs/api.request'

export const getTableData = (pageSize,pageIndex) => {
  return axios.request({
    url: '/notifier/config/_query',
    params: {
      pageSize,
      pageIndex
    },
    method: 'get'
  })
}

export const getTypes = () => {
  return axios.request({
    url: '/notifier/config/types',
    method: 'get'
  })
}

export const getMetadata = (type,property) => {
  return axios.request({
    url: `/notifier/config/${type}/${property}/metadata`,
    method: 'get'
  })
}


export const saveConfig = (data) => {
  return axios.request({
    url: `/notifier/config`,
    method: 'PATCH',
    data
  })
}


export const getConfig = (id) => {
  return axios.request({
    url: `/notifier/config/${id}`,
    method: 'GET'
  })
}


export const deleConfig = (id) => {
  return axios.request({
    url: `/notifier/config/${id}`,
    method: 'DELETE'
  })
}

export const debugConfig = (type,provider) => {
  return axios.request({
    url: `/notifier/template/_query`,
    method: 'GET',
    params:{
      "paging": false,
      "terms[0].column": "type",
      "terms[0].value": type,
      "terms[1].column": "provider",
      "terms[1].value": provider
    }
  })
}

export const recordConfig = (pageSize,pageIndex,id) => {
  return axios.request({
    url: `/notify/history/_query`,
    method: 'GET',
    params:{
      pageSize,
      pageIndex,
      "terms[0].column": "notifierId",
      "terms[0].value": id,
      "sorts[0].name": "notifyTime",
      "sorts[0].order": "desc",
    }
  })
}

export const sendConfig = (id,data) => {
  return axios.request({
    url: `/notifier/${id}/_send`,
    method: 'POST',
    data
  })
}
