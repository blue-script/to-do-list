import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { HashRouter } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import { ErrorSnackbar } from "common/components"
import { useActions } from "common/hooks"
import { selectIsInitialized } from "app/appSlice"
import Header from "features/TodolistsList/ui/Header/Header"
import Routing from "features/TodolistsList/ui/Routing/Routing"
import { authThunks } from "features/auth/model/authSlice"

function App() {
  const isInitialized = useSelector(selectIsInitialized)
  const { initializeApp } = useActions(authThunks)

  useEffect(() => {
    initializeApp()
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <HashRouter>
      <ErrorSnackbar />
      <Header />
      <Routing />
    </HashRouter>
  )
}

export default App
