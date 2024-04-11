import { useActions } from "common/hooks"
import { useSelector } from "react-redux"
import { FormikHelpers, useFormik } from "formik"
import { BaseResponseType } from "common/types"
import { LoginParamsType } from "features/auth/api/authApi.types"
import { authThunks } from "features/auth/model/authSlice"
import { selectIsLoggedIn } from "features/auth/model/authSelectors"

export const useLogin = () => {
  const { login } = useActions(authThunks)

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Required"
      } else if (values.password.length < 3) {
        errors.password = "Must be 3 characters or more"
      }

      return errors
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      login(values)
        .unwrap()
        .catch((reason: BaseResponseType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error)
          })
        })
    },
  })

  return { formik, isLoggedIn }
}

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
