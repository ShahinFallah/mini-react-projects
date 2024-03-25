import style from './Todo.module.css'
import { useState } from 'react'
import TodoForm from '../todoForm/TodoForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

export default function todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if (edit.id) {
        return <TodoForm onSubmit={submitUpdate} edit = {edit} />
    };

    return (
        todos.map((todo, index) => (
            <div className={todo.isComplete ? `${style.todoRow} ${style.complete}` : `${style.todoRow}`} key={index}>

                <div onClick={() => { completeTodo(todo.id) }} key={todo.id}>
                    {todo.text}
                </div>
                <div className={style.icons}>
                    <RiCloseCircleLine
                        onClick={() => removeTodo(todo.id)}
                        className={style.deleteIcon} />
                    <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text })}
                        className={style.editIcon} />
                </div>

            </div>
        ))
    )
}