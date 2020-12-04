import axios from '@/libs/api.request'


export const getTableData = (pageSize,pageIndex) => {
  return axios.request({
    url: '/dimension/_query/',
    params: {
      pageSize,
      pageIndex,
	  paging: false,
	  "terms[0].column": "typeId",
	  "terms[0].value": "role"
    },
    method: 'get'
  })
}

export const addDimension = (id,data) => {
  return axios.request({
    url: `/dimension/${id}`,
    data: data,
    method: 'PUT'
  })
}

export const deleDimension = (id) => {
  return axios.request({
    url: `/dimension/${id}`,
    method: 'DELETE'
  })
}


export const getDimensionUser = (id) => {
  return axios.request({
    url: `/dimension-user/_query/no-paging`,
    params:{
      "terms[0].column":'dimensionId',
      "terms[0].value":id
    },
    method: 'get'
  })
}

export const getUser = () => {
  return axios.request({
    url: '/user/_query',
    params: {

    },
    method: 'get'
  })
}

export const setDimensionUser = (data) => {
  return axios.request({
    url: '/dimension-user',
    data: data,
    method: 'POST'
  })
}

export const deleDimensionUser = (id) => {
  return axios.request({
    url: `/dimension-user/${id}`,
    method: 'DELETE'
  })
}
