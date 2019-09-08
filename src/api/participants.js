import request from '@/utils/request'

export function addParticipant(data) {
    return request({
        url: '/participate/',
        method: "post",
        data
    });
}
export function getParticipants(page) {
    return request({
        url: '/participate/',
        method: "get",
        params:{
            page: page,
        }
    });
}

export function getParticipantsDetail(id){
    return request({
        url: '/participate/'+id+'/',
        method: "get"
    })
}

export function changeParticipant(id,data){
    return request({
        url: '/participate/'+id+'/',
        method: "put",
        data
    })
}

export function deleteParticipant(id){
    return request({
        url: '/participate/'+id+'/',
        method: "delete"
    })
}