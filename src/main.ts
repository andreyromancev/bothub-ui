import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import { createRouter } from '@/router'
import { createStore } from '@/store'
import { Webapp } from '@/connect/webapp'

// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Router)
// Vue.use(BootstrapVue)

const router = createRouter()
const store = createStore()

Webapp.initialize().then(() => {
    new Vue({
        router,
        store,
        el: '.app',
        template: '<App/>',
        components: { App },
    })
})
