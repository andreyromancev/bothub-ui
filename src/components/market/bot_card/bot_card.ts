import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { BotProfile } from '../models/bot_profile'


@Component
export default class BotCard extends Vue {
    @Prop()
    private model: BotProfile

    get bot() {
        return this.model.data
    }
}
