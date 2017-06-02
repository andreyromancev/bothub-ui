import * as Vuex from 'vuex'

import { IRootState } from './state'
import { user } from './user'


export const createStore = () => new Vuex.Store<IRootState>({
    modules: {
        user,
    },
})
