export class LocalStore {
    constructor(prefix: string, parent?: LocalStore) {
        this.parent = parent
        this.prefix = prefix
        if (parent) {
            this.prefix = this.parent.prefix + LocalStore.PATH_SEP + prefix
        }
    }

    public set(key: string, data: any, update?: boolean) {
        if (data === this.cache[key]) { return }

        if (typeof data === 'object' && update) {
            this.cache[key] = Object.assign(this.cache, data)
        } else {
            this.cache[key] = data
        }

        localStorage.setItem(this.prefix + LocalStore.KEY_SEP + key, this.serialize(data))
    }

    public get(key: string): any {
        if (this.cache[key] !== undefined) { return this.cache[key] }

        const data = localStorage.getItem(this.prefix + LocalStore.KEY_SEP + key)

        return this.deserialize(data)
    }

    public del(key: string) {
        delete this.cache[key]
        localStorage.removeItem(this.prefix + LocalStore.KEY_SEP + key)
    }

    private static PATH_SEP = '.'
    private static KEY_SEP = ':'
    private prefix: string = ''
    private cache = {}
    private parent: LocalStore = null

    private serialize(data: any): string {
        if (typeof data === 'string') {
            return data
        }

        return JSON.stringify(data)
    }

    private deserialize(data: string): any {
        try {
            return JSON.parse(data)
        } catch (e) {
            return data
        }
    }
}
