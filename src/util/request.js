import axios from "axios";
import { message } from "antd";

const service = axios.create({
   baseURL: '/api',
   timeout: 60000,
   headers: ''
})

service.interceptors.request.use(
   params => {
      if (params.method === 'GET') {
         params._t = Date.now()
      }
      return params
   },
   error => {
      return Promise.reject(error)
   }
)

service.interceptors.response.use(response => {
   const { data } = response
   return data
}, error => {
   if (error.response) {
      switch (error.response.status) {
         case 303:
            message.error(`请求出错${error.response.msg}`)
            break
         case 401:
            break
         default:
            return Promise.reject(error)
      }
   }
})

export default service