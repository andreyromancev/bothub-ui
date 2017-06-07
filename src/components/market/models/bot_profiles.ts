import { BaseCollection } from '@/lib/models'
import { BotProfile } from './bot_profile'


export class BotProfiles extends BaseCollection {
    public readonly url = 'bots'
    public readonly modelClass = BotProfile
}
