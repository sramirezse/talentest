import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import routes from './router';
Vue.use(Router);



const router = createRouter();
sync(store, router)

export default router

function createRouter() {
    const router = new Router({
        routes: routes,
        base: '/dashboard',
        mode: 'history',
        scrollBehavior() {
            return { x: 0, y: 0 }
        },

    });

    router.beforeEach(beforeEach)
    router.afterEach(afterEach)
    return router
}


/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function beforeEach(to, from, next) {

    const isAuthenticated = store.getters['auth/check'];
    console.log(isAuthenticated);
    const user = store.getters['auth/user'];
    console.log(to);
    console.log('afuera aun');
    if (to.name !== 'Login' && !isAuthenticated) {
        console.log('entro alogin');
        next({ name: 'Login' })
    }if(to.name === 'Login' && isAuthenticated){
        console.log('entro a tablero');
        next({ name: 'Tablero' })
    }
    else {
        next()
    }

}

/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function afterEach(to, from, next) {
    await router.app.$nextTick()

    router.app.$loading.finish()
}
