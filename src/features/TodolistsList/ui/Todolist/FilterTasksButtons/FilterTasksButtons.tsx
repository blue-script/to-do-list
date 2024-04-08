import { Button } from "@mui/material"
import React from "react"
import { useActions } from "common/hooks"
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/TodolistsList/model/todolistsSlice"

type Props = { todolist: TodolistDomainType }

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { changeTodolistFilter } = useActions(todolistsActions)
  const { id, filter } = todolist

  const changeTaskFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id })
  }

  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeTaskFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeTaskFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeTaskFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  )
}
