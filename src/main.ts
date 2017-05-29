import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import { create_router } from '@/router'
import { create_store } from '@/store'

// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Router)
// Vue.use(BootstrapVue)


const router = create_router()
const store = create_store()

new Vue({
    router,
    store,
    el: '.app',
    template: '<App/>',
    components: { App },
})
