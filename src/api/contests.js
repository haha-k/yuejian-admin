import request from '@/utils/request'

export function addContest(data) {
    return request({
        url: '/contests/',
        method: "post",
        data
    });
}
export function getContests(page) {
    return request({
        url: '/contests/',
        method: "get",
        params:{
            page: page,
        }
    });
}

export function getContestDetail(id){
    return request({
        url: '/contests/'+id+'/',
        method: "get"
    })
}

export function changeContest(id,data){
    return request({
        url: '/contests/'+id+'/',
        method: "put",
        data
    })
}

export function deleteContest(id){
    return request({
        url: '/contests/'+id+'/',
        method: "delete"
    })
}