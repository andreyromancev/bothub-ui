import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { Webapp } from '@/connect/webapp'


@Component
export default class Activation extends Vue {
    private password: string = ''

    private submit_activation() {
        Webapp.post('/users/activate/', {activation_key: this.$route.query.activation_key, password: this.password})
            .then(() => this.$router.push('/login'))
            .catch(() => alert('Не получилось :('))
    }
}
