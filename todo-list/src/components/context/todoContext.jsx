import { createContext } from "react";
import { useState } from "react";

export const TaskManagerContext = createContext({
    todos:[],
    todoSelectState: null,
    setTodoSelectState:null,
    addTodo: () => {},
    updateTodo: () => {},
    clearTodos: () => {},
    removeTodo: () => {},
    completeTodo: () => {},
    handleSelectTodos: () => {}
})

export function TaskManagerContextProvider({ children }) {

    const [todoSelectState, setTodoSelectState] = useState(false)
    const [todos, setTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])

    // Add Todos to Local storage
    localStorage.setItem('todos', JSON.stringify(todos))

    const value = {
        todos:todos,
        setTodos:setTodos,
        todoSelectState:todoSelectState,
        setTodoSelectState:setTodoSelectState,
        addTodo: todo => {
            if (!todo.text || /^\s*$/.test(todo.text)) return;

            const newTodos = [todo, ...todos]
            setTodos(newTodos)
        },
        updateTodo:(todoId, newValue) => {
            if (!newValue.text || /^\s*$/.test(newValue.text)) return;

            setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
        },
        clearTodos: () => {
            setTodos([])
            localStorage.clear()
        },
        removeTodo: (id) => {
            const removeArr = todos.filter(todo => todo.id !== id)

            setTodos(removeArr)
        },
        completeTodo: id => {
            let updateTodos = todos.map(todo => {
                if (todo.id === id) {
                    todo.isComplete = !todo.isComplete
                }
                return todo
            })
            setTodos(updateTodos)
        },
        handleSelectTodos: id => {
            let selectedTodo = todos.map(todo => {
                if (todo.id === id) {
                    todo.isSelected = !todo.isSelected
                }
    
                return todo
            })
            setTodoSelectState(selectedTodo)
        }
    }

    return (
        <TaskManagerContext.Provider value={value}>{children}</TaskManagerContext.Provider>
    )
}