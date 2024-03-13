import { tasksReducer } from "features/TodolistsList/tasksSlice"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { configureStore, UnknownAction } from "@reduxjs/toolkit"
import { authReducer } from "features/Login/authSlice"
import { appReducer } from "app/appSlice"
import { todolistsReducer } from "features/TodolistsList/todolistsSlice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>

// ❗ UnknownAction вместо AnyAction
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

// export type AppDispatch = typeof store.dispatch
// ❗ UnknownAction вместо AnyAction
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
