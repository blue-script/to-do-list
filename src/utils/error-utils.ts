import {Dispatch} from "redux";
import {setError, SetErrorType, setRequestStatus, SetRequestStatusType} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
    if (data.messages.length) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError('some error'))
    }
    dispatch(setRequestStatus('failed'))
}
export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, err: ErrorType) => {
    dispatch(setRequestStatus('failed'))
    dispatch(setError(err.message))
}

type ErrorType = {
    message: string
}
type ErrorUtilsDispatchType =
    | SetRequestStatusType
    | SetErrorType