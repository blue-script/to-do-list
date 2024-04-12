import { instance } from "common/api/common.api"
import { BaseResponseType } from "common/types/common.types"
import { CapchaType, LoginParamsType } from "features/auth/api/authApi.types"

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId?: number }>>("auth/login", data)
  },
  logout() {
    return instance.delete<BaseResponseType<{ userId?: number }>>("auth/login")
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me")
  },
  getCaptcha() {
    return instance.get<CapchaType>(`security/get-captcha-url`)
  },
}
