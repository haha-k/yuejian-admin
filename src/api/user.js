import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login/',
        method: "post",
        data
    });
}

export function getInfo() {
    return request({
        url: '/users/1',
        method: 'get',
    })
}

export function logout(){
    return request({
        url: '/users/logout',
        method: 'post'
    })
}

export function updateInfo(id){
    return request({
        url: 'users/'+id+'/',
        method:'put'
    })
}