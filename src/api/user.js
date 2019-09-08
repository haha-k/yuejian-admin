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

export function getUserDetail(id) {
    return request({
        url: '/users/'+id+'/',
        method: 'get',
    })
}

export function addUser(data) {
    return request({
        url: '/users/',
        method: "post",
        data
    });
}
export function getUsers(page) {
    return request({
        url: '/users/',
        method: "get",
        params: { page:page,}
    });
}


export function changeCourse(id,data){
    return request({
        url: '/users/'+id+'/',
        method: "put",
        data
    })
}

export function deleteCourse(id){
    return request({
        url: '/users/'+id+'/',
        method: "delete"
    })
}


export function getUserClubs(id) {
    return request({
        url: '/users/'+id+'/clubs/',
        method: "get",
    });
}

export function getUserTrains(id) {
    return request({
        url: '/users/'+id+'/trains/',
        method: "get",
    });
}

export function getUserActivities(id) {
    return request({
        url: '/users/'+id+'/trains/',
        method: "get",
    });
}


export function logout(){
    return request({
        url: '/users/logout',
        method: 'post'
    })
}


