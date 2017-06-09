import { AbstractCollection } from '@/lib/models'
import { BotProfile } from './bot_profile'


export class BotProfiles extends AbstractCollection {
    public readonly url = 'bots'
    public readonly modelClass = BotProfile
}
