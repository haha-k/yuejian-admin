import request from '@/utils/request'

export function addActivities(data) {
    return request({
        url: '/activities/',
        method: "post",
        data
    });
}
export function getActivities(page) {
    return request({
        url: '/activities/',
        method: "get",
        params:{
            page: page,
        }
    });
}

export function getActivitiesDetail(id){
    return request({
        url: '/activities/'+id+'/',
        method: "get"
    })
}

export function changeActivities(id,data){
    return request({
        url: '/activities/'+id+'/',
        method: "put",
        data
    })
}

export function deleteActivities(id){
    return request({
        url: '/activities/'+id+'/',
        method: "delete"
    })
}