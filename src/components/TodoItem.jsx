import { useEffect, useRef, useState } from 'react'
import useNotes from '../hooks/useNotes'
import Delete from '../assets/delete.svg'
import Edit from '../assets/edit.svg'
import Complete from '../assets/complete.svg'
import Incomplete from '../assets/incomplete.svg'
import Save from '../assets/save.svg'

export default function TodoItem(props) {
    const todo = props.todo
    const inputRef = useRef(null);
    const { handleComplete, handleDelete, handleEdit } = useNotes()
    const [editMode, setEditMode] = useState(false)
    const [editedTitle, setEditedTitle] = useState(todo.title)

    const handleSave = () => {
        if(editedTitle.trim() === '') {
            alert('Please enter a valid task')
            return
        }
        handleEdit(todo.id, editedTitle)
        setEditMode(false)
    }

    const handleInputChange = (event) => {
        setEditedTitle(event.target.value)
    }

    useEffect(() => {
        if(editMode) {
            inputRef.current.focus()
        }
    }, [editMode]);

    
    return (
        <div
            className='todo'
            style={{
                border: todo.completed ? '2px solid #ccc' : '2px solid #000',
                background: todo.completed ? '#f9f9f9' : '#fff',
                opacity: todo.completed ? 0.6 : 1
            }}
        >
            {editMode ? (
                <>
                    <input
                        className='todo__edit_input'
                        type='text'
                        value={editedTitle}
                        onChange={handleInputChange}
                        ref={inputRef}
                    />
                    <button className='todo__btn' onClick={handleSave}>
                        <img src={Save} alt='Save' />
                    </button>
                </>
            ) : (
                <>
                    <h2
                        className='todo__heading'
                        style={{
                            textDecoration: todo.completed
                                ? 'line-through'
                                : 'none',
                            color: todo.completed ? '#ccc' : '#000'
                        }}
                    >
                        {todo.title}
                    </h2>
                    <div className='todo__btn_group'>
                        <button
                            className='todo__btn'
                            onClick={() => handleComplete(todo.id)}
                        >
                            {todo.completed ? (
                                <img src={Incomplete} alt='Incomplete' />
                            ) : (
                                <img src={Complete} alt='Complete' />
                            )}
                        </button>
                        <button
                            className='todo__btn'
                            data-label='edit'
                            onClick={() => setEditMode(true)}
                        >
                            <img src={Edit} alt='Edit Task' />
                        </button>
                        <button
                            className='todo__btn'
                            data-label='delete'
                            onClick={() => handleDelete(todo.id)}
                        >
                            <img src={Delete} alt='Delete Task' />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
