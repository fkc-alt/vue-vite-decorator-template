import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = Axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use((config:AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
},(err)=> {
    // 对请求错误做些什么
    return Promise.reject(err);
})

// 添加响应拦截器
instance.interceptors.response.use((res:AxiosResponse) => {
    // 对响应数据做点什么
    const { code } = res.data;
    if([0, 200].includes(code)){
        return res.data;
    }
    return Promise.reject(res.message);
}, (err)=>{
    // 对响应错误做点什么
    return Promise.reject(err);
});

export default instance;