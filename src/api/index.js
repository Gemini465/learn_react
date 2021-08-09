import request from '../util/request'

export function login(params) {
   return request({
      url: '/login',
      method: 'post',
      data: params
   })
}