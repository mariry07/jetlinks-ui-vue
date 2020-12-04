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

export  const list=(pageSize)=>{
  return axios.request({
    url:'/device-instance/_query',
    method: 'GET',
    params: {
        pageSize
      },
  });
}

