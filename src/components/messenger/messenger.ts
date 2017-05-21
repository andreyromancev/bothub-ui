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
        Webapp.clear_auth_data(true)
        this.$router.push('/login')
    }

    private created() {
        Webapp.initialize()
            .then(() => {
                if (Webapp.has_auth()) {
                    user.commit.update(this.$store)
                    this.$router.push('/me')
                } else {
                    this.$router.push('/login')
                }
            })
    }
}
