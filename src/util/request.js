import axios from "axios";
import { message } from "antd";
// import store from "../redux/store";

const service = axios.create({
   baseURL: '/api',
   timeout: 60000,
   headers: ''
})

service.interceptors.request.use(
   config => {
      if (config.method === 'get' && config.params) {
         config.params._t = Date.now()
      }
      return config
   }, error => {
      return Promise.reject(error)
   }
)

service.interceptors.response.use(response => {
   if (response.status === 200) {
      return response.data
   } else {
      return response
   }
}, error => {
   if (error.response) {
      switch (error.response.status) {
         case 303:
            message.error(`请求出错${error.response.msg}`)
            break
         case 401:
            break
         default:
            return
      }
   }
})

export default service