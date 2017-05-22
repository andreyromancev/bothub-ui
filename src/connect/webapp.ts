import axios, {AxiosRequestConfig, AxiosPromise} from 'axios'
import * as jwt_decode from 'jwt-decode'

import {LocalStore} from '@/utils'
import {HTTP_400_BAD_REQUEST} from '@/utils/http'


export namespace Webapp {
    export interface IAuthData {
        id: number,
        username: string,
        email: string,
        issued_time_s: number,
        expire_time_s: number,
    }

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
        refresh_token = store.get(TOKEN_STORAGE_KEY)
        if (refresh_token) {
            await refresh_authentication()
        }
    }

    export async function authenticate(
        username: string, password: string, is_auto_refresh: boolean = true): Promise<void> {

        const data = {'username': username, 'password': password}
        await axios_post.post(TOKEN_REFRESH_URL, data, get_config({baseURL: API_ROOT}))
            .then((response) => {
                save_auth_data(response.data.access_token, response.data.refresh_token)
                if (is_auto_refresh) { start_auth_refresh() }
            })
            .catch((error) => {
                if (error.response.status === HTTP_400_BAD_REQUEST) {
                    clear_auth_data(true)
                }
            })
    }

    export async function refresh_authentication(is_auto_refresh: boolean = true): Promise<void> {
        const data = {'refresh_token': refresh_token}
        await axios_post.post(TOKEN_ACCESS_URL, data, {baseURL: API_ROOT})
            .then((response) => {
                save_auth_data(response.data.access_token)
                if (is_auto_refresh) { start_auth_refresh() }
            })
            .catch((error) => {
                if (error.response.status === HTTP_400_BAD_REQUEST) {
                    clear_auth_data(true)
                }
            })
    }

    export function start_auth_refresh() {
        if (!auth_data) { return }

        const refresh_time_s = auth_data.expire_time_s - auth_data.issued_time_s - 60
        if (refresh_time_s > 0) {
            auth_refresh_timer_id = setTimeout(refresh_authentication, refresh_time_s * 1000)
        } else {
            setTimeout(refresh_authentication, 1000 * 60)
        }
    }

    export function clear_auth_data(is_full: boolean = false) {
        access_token = null
        auth_data = null
        if (is_full) {
            refresh_token = null
            store.del(TOKEN_STORAGE_KEY)
        }

        clearTimeout(auth_refresh_timer_id)
    }

    export function has_auth(): boolean {
        return !!auth_data
    }

    export function get_auth_data(): IAuthData {
        return Object.assign({}, auth_data)
    }


    //const API_ROOT = process.env.URL_ROOT_API
    const API_ROOT = ''
    const TOKEN_REFRESH_URL = '/api-token-refresh/'
    const TOKEN_ACCESS_URL = '/api-token-access/'
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

    let refresh_token: string = null
    let access_token: string = null
    let auth_data: IAuthData = null
    let auth_refresh_timer_id: number = null

    function get_config(config: AxiosRequestConfig = {}): AxiosRequestConfig {
        const result: AxiosRequestConfig = {headers: {}}

        if (access_token) {
            result.headers.Authorization = `JWT ${access_token}`
        }

        return Object.assign(result, config)
    }

    function get_data(data: any): string {
        if (typeof data === 'string') { return data }

        return JSON.stringify(data)
    }

    function save_auth_data(a_token: string, r_token?: string) {
        access_token = a_token
        const payload = jwt_decode(access_token)
        auth_data = {
            id: payload.uid,
            username: payload.una,
            email: payload.ema,
            issued_time_s: payload.iat,
            expire_time_s: payload.exp,
        }
        if (r_token) {
            refresh_token = r_token
            store.set(TOKEN_STORAGE_KEY, refresh_token)
        }
    }

    function handle_error(error) {
        throw error
    }
}
