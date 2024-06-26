import { AppBar, Button, LinearProgress, Toolbar } from "@mui/material"
import AdbIcon from "@mui/icons-material/Adb"
import React from "react"
import { useSelector } from "react-redux"
import { selectAppStatus } from "app/appSlice"
import { useActions } from "common/hooks"
import { authThunks, selectIsLoggedIn } from "features/auth/model/authSlice"
import logo from "../../../../assets/images/logo.png"

const Header = () => {
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { logout } = useActions(authThunks)

  const logoutHandler = () => logout()

  return (
    <AppBar position="static" sx={{ background: "#1d2125" }}>
      <Toolbar>
        <img src={logo} alt="logo" width="50px" />
        {isLoggedIn && (
          <Button sx={{ color: "#9eacba" }} onClick={logoutHandler}>
            Log out
          </Button>
        )}
      </Toolbar>
      {status === "loading" && <LinearProgress color={"inherit"} sx={{}} />}
    </AppBar>
  )
}

export default Header
