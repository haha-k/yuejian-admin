import request from '@/utils/request'

export function addCoaches(data) {
    return request({
        url: '/coaches/',
        method: "post",
        data
    });
}
export function getCoaches(page) {
    return request({
        url: '/coaches/',
        method: "get",
        params: {
            'page':page
        }
    });
}

export function getCoachesDetail(id){
    return request({
        url: '/coaches/'+id+'/',
        method: "get"
    })
}

export function changeCoaches(id){
    return request({
        url: '/coaches/'+id+'/',
        method: "put"
    })
}

export function deleteCoach(id){
    return request({
        url: '/coaches/'+id+'/',
        method: "delete"
    })
}