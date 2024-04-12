import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions"
import { createAppAsyncThunk } from "common/utils"
import { ResultCode } from "common/enums"
import { LoginParamsType } from "features/auth/api/authApi.types"
import { authAPI } from "features/auth/api/authApi"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    captcha: null as string | null,
  },
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
    selectCaptcha: (sliceState) => sliceState.captcha,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCaptcha.fulfilled, (state, action) => {
        state.captcha = action.payload.url
      })
      .addMatcher(
        isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      )
  },
})

const getCaptcha = createAppAsyncThunk<
  {
    url: string | null
  },
  undefined
>(`${slice.name}/login`, async (_) => {
  const res = await authAPI.getCaptcha()
  return { url: res.data.url }
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    const res = await authAPI.login(arg)
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true }
    } else if (res.data.resultCode === ResultCode.Captcha) {
      dispatch(getCaptcha())
      return rejectWithValue(res.data)
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  const res = await authAPI.logout()
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists())
    return { isLoggedIn: false }
  } else {
    return rejectWithValue(res.data)
  }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await authAPI.me()
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp }
export const { selectIsLoggedIn, selectCaptcha } = slice.selectors
