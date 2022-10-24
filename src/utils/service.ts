import Axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { ElMessage } from 'element-plus';
import { getToken } from "@/utils";
const instance: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
}
/**
 * @author kaichao.Feng
*/
class Service {
    private instance: AxiosInstance;
    /**
     * @method constructor
     * @param { Object } config
    */
    constructor(config: AxiosRequestConfig) {
        this.instance = Axios.create(config);
        this.interceptorsReq();
        this.interceptorsRes();
    }
    /**
     * @method interceptorsReq
     * @return { Promise } Promise
    */
    private interceptorsReq() {
        this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
            const Authorization = getToken();
            // 在发送请求之前做些什么
            Authorization && (config['headers']!['Authorization'] = "Bearer " + Authorization)
            return config;
        }, (err) => {
            // 对请求错误做些什么
            return Promise.reject(err);
        })
    }
    /**
     * @method interceptorsRes
     * @return { Promise } Promise
    */
    private interceptorsRes() {
        this.instance.interceptors.response.use((res: AxiosResponse) => {
            // 对响应数据做点什么
            const { status, data } = res;
            if ([0, 200].includes(status) && [0, 200].includes(data?.code || 200)) return data;
            ElMessage.error({ message: data.message });
            return Promise.reject(data.message);
        }, (err) => {
            ElMessage.error({ message: err?.response.data.message });
            // 对响应错误做点什么
            return Promise.reject(err?.response.data.message);
        });
    }
    /**
     * @method request
     * @param { Object } config
     * @return { Services.Common.Response<U> } Services.Common.Response<U>
    */
    public request<T, U>(config: AxiosRequestConfig<T>) {
        return this.instance.request<{}, Services.Common.Response<U>, T>(config);
    }
}

export default new Service(instance);