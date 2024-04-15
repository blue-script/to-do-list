import { configureStore } from "@reduxjs/toolkit"
import { reducers } from "app/reducers"

export const store = configureStore({
  reducer: reducers,
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./reducers", () => {
    store.replaceReducer(reducers)
  })
}
