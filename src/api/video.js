import request from '@/utils/request'

export function addVideo(data) {
    return request({
        url: '/videos/',
        method: "post",
        data
    });
}
export function getVideos(page) {
    return request({
        url: '/videos/',
        method: "get",
        params: {
            'page':page
        }
    });
}

export function getVideoDetail(id){
    return request({
        url: '/videos/'+id+'/',
        method: "get"
    })
}

export function changeVideo(id){
    return request({
        url: '/videos/'+id+'/',
        method: "put"
    })
}

export function deleteVideo(id){
    return request({
        url: '/videos/'+id+'/',
        method: "delete"
    })
}