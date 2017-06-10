import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { BotProfile } from '../models/bot_profile'


@Component
export default class Bot extends Vue {
    private botModel = new BotProfile()
    private bot = {}

    private created() {
        this.bot = this.botModel.content
        this.fetchBot({id: this.$route.params.id})
    }

    private async fetchBot(options?) {
        this.botModel.fetch(options)
    }

}
