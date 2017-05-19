import Vue from 'vue'
import Vuex from 'vuex'

import App from './app.vue'
import router from './router'
// import BootstrapVue from 'bootstrap-vue'

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(Vuex)
// Vue.use(BootstrapVue)

new Vue({
    el: '.app',
    router,
    template: '<App/>',
    components: { App },
})
