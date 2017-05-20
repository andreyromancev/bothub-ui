import * as Vuex from 'vuex'

import { IRootState } from './state'
import { user } from './user'


export const create_store = () => new Vuex.Store<IRootState>({
    modules: {
        user,
    },
})
