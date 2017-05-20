import axios, {AxiosRequestConfig, AxiosPromise} from 'axios'

import {Store} from '@/utils'
import {HTTP_400_BAD_REQUEST} from '@/utils/http'


export namespace Bothub {
    export function request(config: AxiosRequestConfig): AxiosPromise {
        return axios_base.request(get_config(config)).catch(handle_error)
    }
    export function get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return axios_base.get(url, get_config(config)).catch(handle_error)
    }
    export function del(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return axios_base.delete(url, get_config(config)).catch(handle_error)
    }
    export function head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return axios_base.head(url, get_config(config)).catch(handle_error)
    }
    export function post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return axios_post.post(url, get_data(data), get_config(config)).catch(handle_error)
    }
    export function put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return axios_post.put(url, get_data(data), get_config(config)).catch(handle_error)
    }
    export function patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return axios_post.patch(url, get_data(data), get_config(config)).catch(handle_error)
    }

    export function authenticate(username: string, password: string) {
        const data = {'username': username, 'password': password}
        const config = {baseURL: API_ROOT}
        return axios_post.post(process.env.URL_API_AUTH, data, get_config(config))
            .then((response) => {
                auth_token = response.data.token
                store.set(TOKEN_STORAGE_KEY, auth_token)
            })
            .catch((error) => {
                if (error.response.status === HTTP_400_BAD_REQUEST && auth_token) {
                    auth_token = null
                    store.del(TOKEN_STORAGE_KEY)
                }
            })
    }

    export function is_authenticated(): boolean {
        return !!auth_token
    }


    const API_ROOT = process.env.URL_ROOT_API
    const TOKEN_STORAGE_KEY = 'auth_token'

    const AXIOS_CONFIG_BASE = {
        baseURL: `${API_ROOT}/api/v1`,
        timeout: 10000,
    }
    const AXIOS_CONFIG_POST = Object.assign(AXIOS_CONFIG_BASE, {
        headers: {'Content-Type': 'application/json'},
    })

    const axios_base = axios.create(AXIOS_CONFIG_BASE)
    const axios_post = axios.create(AXIOS_CONFIG_POST)
    const store = new Store('bothub_api')

    let auth_token: string = store.get(TOKEN_STORAGE_KEY)

    function get_config(config: AxiosRequestConfig = {}): AxiosRequestConfig {
        const result: AxiosRequestConfig = {headers: {}}

        if (auth_token) {
            result.headers.Authorization = `JWT ${auth_token}edw`
        }

        return Object.assign(result, config)
    }

    function get_data(data: any): string {
        if (typeof data === 'string') { return data }

        return JSON.stringify(data)
    }

    function handle_error(error) {
        /* handle errors here */
    }
}
