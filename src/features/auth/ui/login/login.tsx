import React from "react"
import { Navigate } from "react-router-dom"
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material"
import s from "features/auth/ui/login/login.module.css"
import { useLogin } from "features/auth/lib/useLogin"

export const Login = () => {
  const { formik, isLoggedIn, captcha } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                Из-за реализации авторизации на backend через cookies, авторизация на сайте
                корректно не работает в браузерах Safari и Yandex из-за политики по ограничению к
                доступу cookies. Необходимо в данных браузерах самостоятельно включить cookies.
                <a
                  href="https://dzen.ru/video/watch/615181f2b070b34446419b6c?t=43&utm_referrer=dzen.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block" }}
                >
                  Видео как включить cookies в Yandex браузере.
                </a>
                <a
                  href="https://media.ithaca.edu/media/Allow+Third+Party+Cookies+-+Safari/1_n3cjqzz9/38123261"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block" }}
                >
                  Видео как включить cookies в Safari браузере.
                </a>
              </p>
              <p>Use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && (
                <p className={s.error}>{formik.errors.email}</p>
              )}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className={s.error}>{formik.errors.password}</p>
              )}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              {captcha && <img src={captcha} alt="captcha" />}
              {captcha && (
                <TextField label="Captcha" margin="normal" {...formik.getFieldProps("captcha")} />
              )}
              <Button
                type={"submit"}
                variant={"contained"}
                disabled={!(formik.isValid && formik.dirty)}
                color={"primary"}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
