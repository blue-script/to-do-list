import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "features/auth/model/auth.slice"
import { tasksReducer } from "features/TodolistsList/model/tasksSlice"
import { todolistsReducer } from "features/TodolistsList/model/todolistsSlice"
import { appReducer } from "app/appSlice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authSlice,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
