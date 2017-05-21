import Router from 'vue-router'
import AppLoader from '@/components/app_loader/app_loader.vue'
import Login from '@/components/login/login.vue'
import Messenger from '@/components/messenger/messenger.vue'
import Activation from '@/components/activation/activation.vue'


export const create_router = () => new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Loading',
            component: AppLoader,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/me',
            name: 'Messenger',
            component: Messenger,
        },
        {
            path: '/user_activate',
            name: 'Activation',
            component: Activation,
        },
    ],
})
