import router from './router'
import store from './store'
import {
    Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
    getToken
} from '@/utils/auth'
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
    showSpinner: false
});

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
    NProgress.start();

    // document.title = getPageTitle(to.meta.title);

    const hasToken = getToken();

    // console.log(hasToken);

    if (hasToken) {
        if (to.path === '/login') {
            next({
                path: '/'
            });
            NProgress.done();
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next()
            }
            else {
                try {
                    const { roles } = await store.dispatch('user/getInfo');
                    // console.log(roles);
            //         // const roles=['sysAdmin'];
                    // const accessedRoutes = await store.dispatch('permission/generateRoutes', roles);
                    // router.addRoutes(accessedRoutes);
                    // console.log("xxx");
                    next({
                        ...to,
                        replace: true
                    });
                } catch (error) {
                    await store.dispatch('user/resetToken');
                    // console.log("---");
                    Message.error(error || 'has error');
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
})
