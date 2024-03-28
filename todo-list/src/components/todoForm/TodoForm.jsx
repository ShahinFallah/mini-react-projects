import style from './TodoForm.module.css'
import { useState, useEffect, useRef, useContext} from 'react'
import { FaTrash } from "react-icons/fa";
import { SiVerizon } from "react-icons/si";
import { TaskManagerContext } from '../context/todoContext';

export default function TodoForm({onSubmit, edit}) {
    const ctxt = useContext(TaskManagerContext)
    
    const [input, setInput] = useState(edit ? edit.value : "")

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
        resetSelectedTodos()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        })
        setInput('')
    }

    const handleChange = e => {
        setInput(e.target.value)
    }

    const resetSelectedTodos = () => {
        ctxt.setTodos(prev => prev.map(todo => todo.isSelected ? { ...todo, isSelected: false } : todo))
    }

    const deleteSelectedTodos = () => {
        ctxt.setTodos(prev => prev.filter(todo => todo.isSelected != true))
        ctxt.setTodoSelectState(false)
    }

    const completeSelectedTodos = () => {
        ctxt.setTodos(prev => prev.map(todo => todo.isSelected ? { ...todo, isComplete: true } : todo))
        ctxt.setTodoSelectState(false)
        resetSelectedTodos()
    }


    return (
        <>
            <form className={style.todoForm}>
                {edit ?
                    (<>
                        <input
                            className={`${style.todoInput} ${style.edit}`}
                            ref={inputRef} onChange={handleChange}
                            type="text"
                            placeholder='Add'
                            value={input} />
                        <button
                            onClick={handleSubmit}
                            className={`${style.todoButton} ${style.edit}`}>
                            Update
                        </button>
                    </>) :
                    (<>
                        <input
                            className={style.todoInput}
                            ref={inputRef} onChange={handleChange}
                            type="text"
                            placeholder='Add'
                            value={input} />
                        <button
                            onClick={handleSubmit}
                            className={style.todoButton}>
                            Add a todo
                        </button>
                        {ctxt.todoSelectState &&
                            (
                                <div className={style.selectOptions}>
                                    <div className={style.selectCancel}>
                                        <button onClick={() => { ctxt.setTodoSelectState(false); resetSelectedTodos() }} type='button'>Cancel</button>
                                    </div>
                                    <div>
                                        <SiVerizon onClick={completeSelectedTodos} className={style.completeOption} />
                                        <FaTrash onClick={deleteSelectedTodos} className={style.deleteOption} />
                                    </div>
                                </div>
                            )}
                    </>)
                }
            </form>
        </>
    )
}