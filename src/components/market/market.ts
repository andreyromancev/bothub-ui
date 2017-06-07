import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import BotCard from './bot_card/bot_card.vue'
import { BotProfiles } from './models/bot_profiles'
import { BotProfile } from './models/bot_profile'


@Component({
    components: {BotCard},
})
export default class Market extends Vue {
    private botCollection = new BotProfiles()
    private bots: BotProfile[] = []

    private created() {
        this.updateBots()
    }


    private async updateBots() {
        await this.botCollection.fetch()
        this.bots = this.botCollection.models
    }
}
