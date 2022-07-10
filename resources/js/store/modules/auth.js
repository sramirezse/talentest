import userApi from "../../api/userApi";
import Cookies from 'js-cookie'
import router from "../../router";
// state
export const state = {
    user: null,
    isLoggedIn: localStorage.getItem('isLoggedIn'),
    token: Cookies.get('token'),
}

// getters
export const getters = {
    user: state => state.user,
    token: state => state.isLoggedIn,
    check: state => state.user !== null,
    authToken: state => state.token,
    isLoggedIn: state => state.isLoggedIn,
}
// mutations
export const mutations = {
    SAVE_TOKEN(state, { token, remember }) {
        state.token = token
        Cookies.set('token', token, { expires: 365 })
        localStorage.setItem('isLoggedIn', 'true')
        state.isLoggedIn = true
    },

    FETCH_USER_SUCCESS(state, { user }) {
        state.user = user
    },

    FETCH_USER_FAILURE(state) {
        state.token = null
        localStorage.removeItem('isLoggedIn')
    },

    LOGOUT(state) {
        state.user = null
        localStorage.removeItem('isLoggedIn')
        state.isLoggedIn = false
    },

    UPDATE_USER(state, { user }) {
        state.user = user
    }
}

// actions
export const actions = {

    async login({ commit, dispatch }, payload) {
            const res = await userApi.signin(payload)
            const data = res.data
            commit('SAVE_TOKEN', { token: data.access_token, remember: payload.checkbox_remember_me });
            return res;
    },

    async refresh({ commit }) {
        try {
            const { data } = await userApi.refresh()
            commit('SAVE_TOKEN', { token: data.access_token, remember: payload.checkbox_remember_me })
        } catch (e) {
            commit('FETCH_USER_FAILURE')
        }
    },

    async fetchUser({ commit }) {

        await userApi.me().then((res) => {

            if (res.status === 401) {
                Cookies.remove('token')
                router.push({ name: 'Login' });
                return res;

            } else {

                commit('FETCH_USER_SUCCESS', { user: res.data })
                return res;
            }
        });

    },

    updateUser({ commit }, payload) {
        commit('UPDATE_USER', payload)
    },

    async logout({ commit }) {
        try {
            await userApi.logout();
            Cookies.remove('token');
            commit('LOGOUT')
        } catch (e) { }

        commit('LOGOUT')
    }
}
