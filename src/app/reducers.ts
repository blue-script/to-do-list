import { appReducer } from "app/appSlice"
import { authReducer } from "features/auth/model/authSlice"
import { todolistsReducer } from "features/TodolistsList/model/todolistsSlice"
import { tasksReducer } from "features/TodolistsList/model/tasksSlice"
import { combineReducers } from "@reduxjs/toolkit"

export const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  todolists: todolistsReducer,
  tasks: tasksReducer,
})
