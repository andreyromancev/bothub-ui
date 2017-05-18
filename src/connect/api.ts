import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosInstance,
    AxiosAdapter,
    AxiosPromise,
    Cancel,
    CancelToken,
    CancelTokenSource,
    Canceler,
} from 'axios'

export enum Version {
    v1,
}

export class API  {
    public static request(config: AxiosRequestConfig): AxiosPromise {
        return axios.request(this.get_config(config))
    }
    public static get(url: string, version?: Version, config?: AxiosRequestConfig): AxiosPromise {
        return axios.get(this.get_url(url, version), this.get_config(config))
    }
    public static delete(url: string, version?: Version, config?: AxiosRequestConfig): AxiosPromise {
        return axios.delete(this.get_url(url, version), this.get_config(config))
    }
    public static head(url: string, version?: Version, config?: AxiosRequestConfig): AxiosPromise {
        return axios.head(this.get_url(url, version), this.get_config(config))
    }
    public static post(url: string, data?: any, version?: Version, config?: AxiosRequestConfig): AxiosPromise {
        return axios.post(this.get_url(url, version), data, this.get_config(config))
    }
    public static put(url: string, data?: any, version?: Version, config?: AxiosRequestConfig): AxiosPromise {
        return axios.put(this.get_url(url, version), data, this.get_config(config))
    }
    public static patch(url: string, data?: any, version?: Version, config?: AxiosRequestConfig): AxiosPromise {
        return axios.patch(this.get_url(url, version), data, this.get_config(config))
    }

    private static readonly DEFAULT_API_VERSION = Version.v1
    private static readonly CONFIG = {}

    private static get_url(url: string, version = this.DEFAULT_API_VERSION): string {
        return `${process.env.API_ROOT}/api/${Version[version]}/${url}`
    }
    private static get_config(config = {}): AxiosRequestConfig {
        return Object.assign(this.CONFIG, config)
    }
}
