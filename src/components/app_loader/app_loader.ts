import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { Webapp } from '@/connect/webapp'
import * as user from '@/store/user'


@Component
export default class AppLoader extends Vue {
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
