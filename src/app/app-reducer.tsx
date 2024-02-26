const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setRequestStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
export type SetRequestStatusType = ReturnType<typeof setRequestStatus>
export type SetErrorType = ReturnType<typeof setError>
export type ActionsAppType =
    | SetRequestStatusType
    | SetErrorType