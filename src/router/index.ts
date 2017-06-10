import Router from 'vue-router'
import Bots from '@/components/bots/bots.vue'
import Bot from '@/components/bots/bot/bot.vue'
import Login from '@/components/login/login.vue'
import Messenger from '@/components/messenger/messenger.vue'
import Activation from '@/components/activation/activation.vue'


export const createRouter = () => new Router({
    mode: 'history',
    routes: [
        {
            path: '/bots',
            component: Bots,
        },
        {
            path: '/bots/:id',
            component: Bot,
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/me',
            component: Messenger,
        },
        {
            path: '/user_activate',
            component: Activation,
        },
    ],
})
