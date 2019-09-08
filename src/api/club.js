import request from '@/utils/request'

export function addClub(data) {
    return request({
        url: '/clubs/',
        method: "post",
        data
    });
}

export function getClubs() {
    return request({
        url: '/clubs/',
        method: "get",
    });
}

export function agree(id){
    return request({
        url: '/clubs/'+id+'/application/',
        method: "put"
    })
}

export function disAgree(id){
    return request({
        url: '/clubs/'+id+'/application/',
        method: "delete"
    })
}

export function getClubApplyStatus(id){
    return request({
        url: '/clubs/'+id+'/application/',
        method: "get"
    })
}

export function getClubDetail(id){
    return request({
        url: '/clubs/'+id+'/',
        method: "get"
    })
}

export function changeClub(id){
    return request({
        url: '/clubs/'+id+'/',
        method: "put"
    })
}

export function deleteClub(id){
    return request({
        url: '/clubs/'+id+'/',
        method: "delete"
    })
}

export function getFans(page) {
    return request({
        url: '/attentions/',
        method: "get",
        params: {
            page: page,
        }
    });
}

export function getFansDetail(id){
    return request({
        url: '/attentions/'+id+'/',
        method: "get"
    })
}

export function deleteFans(id){
    return request({
        url: '/attentions/'+id+'/',
        method: "delete"
    })
}

export function addFans(data) {
    return request({
        url: '/attentions/',
        method: "post",
        data
    });
}

// export function getClubVideos(id,page) {
//     return request({
//         url: '/clubs/'+id+'/videos/',
//         method: "get",
//         params:{
//             page: page
//         }
//     });
// }

// export function getClubTrains(id,page) {
//     return request({
//         url: '/clubs/'+id+'/trains/',
//         method: "get",
//         params:{
//             page: page
//         }
//     });
// }
// export function getClubFans(id,page) {
//     return request({
//         url: '/clubs/'+id+'/fans/',
//         method: "get",
//         params:{
//             page: page
//         }
//     });
// }
// export function getClubCoaches(id,page) {
//     return request({
//         url: '/clubs/'+id+'/coaches/',
//         method: "get",
//         params:{
//             page: page
//         }
//     });
// }
// export function getClubMasters(id,page) {
//     return request({
//         url: '/clubs/'+id+'/masters/',
//         method: "get",
//         params:{
//             page: page
//         }
//     });
// }
// export function getClubCourses(id,page) {
//     return request({
//         url: '/clubs/'+id+'/courses/',
//         method: "get",
//         params:{
//             page: page
//         }
//     });
// }


export function getClubVideos(id) {
    return request({
        url: '/clubs/'+id+'/videos/',
        method: "get",
    });
}

export function getClubTrains(id) {
    return request({
        url: '/clubs/'+id+'/trains/',
        method: "get",
    });
}
export function getClubFans(id) {
    return request({
        url: '/clubs/'+id+'/fans/',
        method: "get",
    });
}
export function getClubCoaches(id) {
    return request({
        url: '/clubs/'+id+'/coaches/',
        method: "get",
    });
}
export function getClubMasters(id) {
    return request({
        url: '/clubs/'+id+'/masters/',
        method: "get",
    });
}
export function getClubCourses(id) {
    return request({
        url: '/clubs/'+id+'/courses/',
        method: "get",
    });
}