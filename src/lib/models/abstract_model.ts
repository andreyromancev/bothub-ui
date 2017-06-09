export abstract class AbstractModel {
    public data: {
        id: number,
        url: string,
    }

    constructor(data) {
        this.data = {
            id: data.id,
            url: data.url,
        }
    }
}
