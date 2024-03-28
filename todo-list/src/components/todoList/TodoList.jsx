import style from './TodoList.module.css'
import { useContext, useEffect, useState } from 'react'
import TodoForm from '../todoForm/TodoForm'
import Todo from '../todo/Todo'
import { MdMenu } from "react-icons/md";
import { selectState } from '../../App';

export default function TodoList() {
    const { todoSelectState, setTodoSelectState } = useContext(selectState)

    const [todos, setTodos] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [])

    const [menuVisibility, setMenuVisibility] = useState(false)

    useEffect(() => {
        !todos[0] ? setTodoSelectState(false) : setTodoSelectState(todoSelectState)
    }, [todos[0]])

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

    // Clear Todos
    const clearTodos = () => {
        setTodos([])
        localStorage.clear()
    }

    // Delete Todo
    const removeTodo = (id) => {
        const removeArr = todos.filter(todo => todo.id !== id)

        setTodos(removeArr)
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
    }

    // Handle Selected Todos
    const handleSelectTodos = id => {
        let selectedTodo = todos.map(todo => {
            if (todo.id === id) {
                todo.isSelected = !todo.isSelected
            }

            return todo
        })
        setTodoSelectState(selectedTodo)
    }


    return (
        <div className={style.todoApp}>
            <h1>What's the Plan for Today?</h1>
            <TodoForm 
            onSubmit={addTodo} 
            setTodos={setTodos}
            removeTodo = {removeTodo} 
            completeTodo = {completeTodo} />

            <div className={style.todoContainer}>
                <Todo
                    todos={JSON.parse(localStorage.getItem('todos'))}
                    setTodos = {setTodos}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    handleSelectTodos={handleSelectTodos} />
            </div>

            <MdMenu onClick={() => { setMenuVisibility(!menuVisibility) }} className={style.menuIcon} />
            <div className={`${style.menu} ${menuVisibility && style.showMenu}`}>
                <ul>
                    <li className={!todos[0] ? style.disable : style.enable} onClick={clearTodos}>Clear All</li>
                    <li className={
                        todoSelectState
                            ? style.disable
                            : !todos[0] ? style.disable : style.enable}
                        onClick={() => { setTodoSelectState(true) }}>
                        Select
                    </li>
                </ul>
            </div>
        </div >
    )
}