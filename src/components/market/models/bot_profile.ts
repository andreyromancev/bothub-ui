import { BaseModel } from '@/lib/models'


export class BotProfile extends BaseModel {
    public data: {
        id: number,
        url: string,
        name: string,
        shortDescription: string,
        description: string,
    }

    constructor(data) {
        super(data)
        this.data.name = data.name
        this.data.shortDescription = data.short_description
        this.data.description = data.description
    }
}
