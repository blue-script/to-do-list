import React, { useEffect } from "react"
import { useActions } from "common/hooks"
import { AddItemForm } from "common/components"
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice"
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types"
import { tasksThunks } from "features/TodolistsList/model/tasksSlice"
import { FilterTasksButtons } from "features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "features/TodolistsList/ui/Todolist/Tasks/Tasks"
import { TodolistTitle } from "features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle"

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Todolist = React.memo(function (props: Props) {
  const { fetchTasks, addTask } = useActions(tasksThunks)

  useEffect(() => {
    fetchTasks(props.todolist.id)
  }, [])

  const addTaskCallback = (title: string) => {
    return addTask({ title, todolistId: props.todolist.id }).unwrap()
  }

  return (
    <div>
      <TodolistTitle todolist={props.todolist} />

      <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === "loading"} />

      <Tasks todolist={props.todolist} tasks={props.tasks} />

      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={props.todolist} />
      </div>
    </div>
  )
})
