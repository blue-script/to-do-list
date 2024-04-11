import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Grid, Paper } from "@mui/material"
import { AddItemForm } from "common/components"
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist"
import { Navigate } from "react-router-dom"
import { useActions } from "common/hooks"
import { todolistsThunks } from "features/TodolistsList/model/todolistsSlice"
import { selectTasks } from "features/TodolistsList/model/tasksSlice"
import { selectIsLoggedIn } from "features/auth/model/authSelectors"
import { selectTodolists } from "features/TodolistsList/model/todolistsSelector"
import s from "./TodolistsList.module.css"

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { addTodolist, fetchTodolists } = useActions(todolistsThunks)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchTodolists()
  }, [])

  const addTodolistCallback = (title: string) => {
    return addTodolist(title).unwrap()
  }

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <div className={s.containerAddItemForm}>
        <AddItemForm addItem={addTodolistCallback} />
      </div>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper sx={{ background: "#d2c8c8", padding: "10px" }}>
                <Todolist todolist={tl} tasks={allTodolistTasks} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
