import { ActionContext, Store } from 'vuex'
import { getStoreAccessors } from 'vuex-typescript'

import { Webapp } from '@/connect/webapp'

import { IRootState } from '@/store/state'
import { IUserState } from './state'


type UserContext = ActionContext<IUserState, IRootState>


export const user = {
    namespaced: true,

    state: {
        id: null,
        username: null,
        email: null,
    },

    getters: {},

    mutations: {
        reset(state: IUserState) {
            state.id = null
            state.username = null
            state.email = null
        },

        update(state: IUserState) {
            const data = Webapp.getAuthData()
            state.id = data.id
            state.username = data.username
            state.email = data.email
        },
    },

    actions: {
        // async log_in(context: UserContext, data: {username: string, password: string}): Promise<void> {
        //     if (! await Webapp.authenticate(data.username, data.password)) {
        //         return
        //     }
        //
        //     await dispatch.fetch_credentials(context)
        // },
        //
        // async fetch_credentials(context: UserContext): Promise<void> {
        //     return Webapp.get('/users/')
        //         .then((response) => {
        //             const user_data = response.data[0]
        //             const credentials = {
        //                 id: user_data.id,
        //                 name: user_data.email,
        //                 email: user_data.email,
        //             }
        //             commit.fill_credentials(context, credentials)
        //         })
        // },
    },
}

const accessors = getStoreAccessors<IUserState, IRootState>('user')

const getters = user.getters
const mutations = user.mutations
const actions = user.actions


export const read = {}
export const commit = {
    update: accessors.commitNoPayload(mutations.update),
}
export const dispatch = {
    // log_in: accessors.dispatch(actions.log_in),
    // fetch_credentials: accessors.dispatchNoPayload(actions.fetch_credentials),
}
