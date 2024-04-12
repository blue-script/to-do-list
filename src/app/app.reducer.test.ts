import { appActions, appReducer } from "app/appSlice"
import { RequestStatusType } from "app/appSlice.types"

type AppInitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

let startState: AppInitialStateType

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
    isInitialized: false,
  }
})

test("correct error message should be set", () => {
  const endState = appReducer(startState, appActions.setAppError({ error: "some error" }))
  expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
  const endState = appReducer(startState, appActions.setAppStatus({ status: "loading" }))
  expect(endState.status).toBe("loading")
})

test("correct isInitialized should be set", () => {
  const endState = appReducer(startState, appActions.setAppInitialized({ isInitialized: true }))
  expect(endState.isInitialized).toBe(true)
})
