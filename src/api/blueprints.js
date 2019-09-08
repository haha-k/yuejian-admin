import request from '@/utils/request'

export function addBlueprint(data) {
    return request({
        url: '/blueprints/',
        method: "post",
        data
    });
}
export function getBlueprints(page) {
    return request({
        url: '/blueprints/',
        method: "get",
        params: {
            page: page,
        }
    });
}

export function getBlueprintDetail(id){
    return request({
        url: '/blueprints/'+id+'/',
        method: "get"
    })
}

export function changeBlueprint(id,data){
    return request({
        url: '/blueprints/'+id+'/',
        method: "put",
        data
    })
}

export function deleteBlueprint(id){
    return request({
        url: '/blueprints/'+id+'/',
        method: "delete"
    })
}