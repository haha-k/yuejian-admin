import request from '@/utils/request'

export function addCourse(data) {
    return request({
        url: '/courses/',
        method: "post",
        data
    });
}
export function getCourses(page) {
    return request({
        url: '/courses/',
        method: "get",
        params: { page:page,}
    });
}

export function getCourseDetail(id){
    return request({
        url: '/courses/'+id+'/',
        method: "get"
    })
}

export function changeCourse(id){
    return request({
        url: '/courses/'+id+'/',
        method: "put"
    })
}

export function deleteCourse(id){
    return request({
        url: '/courses/'+id+'/',
        method: "delete"
    })
}