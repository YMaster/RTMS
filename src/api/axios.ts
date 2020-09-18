import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// import httpStatus from './http-status'

/* request 拦截器 */
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // 如果要对 config 做统一处理，请在这里修改，例如：headers 中带上 token
  return config
}, (error: Error) => {
  console.error(error)
})

/* response 拦截器 */
axios.interceptors.response.use((response: AxiosResponse) => {
  // 对于返回数据做统一处理，比如针对 status code 来做统一的消息处理、对于登录失效的处理
  return response
}, (error: Error) => {
  console.error(error)
})

// 自定义的 axios 返回类型
interface IResponseRes<T = any> { code: string, data: T, message: string }
interface IServe {
  getUri(config?: AxiosRequestConfig): string
  request<T = any>(config: AxiosRequestConfig): Promise<IResponseRes<T>>
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResponseRes<T>>
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResponseRes<T>>
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResponseRes<T>>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponseRes<T>>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponseRes<T>>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponseRes<T>>
}
// 覆盖项目中使用的 axios
class Serve implements IServe {
  getUri(config: AxiosRequestConfig): string {
    return axios.getUri(config)
  }
  async request<T = any>(config: AxiosRequestConfig): Promise<IResponseRes<T>> {
    const res = await axios.request(config)
    return res.data
  }
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResponseRes<T>> {
    const res = await axios.get(url, config)
    return res.data
  }
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResponseRes<T>> {
    return axios.delete(url, config).then((res) => res.data)
  }
  async head<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResponseRes<T>> {
    const res = await axios.head(url, config)
    return res.data
  }
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponseRes<T>> {
    const res = await axios.post(url, data, config)
    return res.data
  }
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponseRes<T>> {
    const res = await axios.put(url, data, config)
    return res.data
  }
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponseRes<T>> {
    const res = await axios.patch(url, data, config)
    return res.data
  }
}

const server = new Serve()

export default server