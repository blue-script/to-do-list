import { TaskPriorities, TaskStatuses } from "common/enums"
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types"

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}
