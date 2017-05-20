import { ActionContext, Store } from 'vuex'
import { getStoreAccessors } from 'vuex-typescript'

import { BothubAPI } from '@/connect/bothub'

import { IRootState } from '@/store/state'
import { IUserState } from './state'


type UserContext = ActionContext<IUserState, IRootState>

export const user = {
    namespaced: true,

    state: {
        id: null,
        name: null,
        email: null,
        is_logged: false,
    },

    getters: {},

    mutations: {
        reset(state: IUserState) {
            state.id = null
            state.name = null
            state.email = null
            state.is_logged = false
        },

        fill_credentials(state: IUserState, data: {id: number, name: string, email: string}) {
            state.id = data.id
            state.name = data.name
            state.email = data.email
            state.is_logged = true
        },
    },

    actions: {
        async log_in(context: UserContext, data: {username: string, password: string}): Promise<void> {
            if (! await BothubAPI.authenticate(data.username, data.password)) {
                return
            }

            await dispatch.fetch_credentials(context)
        },

        async fetch_credentials(context: UserContext): Promise<void> {
            return BothubAPI.get('/users/')
                .then((response) => {
                    const user_data = response.data[0]
                    const credentials = {
                        id: user_data.id,
                        name: user_data.email,
                        email: user_data.email,
                    }
                    commit.fill_credentials(context, credentials)
                })
        },
    },
}

const accessors = getStoreAccessors<IUserState, IRootState>('user')

const getters = user.getters
const mutations = user.mutations
const actions = user.actions


export const read = {}
export const commit = {
    fill_credentials: accessors.commit(mutations.fill_credentials),
}
export const dispatch = {
    log_in: accessors.dispatch(actions.log_in),
    fetch_credentials: accessors.dispatchNoPayload(actions.fetch_credentials),
}
