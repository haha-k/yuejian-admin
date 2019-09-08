import axios from 'axios'
import {
    Message
} from 'element-ui'
import store from '@/store';
import {
    getToken
} from '@/utils/auth'

const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, //api的base_url
    baseURL: '/api/v1',
    timeout: 5000
});


//请求拦截器
service.interceptors.request.use(config => {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    if (store.getters.token) {
        // console.log("/utils/request");
        config.headers['Authorization'] = 'JWT ' + getToken();
    }
    // console.log(config);
    return config
}, error => {
    // console.log(error);
    return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(response => {
        console.log(response);
        return response;
    },
    error => {
        console.log('err->' + error)
        if (error.response.status == 403) {
            Message.error({
                message: '您的权限不足'
            });
        } else {
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
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
