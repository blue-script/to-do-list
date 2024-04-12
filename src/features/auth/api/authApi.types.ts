export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}

export type CapchaType = {
  url: string
}
