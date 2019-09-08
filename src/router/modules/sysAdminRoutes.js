import Layout from '@/layout'



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


export const sysAdminRoutes = [
    {
        path: '/clubs',
        component: Layout,
        redirect: '/clubs/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/clubs/index'),
            name: 'Clubs',
            meta: {
                title: '俱乐部管理',
                icon: 'club'
            },
        }]
    }, {
        path: '/users',
        component: Layout,
        redirect: '/users/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/users/index'),
            name: 'Users',
            meta: {
                title: '用户管理',
                icon: 'user'
            },
        }]
    },
    {
        path: '/videos',
        component: Layout,
        redirect: '/videos/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/videos'),
            name: 'Videos',
            meta: {
                title: '视频管理',
                icon: 'video'
            },
        }]

    },
    {
        path: '/courses',
        component: Layout,
        redirect: '/courses/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/courses'),
            name: 'Courses',
            meta: {
                title: '课程管理',
                icon: 'course'
            },
        }]
    },
    {
        path: '/blueprints',
        component: Layout,
        redirect: '/blueprints/index',
        children: [{
            path: 'blueprint',
            component: () => import('@/views/sysAdminView/blueprint/index'),
            name: 'Blueprints',
            meta: {
                title: '晒图管理',
                icon: 'blueprints'
            },
        }]
    },

    {
        path: '/trains',
        component: Layout,
        redirect: '/trains/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/trains'),
            name: 'Trains',
            meta: {
                title: '训练管理',
                icon: 'train'
            },
        }]
    },
    {
        path: '/coaches',
        component: Layout,
        redirect: 'coaches/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/coaches'),
            name: 'Coaches',
            meta: {
                title: '教练管理',
                icon: 'coach'
            },
        }]
    },
    {
        path: '/pictures',
        component: Layout,
        redirect: '/pictures/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/pictures/index'),
            name: 'Picture',
            meta: {
                title: '图片管理',
                icon: 'pictures'
            },
        }]
    },
    {
        path: '/activities',
        component: Layout,
        redirect: '/activities/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/activities/index'),
            name: 'Activities',
            meta: {
                title: '活动管理',
                icon: 'activity'
            },
        }]
    },
    {
        path: '/contests',
        component: Layout,
        redirect: '/contests/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/contests/index'),
            name: 'Contests',
            meta: {
                title: '比赛管理',
                icon: 'contest'
            },
        }]
    },
    {
        path: '/participants',
        component: Layout,
        redirect: '/participants/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/participants/index'),
            name: 'Participants',
            meta: {
                title: '报名管理',
                icon: 'participants'
            },
        }]
    },
    {
        path: '/fans',
        component: Layout,
        redirect: '/fans/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/fans'),
            name: 'fans',
            meta: {
                title: '关注管理',
                icon: 'fans'
            },
        }]
    },
]

