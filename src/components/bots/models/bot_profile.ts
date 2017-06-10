import { AbstractModel } from '@/lib/models'


export class BotProfile extends AbstractModel {
    public content: {
        id: number,
        url: string,
        name: string,
        shortDescription: string,
        description: string,
    }

    public readonly baseURL = 'bots'

    protected parseContent(data) {
        super.parseContent(data)
        this.content.name = data.name
        this.content.shortDescription = data.short_description
        this.content.description = data.description
    }
}
