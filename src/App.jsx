import { Storage } from './api/db'
import { useState } from 'react'
import TodoList from './components/Todolist'
import { NoteContext } from './context/NoteContext'
import Form from './components/Form'

function App() {
    const store = new Storage('react_todos')
    const [todos, setTodos] = useState(store.getAllItems())

    const handleDelete = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id)
        setTodos(newTodos)
        store.removeItem(id)
    }

    const handleComplete = (id) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
                store.updateItem(id, { ...todo })
            }
            return todo
        })
        setTodos(newTodos)
    }

    const handleEdit = (id, title) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.title = title
                store.updateItem(id, { ...todo })
            }
            return todo
        })
        setTodos(newTodos)
    }

    return (
        <NoteContext.Provider
            value={{
                todos: todos,
                setTodos: setTodos,
                store: store,
                handleDelete: handleDelete,
                handleComplete: handleComplete,
                handleEdit: handleEdit
            }}
        >
            <main>
                <h1 className='heading'>TaskMaster</h1>
                <p className='heading__description'>Your Ultimate ToDo List</p>
                <Form />

                <h2 className='todo__heading'>Your Tasks</h2>
                <TodoList todos={todos} setTodos={setTodos} store={store} />
            </main>
        </NoteContext.Provider>
    )
}

export default App
