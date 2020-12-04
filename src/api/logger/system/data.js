import axios from '@/libs/api.request'

export const getTableData = (pageSize,pageIndex) => {
  return axios.request({
    url: '/logger/system/_query',
    params: {
      pageSize,
      pageIndex,
      "sorts[0].name": "createTime",
      "sorts[0].order": "desc"
    },
    method: 'get'
  })
}
