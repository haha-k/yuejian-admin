// import Layout from '@/layout'



// //系统管理员
// //所有俱乐部管理:/clubs
// //所有视频管理:/videos
// //所有课程管理:/courses
// //所有图片管理:/pictures
// //所有晒图管理:/blueprints
// //所有用户管理:/users
// //所有教练管理:/coaches
// //所有训练管理:/trains
// //所有活动管理:/activities
// //所有比赛管理:/contests


// export const sysAdminRoutes = [
//     {
//         path: '/clubs',
//         components: Layout,
//         redirect: '/clubs/index',
//         children: [{
//             path: 'index',
//             component: () => import('@/views/sysAdminView/clubs'),
//             name: 'Clubs',
//             meta: {
//                 title: '俱乐部管理',
//                 icon: 'club'
//             },
//         }]
//     },
//     {
//         path: '/videos',
//         components: Layout,
//         redirect: '/videos/index',
//         children: [{
//             path: 'index',
//             component: () => import('@/views/sysAdminView/videos'),
//             name: 'Videos',
//             meta: {
//                 title: '视频管理',
//                 icon: 'video'
//             },
//         }]

//     },
//     {
//         path: '/courses',
//         components: Layout,
//         redirect: '/courses/index',
//         children: [{
//             path: 'index',
//             component: () => import('@/views/sysAdminView/courses'),
//             name: 'Courses',
//             meta: {
//                 title: '课程管理',
//                 icon: 'course'
//             },
//         }]
//     },

//     {
//         path: '/trains',
//         components: Layout,
//         redirect: '/trains/index',
//         children: [{
//             path: 'index',
//             component: () => import('@/views/sysAdminView/trains'),
//             name: 'Trains',
//             meta: {
//                 title: '训练管理',
//                 icon: 'train'
//             },
//         }]
//     },
//     {
//         path: '/coaches',
//         components: Layout,
//         redirect: 'coaches/index',
//         children: [{
//             path: 'index',
//             component: () => import('@/views/sysAdminView/coaches'),
//             name: 'Coaches',
//             meta: {
//                 title: '教练管理',
//                 icon: 'coach'
//             },
//         }]
//     },
//     {
//         path: '/pictures',
//         components: Layout,
//         redirect: '/pictures/index',
//         children: [{
//             path: 'index',
//             component: () => import('@/views/sysAdminView/pictures'),
//             name: 'Picture',
//             meta: {
//                 title: '图片管理',
//                 icon: 'picture'
//             },
//         }]
//     },
//     {
//         path: '/activities',
//         components: Layout,
//         redirect: '/activities/index',
//         children: [{
//             path: 'index',
//             component: () => import('@/views/sysAdminView/activities'),
//             name: 'Activities',
//             meta: {
//                 title: '活动管理',
//                 icon: 'activity'
//             },
//         }]
//     },
//     {
//         path: '/contests',
//         components: Layout,
//         redirect: '/contests/index',
//         children: [{
//             path: 'index',
//             component: () => import('@/views/sysAdminView/contests'),
//             name: 'Contests',
//             meta: {
//                 title: '比赛管理',
//                 icon: 'contest'
//             },
//         }]
//     },
// ]

