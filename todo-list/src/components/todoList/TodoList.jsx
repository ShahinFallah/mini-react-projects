import style from './TodoList.module.css'
import { useEffect, useState, useContext } from 'react'
import TodoForm from '../todoForm/TodoForm'
import Todo from '../todo/Todo'
import { MdMenu } from "react-icons/md";
import { TaskManagerContext } from '../context/todoContext.jsx';

export default function TodoList() {
    const ctxt = useContext(TaskManagerContext);

    const [menuVisibility, setMenuVisibility] = useState(false)

    useEffect(() => {
        !ctxt.todos[0] ? ctxt.setTodoSelectState(false) : ctxt.setTodoSelectState(ctxt.todoSelectState)
    }, [ctxt.todos[0]])


    return (
        <div className={style.todoApp}>
            <h1>What's the Plan for Today?</h1>
            <TodoForm onSubmit = {ctxt.addTodo} />

            <div className={style.todoContainer}>
                <Todo />
            </div>

            <MdMenu
                onClick={() => { setMenuVisibility(!menuVisibility) }}
                className={style.menuIcon} />
            <div className={`${style.menu} ${menuVisibility && style.showMenu}`}>
                <ul>
                    <li className={!ctxt.todos[0] ? style.disable : style.enable} onClick={ctxt.clearTodos}>Clear All</li>
                    <li className={
                        ctxt.todoSelectState
                            ? style.disable
                            : !ctxt.todos[0] ? style.disable : style.enable}
                        onClick={() => { ctxt.setTodoSelectState(true) }}>
                        Select
                    </li>
                </ul>
            </div>
        </div >
    )
}