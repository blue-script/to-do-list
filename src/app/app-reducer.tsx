export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setRequestStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

type InitialStateType = typeof initialState
export type SetRequestStatusType = ReturnType<typeof setRequestStatus>
type ActionsType = SetRequestStatusType