import TodoList from "./components/todoList/TodoList"
import { createContext,useState } from "react"

export const selectState = createContext(null)
export default function App() {
  const [todoSelectState, setTodoSelectState] = useState(false)
  return (
    <selectState.Provider value={{todoSelectState,setTodoSelectState}}>
      <TodoList />
    </selectState.Provider>
  )
}
