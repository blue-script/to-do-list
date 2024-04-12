import { createSlice, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { todolistsThunks } from "features/TodolistsList/model/todolistsSlice"
import { tasksThunks } from "features/TodolistsList/model/tasksSlice"
import { authThunks } from "features/auth/model/authSlice"
import { RequestStatusType } from "app/appSlice.types"

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
}

const slice = createSlice({
  name: "app",
  initialState,
  selectors: {
    selectAppStatus: (sliceState) => sliceState.status,
    selectAppError: (sliceState) => sliceState.error,
    selectIsInitialized: (sliceState) => sliceState.isInitialized,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = "failed"
        if (action.payload) {
          if (
            action.type === todolistsThunks.addTodolist.rejected.type ||
            action.type === tasksThunks.addTask.rejected.type ||
            action.type === authThunks.initializeApp.rejected.type
          )
            return
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred"
        }
      })
      .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected), (state) => {
        state.isInitialized = true
      })
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const { selectAppStatus, selectAppError, selectIsInitialized } = slice.selectors
