import axios from 'axios'
module 'axios' {
  export interface AxiosResponse {
    code: number | string
    message: string
  }
  export default axios
}
