import { useEffect, useState } from 'react'
import useNotes from '../hooks/useNotes'
import TodoItem from './TodoItem'

export default function TodoList() {
    const { todos } = useNotes()
    const [filteredTodos, setFilteredTodos] = useState(todos)
    const [filter, setFilter] = useState('all')

    const filterTodos = () => {
        const newTodos = todos.filter((todo) => {
            if (filter === 'all') {
                return todo
            } else if (filter === 'ongoing') {
                return !todo.completed
            } else {
                return todo.completed
            }
        })
        if (filter === 'all') {
            setFilteredTodos(todos)
        } else {
            setFilteredTodos(newTodos)
        }
    }

    useEffect(() => {
        setFilteredTodos(todos)
    }, [todos])

    useEffect(
        () => {
            filterTodos()
        },
        // eslint-disable-next-line
        [filter, todos]
    )

    return (
        <>
            <section>
                <p className='filter__heading'>Filters</p>
                <div className='filter__btn_group'>
                    <button
                        className={`filter__btn ${filter === 'all' && 'active'}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter__btn ${filter === 'ongoing' && 'active'}`}
                        onClick={() => setFilter('ongoing')}
                    >
                        Ongoing
                    </button>
                    <button
                        className={`filter__btn ${filter === 'completed' && 'active'}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>
            </section>
            <section className='todo__container'>
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                ) : (
                    <p className='not_found'>No tasks found</p>
                )}
            </section>
        </>
    )
}
