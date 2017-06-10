import { Webapp } from '@/connect/webapp'
import * as http from '@/lib/utils/http'


export abstract class AbstractModel {
    public content: {
        id: number,
        url: string,
    }

    public abstract readonly baseURL: string

    constructor(data?) {
        this.content = {
            id: null,
            url: null,
        }
        this.parseContent(data || {})
    }

    public async fetch(options?): Promise<boolean> {
        const url = this.getUrl(options)
        if (!url) {
            throw Error('Fetch without url is not allowed')
        }

        const response = await Webapp.get(url + '/')
        if (response.status == http.HTTP_200_OK) {
            this.parseContent(response.data)

            return true
        }

        return false
    }

    protected parseContent(data) {
        this.content.id = parseInt(data.id)
        this.content.url = data.url
    }

    private getUrl(options?): string {
        if (options) {
            if (options.url) {
                return options.url
            }

            if (options.id && this.baseURL) {
                return `${this.baseURL}/${options.id}`
            }
        }

        if (this.content.url) {
            return this.content.url
        }

        if (this.content.id && this.baseURL) {
            return `${this.baseURL}/${this.content.id}`
        }

        return null
    }
}
