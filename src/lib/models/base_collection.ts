import { Webapp } from '@/connect/webapp'
import * as http from '@/lib/utils/http'


export abstract class BaseCollection {
    public abstract readonly url: string
    public abstract readonly modelClass: any
    public models: any[]

    public async fetch(): Promise<void> {
        const response = await Webapp.get(this.url + '/')
        if (response.status == http.HTTP_200_OK) {
            this.models = []
            for (const data of response.data) {
                this.models.push(new this.modelClass(data))
            }
        }
    }
}
