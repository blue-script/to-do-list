import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer } from "features/TodolistsList/model/tasksSlice"
import { todolistsReducer } from "features/TodolistsList/model/todolistsSlice"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/auth/model/authSlice"

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
