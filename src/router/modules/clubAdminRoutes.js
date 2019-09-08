import Layout from '@/layout'

//俱乐部管理员
//俱乐部展示管理:/club
//视频管理:/video
//课程管理:/course
//训练管理:/train
//教练管理:/coach
//粉丝管理:/fans
//活动管理:/activity
//报名管理:/participants

export const clubAdminRoutes = [{
        path: '/home',
        component: Layout,
        redirect: '/home/index',
        children: [{
            path: 'index',
            component: () => import('@/views/clubAdminView/home'),
            name: 'Home',
            meta: {
                title: '首页',
                icon: 'home'
            },
        }]
    },
    {
        path: '/club',
        component: Layout,
        redirect: '/club/index',
        meta: {
            title: '俱乐部管理',
            icon: 'club'
        },
        children: [{
                path: 'index',
                component: () => import('@/views/clubAdminView/club/index'),
                name: 'Club',
                meta: {
                    title: '基本信息管理',
                    icon: 'index'
                },
            },
            {
                path: 'video',
                component: () => import('@/views/clubAdminView/video/index'),
                name: 'Video',
                meta: {
                    title: '视频管理',
                    icon: 'video'
                },
            },
            {
                path: 'course',
                component: () => import('@/views/clubAdminView/course/index'),
                name: 'Course',
                meta: {
                    title: '课程管理',
                    icon: 'course'
                },
            },
            {
                path: 'train',
                component: () => import('@/views/clubAdminView/train/index'),
                name: 'Train',
                meta: {
                    title: '训练管理',
                    icon: 'train'
                },
            },
            {
                path: 'coach',
                component: () => import('@/views/clubAdminView/coach/index'),
                name: 'Coach',
                meta: {
                    title: '教练管理',
                    icon: 'coach'
                },
            },
            {
                path: 'fans',
                component: () => import('@/views/clubAdminView/fans/index'),
                name: 'Fans',
                meta: {
                    title: '粉丝管理',
                    icon: 'fans'
                },
            },
            {
                path: 'participants',
                component: () => import('@/views/clubAdminView/participant/index'),
                name: 'Participants',
                meta: {
                    title: '报名管理',
                    icon: 'participants'
                },
            },
        ]
    },

];
