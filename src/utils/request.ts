import Axios, { AxiosRequestConfig } from 'axios';

const instance = Axios.create({
    baseURL: import.meta.env.BASE_URL,
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
instance.interceptors.response.use((res:any)=>{
    // 对响应数据做点什么
    if([0, 200].includes(res.code)){
        return res.data;
    }
    return Promise.reject(res.messages);
}, (err)=>{
    // 对响应错误做点什么
    return Promise.reject(err);
});

export default instance;