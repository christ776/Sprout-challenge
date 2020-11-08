import { combineReducers } from 'redux'
import reducer from './slice'

const rootReducer = combineReducers({
    state: reducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
