import Vue from 'vue'
import Component from 'vue-class-component'

import {BothubAPI} from '@/connect/bothub'


@Component
export default class App extends Vue {
    private created() {
        BothubAPI.initialize()
            .then(() => {
                if (BothubAPI.has_auth_credentials()) {
                    this.$router.push('/me')
                } else {
                    this.$router.push('/login')
                }
            })
    }
}
