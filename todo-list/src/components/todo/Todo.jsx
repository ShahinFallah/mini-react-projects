import style from './Todo.module.css'
import { useState, useContext } from 'react'
import TodoForm from '../todoForm/TodoForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import { FaRegSquare } from "react-icons/fa6";
import { FaRegSquareCheck } from "react-icons/fa6";
import { selectState } from '../../App'

export default function todo(props) {
    const { todoSelectState } = useContext(selectState)
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        props.updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }


    if (edit.id) {
        return <TodoForm onSubmit={submitUpdate} edit={edit} setTodos={props.setTodos} />
    };

    return (
        props.todos.map((todo, index) => (
            todoSelectState ? (

                // Select State
                <div
                    onClick={() => { props.handleSelectTodos(todo.id) }}
                    style={todo.isSelected ? { opacity: '1' } : { opacity: '.50' }}
                    className={`${style.todoRow} ${style.todoRowSelect}`} key={index}>
                    {todo.isSelected ?
                        <FaRegSquareCheck className={style.todoSelected} />
                        : <FaRegSquare className={style.todoSelected} />}
                    <div key={todo.id}>
                        {todo.text}
                    </div>

                </div>
            ) :

                // No Select State
                (
                    <div className={todo.isComplete ? `${style.todoRow} ${style.complete}` : `${style.todoRow}`} key={index}>
                        <div className={style.todoTxt} onClick={() => { props.completeTodo(todo.id) }} key={todo.id}>
                            {todo.text}
                        </div>
                        <div className={style.icons}>
                            <RiCloseCircleLine
                                onClick={() => props.removeTodo(todo.id)}
                                className={style.deleteIcon} />
                            <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text })}
                                className={style.editIcon} />
                        </div>

                    </div>
                )
        ))
    )
}