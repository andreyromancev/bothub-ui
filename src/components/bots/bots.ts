import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Debounce } from 'lodash-decorators'

import BotCard from './bot_card/bot_card.vue'
import { BotProfiles } from './models/bot_profiles'
import { BotProfile } from './models/bot_profile'


@Component({
    components: {BotCard},
})
export default class Bots extends Vue {
    private botCollection = new BotProfiles()
    private bots: BotProfile[] = []

    private searchString: string = ''

    private created() {
        this.bots = this.botCollection.content
        this.fetchBots()
    }

    private async fetchBots(options?) {
        await this.botCollection.fetch(options)
    }

    private async appendBots() {
        await this.botCollection.fetchNext()
    }

    @Debounce(500)
    @Watch('searchString')
    private onSearchChange(newSearch) {
        this.fetchBots({search: newSearch})
    }
}
