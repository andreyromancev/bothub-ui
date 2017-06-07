import axios, {AxiosRequestConfig, AxiosPromise} from 'axios'
import * as jwt_decode from 'jwt-decode'

import {LocalStore} from '@/lib/utils'
import {HTTP_400_BAD_REQUEST} from '@/lib/utils/http'


export namespace Webapp {
    export interface AuthData {
        id: number,
        username: string,
        email: string,
    }

    export function request(config: AxiosRequestConfig): AxiosPromise {
        return axiosBase.request(getConfig(config)).catch(handleError)
    }
    export function get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return axiosBase.get(url, getConfig(config)).catch(handleError)
    }
    export function del(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return axiosBase.delete(url, getConfig(config)).catch(handleError)
    }
    export function head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return axiosBase.head(url, getConfig(config)).catch(handleError)
    }
    export function post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return axiosPost.post(url, getData(data), getConfig(config)).catch(handleError)
    }
    export function put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return axiosPost.put(url, getData(data), getConfig(config)).catch(handleError)
    }
    export function patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return axiosPost.patch(url, getData(data), getConfig(config)).catch(handleError)
    }

    export async function initialize(): Promise<void> {
        refreshToken = store.get(TOKEN_STORAGE_KEY)
        if (refreshToken) {
            await refreshAuthentication()
        }
    }

    export async function authenticate(
        username: string, password: string, isAutoRefresh: boolean = true): Promise<void> {

        const data = {'username': username, 'password': password}
        await axiosPost.post(TOKEN_REFRESH_URL, data, getConfig({baseURL: API_ROOT}))
            .then((response) => {
                saveAuthData(response.data.access_token, response.data.refresh_token)
                if (isAutoRefresh) { startAuthRefresh(response.data.expires_in - 60) }
            })
            .catch((error) => {
                if (error.response.status === HTTP_400_BAD_REQUEST) {
                    clearAuthData(true)
                }
            })
    }

    export async function refreshAuthentication(isAutoRefresh: boolean = true): Promise<void> {
        const data = {'refresh_token': refreshToken}
        await axiosPost.post(TOKEN_ACCESS_URL, data, {baseURL: API_ROOT})
            .then((response) => {
                saveAuthData(response.data.access_token)
                if (isAutoRefresh) { startAuthRefresh(response.data.expires_in - 60) }
            })
            .catch((error) => {
                if (error.response.status === HTTP_400_BAD_REQUEST) {
                    clearAuthData(true)
                } else {
                    startAuthRefresh(1000 * 60)
                }
            })
    }

    export function startAuthRefresh(timeout: number) {
        if (!authData) { return }

        if (timeout > 0) {
            authRefreshTimerId = setTimeout(refreshAuthentication, timeout * 1000)
        } else {
            setTimeout(refreshAuthentication, 1000 * 60)
        }
    }

    export function clearAuthData(isFullClean: boolean = false) {
        accessToken = null
        authData = null
        if (isFullClean) {
            refreshToken = null
            store.del(TOKEN_STORAGE_KEY)
        }

        clearTimeout(authRefreshTimerId)
    }

    export function hasAuth(): boolean {
        return !!authData
    }

    export function getAuthData(): AuthData {
        return Object.assign({}, authData)
    }


    const API_ROOT = process.env.URL_ROOT_API
    const TOKEN_REFRESH_URL = '/auth/refresh_token/'
    const TOKEN_ACCESS_URL = '/auth/access_token/'
    const TOKEN_STORAGE_KEY = 'auth_token'

    const AXIOS_CONFIG_BASE = {
        baseURL: `${API_ROOT}/api/v1`,
        timeout: 10000,
    }
    const AXIOS_CONFIG_POST = Object.assign(AXIOS_CONFIG_BASE, {
        headers: {'Content-Type': 'application/json'},
    })

    const axiosBase = axios.create(AXIOS_CONFIG_BASE)
    const axiosPost = axios.create(AXIOS_CONFIG_POST)
    const store = new LocalStore('bothub_api')

    let refreshToken: string = null
    let accessToken: string = null
    let authData: AuthData = null
    let authRefreshTimerId: number = null

    function getConfig(config: AxiosRequestConfig = {}): AxiosRequestConfig {
        const result: AxiosRequestConfig = {headers: {}}

        if (accessToken) {
            result.headers.Authorization = `JWT ${accessToken}`
        }

        return Object.assign(result, config)
    }

    function getData(data: any): string {
        if (typeof data === 'string') { return data }

        return JSON.stringify(data)
    }

    function saveAuthData(aToken: string, rToken?: string) {
        accessToken = aToken
        const payload = jwt_decode(aToken)
        authData = {
            id: payload.uid,
            username: payload.una,
            email: payload.ema,
        }
        if (rToken) {
            refreshToken = rToken
            store.set(TOKEN_STORAGE_KEY, rToken)
        }
    }

    function handleError(error) {
        throw error
    }
}
