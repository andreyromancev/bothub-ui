import Router from 'vue-router'
import Login from '@/components/login/login.vue'


export const create_router = () => new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
    ],
})
