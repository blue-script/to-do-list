import { authReducer, authThunks } from "features/auth/model/authReducer"

type AuthStateType = {
  isLoggedIn: boolean
}

let startState: AuthStateType

beforeEach(() => {
  startState = { isLoggedIn: false }
})

test("correct isLoggedIn should be set when we log in", () => {
  const action = authThunks.login.fulfilled({ isLoggedIn: true }, "requestId", {
    email: "test",
    password: "test",
    rememberMe: true,
  })

  const endState = authReducer(startState, action)

  expect(endState.isLoggedIn).toBe(true)
})

test("correct isLoggedIn should be set when we log in", () => {
  startState = { isLoggedIn: true }
  const action = authThunks.logout.fulfilled({ isLoggedIn: false }, "requestId")

  const endState = authReducer(startState, action)

  expect(endState.isLoggedIn).toBe(false)
})

test("correct isLoggedIn should be set when initialized App", () => {
  const action = authThunks.initializeApp.fulfilled({ isLoggedIn: true }, "requestId")

  const endState = authReducer(startState, action)

  expect(endState.isLoggedIn).toBe(true)
})
