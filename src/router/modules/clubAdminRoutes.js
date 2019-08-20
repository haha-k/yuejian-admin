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

export const clubAdminRoutes = [
    {
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
                component: () => import('@/views/clubAdminView/club'),
                name: 'Club',
                meta: {
                    title: '基本信息管理',
                    icon: 'index'
                },
            },
            {
                path: 'video',
                component: () => import('@/views/clubAdminView/video'),
                name: 'video',
                meta: {
                    title: '视频管理',
                    icon: 'video'
                },
            },
            {
                path: 'course',
                component: () => import('@/views/clubAdminView/course'),
                name: 'Course',
                meta: {
                    title: '课程管理',
                    icon: 'course'
                },
            },
            {
                path: 'train',
                component: () => import('@/views/clubAdminView/train'),
                name: 'Train',
                meta: {
                    title: '训练管理',
                    icon: 'train'
                },
            },
            {
                path: 'coach',
                component: () => import('@/views/clubAdminView/coach'),
                name: 'Coach',
                meta: {
                    title: '教练管理',
                    icon: 'coach'
                },
            },
            {
                path: 'fans',
                component: () => import('@/views/clubAdminView/fans'),
                name: 'Fans',
                meta: {
                    title: '粉丝管理',
                    icon: 'fans'
                },
            },
            {
                path: 'activity',
                component: () => import('@/views/clubAdminView/activity'),
                name: 'Activity',
                meta: {
                    title: '活动管理',
                    icon: 'activity'
                },
            },
            {
                path: 'participants',
                component: () => import('@/views/clubAdminView/participants'),
                name: 'Participants',
                meta: {
                    title: '报名管理',
                    icon: 'participants'
                },
            },
        ]
    },
    {
        path: '/clubs',
        component: Layout,
        redirect: '/clubs/index',
        children: [{
            path: 'index',
            component: () => import('@/views/sysAdminView/clubs'),
            name: 'Clubs',
            meta: {
                title: '俱乐部管理',
                icon: 'club'
            },
        }]
    },  {
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
            component: () => import('@/views/sysAdminView/activities'),
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
            component: () => import('@/views/sysAdminView/contests'),
            name: 'Contests',
            meta: {
                title: '比赛管理',
                icon: 'contest'
            },
        }]
    },
];
