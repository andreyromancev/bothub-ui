import axios, {AxiosRequestConfig, AxiosPromise} from 'axios'
import * as jwt_decode from 'jwt-decode'

import {LocalStore} from '@/utils'
import {HTTP_400_BAD_REQUEST} from '@/utils/http'


export namespace BothubAPI {
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

    export async function initialize(): Promise<void> {
        auth_token = store.get(TOKEN_STORAGE_KEY)
        if (auth_token) {
            await refresh_authentication()
        }
    }

    export async function authenticate(
        username: string, password: string, is_auto_refresh: boolean = true): Promise<void> {

        const data = {'username': username, 'password': password}
        await axios_post.post(AUTH_URL, data, get_config({baseURL: API_ROOT}))
            .then((response) => {
                save_credentials(response.data.token)
                if (is_auto_refresh) { start_auth_refresh() }
            })
            .catch((error) => {
                if (error.response.status === HTTP_400_BAD_REQUEST && auth_token) {
                    clear_credentials()
                }
            })
    }

    export async function refresh_authentication(is_auto_refresh: boolean = true): Promise<void> {
        const data = {token: auth_token}
        await axios_post.post(REFRESH_URL, data, {baseURL: API_ROOT})
            .then((response) => {
                save_credentials(response.data.token)
                if (is_auto_refresh) { start_auth_refresh() }
            })
            .catch((error) => {
                if (error.response.status === HTTP_400_BAD_REQUEST && auth_token) {
                    clear_credentials()
                }
            })
    }

    export function start_auth_refresh() {
        if (!auth_credentials) { return }

        const refresh_time_s = auth_credentials.exp - auth_credentials.orig_iat - 60
        if (refresh_time_s > 0) {
            auth_refresh_timer_id = setTimeout(refresh_authentication, refresh_time_s * 1000)
        } else {
            refresh_authentication()
        }
    }

    export function clear_credentials() {
        auth_token = null
        auth_credentials = null
        store.del(TOKEN_STORAGE_KEY)
        clearTimeout(auth_refresh_timer_id)
    }

    export function has_auth_credentials(): boolean {
        return !!auth_credentials
    }

    export function get_auth_credentials(): object {
        return Object.assign({}, auth_credentials)
    }


    const API_ROOT = process.env.URL_ROOT_API
    const AUTH_URL = '/api-token-auth/'
    const REFRESH_URL = '/api-token-refresh/'
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
    const store = new LocalStore('bothub_api')

    let auth_token: string = null
    let auth_credentials: any = null
    let auth_refresh_timer_id: number = null

    function get_config(config: AxiosRequestConfig = {}): AxiosRequestConfig {
        const result: AxiosRequestConfig = {headers: {}}

        if (auth_token) {
            result.headers.Authorization = `JWT ${auth_token}`
        }

        return Object.assign(result, config)
    }

    function get_data(data: any): string {
        if (typeof data === 'string') { return data }

        return JSON.stringify(data)
    }

    function save_credentials(token: string) {
        auth_token = token
        auth_credentials = jwt_decode(token)
        store.set(TOKEN_STORAGE_KEY, token)
    }

    function handle_error(error) {
        /* handle errors here */
    }
}
