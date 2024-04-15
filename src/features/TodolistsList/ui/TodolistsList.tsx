import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Grid, Paper } from "@mui/material"
import { AddItemForm } from "common/components"
import { Todolist } from "features/TodolistsList/ui/Todolist/Todolist"
import { Navigate } from "react-router-dom"
import { useActions } from "common/hooks"
import { selectTodolists, todolistsThunks } from "../model/todolistsSlice"
import { selectTasks } from "features/TodolistsList/model/tasksSlice"
import s from "./TodolistsList.module.css"
import { selectIsLoggedIn } from "features/auth/model/authSlice"
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice.types"

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists)
  const tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [tl, setTl] = useState<TodolistDomainType[]>(todolists)
  const [currentTdodlist, setCurrentTdodlist] = useState<TodolistDomainType | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const { addTodolist, fetchTodolists } = useActions(todolistsThunks)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    if (!todolists.length) {
      fetchTodolists()
    }
  }, [])

  if (!tl.length && todolists.length) {
    setTl(todolists)
  }

  const addTodolistCallback = (title: string) => {
    return addTodolist(title).unwrap()
  }

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>, tl: TodolistDomainType) {
    setIsDragging(true)
    setCurrentTdodlist(tl)
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {}

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    setIsDragging(false)
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function dropHandler(e: React.DragEvent<HTMLDivElement>, tl: TodolistDomainType) {
    e.preventDefault()
    if (currentTdodlist) {
      setTl(
        todolists.map((t) => {
          if (t.id === tl.id) {
            return { ...t, order: currentTdodlist.order }
          }
          if (t.id === currentTdodlist.id) {
            return { ...t, order: tl.order }
          }
          return t
        }),
      )
    }
  }

  const sortTodolists = (a: TodolistDomainType, b: TodolistDomainType) => {
    if (a.order > b.order) return 1
    else return -1
  }

  const sortedTodolists = tl.length > 0 ? [...tl].sort(sortTodolists) : tl

  return (
    <>
      <div className={s.containerAddItemForm}>
        <AddItemForm addItem={addTodolistCallback} />
      </div>
      {/*<Grid container spacing={3} sx={{ flexWrap: "nowrap", overflowX: "scroll" }}>*/}
      <Grid container spacing={3}>
        {sortedTodolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid
              item
              key={tl.id}
              draggable="true"
              sx={{
                cursor: isDragging ? "grabbing" : "grab",
                marginBottom: "5px",
                width: "306px",
              }}
              onDragStart={(e) => dragStartHandler(e, tl)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, tl)}
            >
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
