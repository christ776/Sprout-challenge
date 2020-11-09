import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Mode, Payload, Result } from '../utils/calcs'
import resolvers from '../utils/resolvers'

const initialResult: Result = { H: 0, K: 0}
const initialPayload: Payload = {
    A: false,
    B: false,
    C: false,
    D: 0.01,
    E: 0,
    F: 0
}

export interface InputChange {
    name: string
    value: any
}

export const slice = createSlice({
    name: 'resolver',
    initialState: {
        result: initialResult,
        mode: Mode.Default,
        inputs: initialPayload,
        error: false
    },

    reducers: {
        calculationMethodDidChange: (state, action:PayloadAction<Mode>) => {
            if (resolvers.has(action.payload)) {
                state.mode = action.payload
                const calculator = resolvers.get(action.payload)
                try {
                    state.result = calculator?.getResultsFor(state.inputs) || initialResult
                    state.error = false
                } catch (error) {
                    state.error = true
                }
            }
        },
        inputDidChange: (state, action:PayloadAction<InputChange>) => {
            let inputs= state.inputs
            switch (action.payload.name) {
                case 'A':
                    inputs.A = action.payload.value
                    break;

                case 'B':
                    inputs.B = action.payload.value
                    break;

                case 'C':
                    inputs.C = action.payload.value
                    break;
                
                case 'D':
                    inputs.D = parseFloat(action.payload.value)
                    break;

                case 'E':
                    inputs.E = parseInt(action.payload.value)
                    break;

                case 'F':
                    inputs.F = parseInt(action.payload.value)
                    break;
                    
                default:
                    break;
                }
            state.inputs = inputs
            const calculator = resolvers.get(state.mode)
            try {
                state.result = calculator?.getResultsFor(state.inputs) || initialResult
                state.error = false
            } catch (error) {
                state.error = true
            }
        }
    }
})

export const { inputDidChange, calculationMethodDidChange } = slice.actions

export default slice.reducer
