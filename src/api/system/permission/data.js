import axios from '@/libs/api.request'

export const getTableData = (pageSize,pageIndex) => {
  return axios.request({
    url: '/permission/_query',
    params: {
      pageSize,
      pageIndex
    },
    method: 'get'
  })
}

export const addUser = (data) => {
  return axios.request({
    url: '/user/',
    data: data,
    method: 'PATCH'
  })
}

export const deleUser = (id) => {
  return axios.request({
    url: `/user/${id}`,
    method: 'DELETE'
  })
}

// 获取权限列表

export const getPermission = (data) => {
  return axios.request({
    url: '/permission/_query/no-paging',
    params: data,
    method: 'get'
  })
}

// 获取权限
export const setPermission = (data) => {
  return axios.request({
    url: '/autz-setting/_query/no-paging',
    params: data,
    method: 'get'
  })
}

// 设置权限
export const setSave = (data) => {
  return axios.request({
    url: '/autz-setting/detail/_save',
    data: data,
    method: 'post'
  })
}
