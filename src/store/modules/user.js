import {
    login,
    getInfo
} from '@/api/user'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import getters from '../getters';

const state = {
    token: getToken(),
    avatar: '',
    name: '',
    info: {},
    roles: [],
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INFO: (state, info) => {
        state.info = info
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
}

const actions = {
    //user login
    login({commit}, userInfo) {
        const {
            username,
            password
        } = userInfo;
        // console.log(userInfo);
        return new Promise((resolve, reject) => {
            login({
                username: username.trim(),
                password: password,
            }).then(response => {
                // console.log("comming in");
                // console.log(response)
                const {
                    data
                } = response;
                commit('SET_TOKEN', data.token);
                setToken(data.token);
                resolve('success set token');
            }).catch(error => {
                // console.log("????");
                reject(error);
            })
        })
    },

    //get user info
    getInfo({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const {
                    data
                } = response;
                if (!data) {
                    reject('验证失败,请再次登录');
                }

                // console.log(data);

                const {
                    // roles,
                    avatar_url,
                    username,
                    ...info
                } = data;

                // console.log(info);

                let roles=["sysAdmin"];

                // console.log(roles);

                if (!roles || roles.length <= 0) {
                    reject('getinfo: roles必须是非空的数组');
                }

                commit('SET_ROLES', roles);
                commit('SET_NAME', username);
                commit('SET_AVATAR', avatar_url);
                commit('SET_INFO', info);
                // resolve(data);
                resolve(roles);
            }).catch(error => {
                reject(error);
            })
        })
    },

    //user logout
    logout({
        commit,
        state
    }) {
        commit('SET_TOKEN','');
        commit('SET_ROLES',[]);
        removeToken();
    },
    resetToken({
        commit
    }) {
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
