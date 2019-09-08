import request from '@/utils/request'

export function addTrain(data) {
    return request({
        url: '/trains/',
        method: "post",
        data
    });
}
export function getTrains(page) {
    return request({
        url: '/trains/',
        method: "get",
        params: {
            'page':page
        }
    });
}

export function getTrainDetail(id){
    return request({
        url: '/trains/'+id+'/',
        method: "get"
    })
}

export function changeTrain(id){
    return request({
        url: '/trains/'+id+'/',
        method: "put"
    })
}

export function deleteTrain(id){
    return request({
        url: '/trains/'+id+'/',
        method: "delete"
    })
}