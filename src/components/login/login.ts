import Vue from 'vue'
import { Component, Inject, Model, Prop, Watch } from 'vue-property-decorator'

import { BothubAPI } from '@/connect/bothub'


@Component
export default class Login extends Vue {
    private username: string = ''
    private password: string = ''

    private submit_login() {
        BothubAPI.authenticate(this.username, this.password)
            .then(() => {
                if (BothubAPI.has_auth_credentials()) {
                    this.$router.push('/me')
                }
            })
    }

    private submit_register() {
        BothubAPI.post('/users/')
    }
}
