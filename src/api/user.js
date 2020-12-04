import axios from '@/libs/api.request'

export const login = ({ username, password,expires,tokenType }) => {
  const data = {
    username,
    password,
    expires,
    tokenType
  }
  return axios.request({
    url: '/authorize/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/authorize/me',
    // params: {
    //   token
    // },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post',
	params:{
		"terms[0].column": "state",
		"terms[0].value": "unread"
	}
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: '/notifications/_query',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
