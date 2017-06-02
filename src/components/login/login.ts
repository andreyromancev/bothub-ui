import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { Webapp } from '@/connect/webapp'
import * as user from '@/store/user'


@Component
export default class Login extends Vue {
    private username: string = ''
    private password: string = ''

    private submitLogin() {
        Webapp.authenticate(this.username, this.password)
            .then(() => {
                if (Webapp.hasAuth()) {
                    user.commit.update(this.$store)
                    this.$router.push('/me')
                }
            })
    }

    private submitRegister() {
        Webapp.post('/users/', {email: this.username})
            .then(() => alert('Письмо с активацией уже летит!'))
            .catch((e) => alert(e.response.data.email))
    }
}
