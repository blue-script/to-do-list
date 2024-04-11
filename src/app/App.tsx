import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom"
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material"
import { Menu } from "@mui/icons-material"
import { Login } from "features/auth/ui/login/login"
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList"
import { ErrorSnackbar } from "common/components"
import { useActions } from "common/hooks"
import { selectIsLoggedIn } from "features/auth/model/auth.selectors"
import { selectAppStatus, selectIsInitialized } from "app/app.selectors"
import { authThunks } from "features/auth/model/auth.slice"
import { Error } from "features/Error/Error"
import AdbIcon from "@mui/icons-material/Adb"

function App() {
  const status = useSelector(selectAppStatus)
  const isInitialized = useSelector(selectIsInitialized)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { initializeApp, logout } = useActions(authThunks)

  useEffect(() => {
    initializeApp()
  }, [])

  const logoutHandler = () => logout()

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <HashRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static" sx={{ background: "#1d2125" }}>
          <Toolbar>
            <AdbIcon sx={{ color: "#9eacba" }} />
            {isLoggedIn && (
              <Button sx={{ color: "#9eacba" }} onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress color={"inherit"} />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"*"} element={<Error />} />
          </Routes>
        </Container>
      </div>
    </HashRouter>
  )
}

export default App
