import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { Webapp } from '@/connect/webapp'
import * as user from '@/store/user'


@Component
export default class Messenger extends Vue {
    get login(): string {
        return this.$store.state.user.email
    }

    private logout() {
        Webapp.clearAuthData(true)
        this.$router.push('/login')
    }
}
