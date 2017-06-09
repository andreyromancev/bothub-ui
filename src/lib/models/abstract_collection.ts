import { Webapp } from '@/connect/webapp'
import * as http from '@/lib/utils/http'


export abstract class AbstractCollection {
    public abstract readonly url: string
    public abstract readonly modelClass: any

    public get content() {
        return this.models
    }

    public clear() {
        this.models = []
    }

    public async fetch(options?): Promise<void> {
        this.getQuery(options)
        const response = await Webapp.get(this.url + '/' + this.getQuery(options))
        if (response.status == http.HTTP_200_OK) {
            this.clear()
            this.appendResponseData(response.data)
        }
    }

    public async fetchNext(): Promise<boolean> {
        if (!this.nextUrl) {
            return false
        }
        const response = await Webapp.get(this.nextUrl, {baseURL: ''})
        if (response.status == http.HTTP_200_OK) {
            this.appendResponseData(response.data)
        }

        return true
    }

    public async fetchPrev(): Promise<boolean> {
        if (!this.prevUrl) {
            return false
        }
        const response = await Webapp.get(this.prevUrl, {baseURL: ''})
        if (response.status == http.HTTP_200_OK) {
            this.appendResponseData(response.data)
        }

        return true
    }

    private models: any[] = []
    private nextUrl: string = null
    private prevUrl: string = null

    private appendResponseData(data: any) {
        this.nextUrl = data.next
        this.prevUrl = data.previous
        for (const modelData of data.results) {
            this.models.push(new this.modelClass(modelData))
        }
    }

    private getQuery(options: {search?: string}): string {
        if (!options) {
            return ''
        }

        const params = []
        if (options.search) {
            params.push('search=' + options.search)
        }

        let query = ''
        if (params) {
            query = '?'
        }
        query += params.join('&')

        return query
    }
}
