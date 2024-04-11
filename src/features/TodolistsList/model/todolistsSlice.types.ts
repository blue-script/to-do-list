import { TodolistType } from "features/TodolistsList/api/todolists/todolistsApi.types"
import { RequestStatusType } from "app/appSlice"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
