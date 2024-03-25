import style from './TodoForm.module.css'
import { useState, useEffect, useRef } from 'react'

export default function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : "")

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

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

    return (
        <div>
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
                    </>)
                }
            </form>
        </div>
    )
}