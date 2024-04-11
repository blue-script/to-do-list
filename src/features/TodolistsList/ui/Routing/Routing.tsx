import { Route, Routes } from "react-router-dom"
import { TodolistsList } from "features/TodolistsList/ui/TodolistsList"
import { Login } from "features/auth/ui/login/login"
import { Error } from "features/Error/Error"
import { Container } from "@mui/material"
import React from "react"

const Routing = () => {
  return (
    <Container fixed>
      <Routes>
        <Route path={"/"} element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"*"} element={<Error />} />
      </Routes>
    </Container>
  )
}

export default Routing
