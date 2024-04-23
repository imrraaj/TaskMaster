import { createContext } from 'react'

export const NoteContext = createContext({
    todos: [],
    setTodos: () => {},
    store: {},
    handleDelete: () => {},
    handleComplete: () => {},
    handleEdit: () => {}
})
