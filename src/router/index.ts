import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Register,
        },
        {
            path: '/',
            redirect: '/login',
        },
    ],
})
