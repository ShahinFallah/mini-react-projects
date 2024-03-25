import style from './TodoList.module.css'
import { useState } from 'react'
import TodoForm from '../todoForm/TodoForm'
import Todo from '../todo/Todo'

export default function TodoList() {
    const [todos, setTodos] = useState([])
    
    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) return;

        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) return;

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    const removeTodo = (id) => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr)
    }

    const completeTodo = id => {
        let updateTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updateTodos)
        console.log(updateTodos)
    }

    return (
        <div className={style.todoApp}>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <div className={style.todoContainer}>
                <Todo
                    todos={todos}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo} />
            </div>
        </div>
    )
}