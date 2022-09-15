import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

const instance: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_APP_API,
    timeout: 10000,
}
class Service {
    private instance: AxiosInstance;
    constructor(config: AxiosRequestConfig){
        this.instance = Axios.create(config);
        this.interceptorsReq();
        this.interceptorsRes();
    }
    // 添加请求拦截器
    private interceptorsReq(){
        this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
            // 在发送请求之前做些什么
            return config;
        },(err)=> {
            // 对请求错误做些什么
            return Promise.reject(err);
        })
    }
    // 添加响应拦截器
    private interceptorsRes(){
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            // 对响应数据做点什么
            const { code } = res.data;
            if([0, 200].includes(code)){
                return res.data.data;
            }
            return Promise.reject(res.message);
        }, (err)=>{
            // 对响应错误做点什么
            return Promise.reject(err);
        });
    }
    /**
     * request
     */
    public request<T, U>(config: AxiosRequestConfig<T>){
        return this.instance.request<{}, U, T>(config);
    }
}

export default new Service(instance);