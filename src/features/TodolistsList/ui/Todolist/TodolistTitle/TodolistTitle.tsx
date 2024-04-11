import { EditableSpan } from "common/components"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import React from "react"
import { useActions } from "common/hooks"
import { todolistsThunks } from "features/TodolistsList/model/todolistsSlice"
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice.types"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks)
  const { id, title, entityStatus } = todolist

  const removeTodolistCallback = () => {
    removeTodolist(id)
  }

  const changeTodolistTitleCallback = (title: string) => {
    changeTodolistTitle({ id, title })
  }

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleCallback} />
      <IconButton onClick={removeTodolistCallback} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  )
}
