import style from './TodoForm.module.css'
import { useState, useEffect, useRef, useContext } from 'react'
import { FaTrash } from "react-icons/fa";
import { SiVerizon } from "react-icons/si";
import { selectState } from '../../App';

export default function TodoForm(props) {
    const { todoSelectState, setTodoSelectState } = useContext(selectState)
    const [input, setInput] = useState(props.edit ? props.edit.value : "")

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
        resetSelectedTodos()
    },[])

    const handleSubmit = e => {
        e.preventDefault()

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        })
        setInput('')
    }

    const handleChange = e => {
        setInput(e.target.value)
    }

    const resetSelectedTodos = () => {
        props.setTodos(prev => prev.map(todo => todo.isSelected ? {...todo,isSelected:false} : todo))
    }

    const deleteSelectedTodos = () => {
        props.setTodos(prev => prev.filter(todo => todo.isSelected != true))
        setTodoSelectState(false)
    }

    const completeSelectedTodos = () => {
        props.setTodos(prev => prev.map(todo => todo.isSelected ? { ...todo, isComplete: true } : todo))
        setTodoSelectState(false)
        resetSelectedTodos()
    }


    return (
        <>
            <form className={style.todoForm}>
                {props.edit ?
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
                        {todoSelectState &&
                            (
                                <div className={style.selectOptions}>
                                    <div className={style.selectCancel}>
                                        <button onClick={() => { setTodoSelectState(false); resetSelectedTodos()}} type='button'>Cancel</button>
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