import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import routes from './router'
import Cookies from 'js-cookie'

Vue.use(Router)


const router = createRouter()

sync(store, router)

export default router

/**
 * Create a new router instance.
 *
 * @return {Router}
 */
function createRouter() {
    const router = new Router({
        mode: 'history',
        base: '/dashboard',
        scrollBehavior() {
            return { x: 0, y: 0 }
        },
        routes: routes
    })

    router.beforeEach(beforeEach)

    return router
}
/*
function createRouter () {
  const router = new Router({
    mode: 'history',
    base: '/app',
    scrollBehavior () {
      return { x: 0, y: 0 }
    },
    routes: modules
  })

  router.beforeEach(beforeEach)
  router.afterEach(afterEach)

  return router
}
*/
/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function beforeEach(to, from, next) {
    const token = Cookies.get('token');
    if(token){
        await store.dispatch('auth/fetchUser').then((res) => {
            console.log('res')
        });
    }
    const auth = store.getters['auth/check'];
    if (!token && to.name !== 'Login') {
        // store.commit('auth/SAVE_TOKEN', { token, remember: true })

        next({ name: 'Login' })
    }if(to.name !== 'Login'  && auth && token){

        next()
    }if(to.name === 'Login' && auth && token){
        next({ name: 'Tablero' })
    }
    next()

}
