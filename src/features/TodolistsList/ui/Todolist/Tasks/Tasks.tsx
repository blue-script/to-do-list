import { Task } from "features/TodolistsList/ui/Todolist/Tasks/Task/Task"
import React from "react"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types"
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice.types"

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Tasks = ({ tasks, todolist }: Props) => {
  const { filter, id } = todolist

  let tasksForTodolist = tasks

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={id} />
      ))}
    </div>
  )
}
