import { tasksReducer } from "features/TodolistsList/model/tasksSlice"
import { todolistsReducer, todolistsThunks } from "features/TodolistsList/model/todolistsSlice"
import { TodolistType } from "../../api/todolists/todolistsApi.types"
import { TasksStateType } from "features/TodolistsList/model/tasksSlice.types"
import { TodolistDomainType } from "features/TodolistsList/model/todolistsSlice.types"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  let todolist: TodolistType = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  }

  const action = todolistsThunks.addTodolist.fulfilled({ todolist: todolist }, "requestId", todolist.title)

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
