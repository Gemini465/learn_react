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
      if (config.method === 'get') {
         config.params._t = Date.now()
      }
      console.log(config)
      return config
   }, error => {
      return Promise.reject(error)
   }
)

service.interceptors.response.use(response => {
   console.log('response', response)
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
            return
      }
   }
})

export default service