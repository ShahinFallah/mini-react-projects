import style from './TodoList.module.css'
import { useEffect, useState } from 'react'
import TodoForm from '../todoForm/TodoForm'
import Todo from '../todo/Todo'
import { MdMenu } from "react-icons/md";

export default function TodoList() {

    const [todos, setTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])
    const [menuVisibility, setMenuVisibility] = useState(false)

    // Add Todos to Local storage
    localStorage.setItem('todos', JSON.stringify(todos))

    // Add Todo to List
    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) return;

        const newTodos = [todo, ...todos]
        setTodos(newTodos)
    }

    // Edit Todo
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) return;

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    // Delete Todo
    const removeTodo = (id) => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr)
    }

    // Clear Todos
    const clearTodos = () => {
        setTodos([])
        localStorage.clear()
    }

    // Todos Done
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
                    todos={JSON.parse(localStorage.getItem('todos'))}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo} />
            </div>

            <MdMenu onClick={() => { setMenuVisibility(!menuVisibility) }} className={style.menuIcon} />
            <div className={`${style.menu} ${menuVisibility && style.showMenu}`}>
                <ul>
                    <li className={!todos[0] ? style.disable : style.enable} onClick={clearTodos}>Clear All</li>
                    <li>Select</li>
                </ul>
            </div>
        </div >
    )
}