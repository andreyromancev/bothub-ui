import Vue from 'vue'
import Component from 'vue-class-component'

import { Webapp } from '@/connect/webapp'
import * as user from '@/store/user'

@Component
export default class App extends Vue {
    private beforeCreate() {
        if (Webapp.hasAuth()) {
            user.commit.update(this.$store)
        }
    }
}
