import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store';
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.BASE_API, //api的base_url
    timeout: 5000
});

//请求拦截器
service.interceptors.request.use(config => {
    if(store.getters.token) {
        config.headers['X-Token'] = getToken();
    }
    return config
},error => {
    console.log(error);
    return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(response => response,
    error =>{
        console.log('err'+error)
        Message({
            message:error.message,
            type: 'error',
            duration:5*1000
        })
        return Promise.reject(error)
    })

export default service

/*
import { request } from "@/utils/request";

export function getInfo(params) {
    return request({
        url:'/',
        method: 'get',
        params
    })
}

*/
