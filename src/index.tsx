import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./app/App"
import { store } from "app/store"
import { Provider } from "react-redux"

const root = createRoot(document.getElementById("root") as HTMLElement)

const rerenderEntireTree = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

rerenderEntireTree()

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", () => {
    rerenderEntireTree()
  })
}
