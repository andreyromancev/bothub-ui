import Router from 'vue-router'
import Market from '@/components/market/market.vue'
import Login from '@/components/login/login.vue'
import Messenger from '@/components/messenger/messenger.vue'
import Activation from '@/components/activation/activation.vue'


export const create_router = () => new Router({
    mode: 'history',
    routes: [
        {
            path: '/market',
            name: 'Bots Market',
            component: Market,
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
