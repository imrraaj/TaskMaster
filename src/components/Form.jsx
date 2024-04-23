import useNotes from '../hooks/useNotes'

export default function Form() {
    const { todos, setTodos, store } = useNotes()
    return (
        <form
            className='form'
            onSubmit={(e) => {
                e.preventDefault()
                if (e.target.title.value === '')
                    return alert('Please enter a title')
                const title = e.target.title.value
                const newTodo = {
                    id: Date.now(),
                    title: title,
                    completed: false
                }
                setTodos([...todos, newTodo])
                store.addItem(newTodo)
                e.target.reset()
            }}
        >
            <input
                className='form__input'
                type='text'
                name='title'
                placeholder='Enter a title'
            />
            <button className='form__btn' type='submit'>
                Add Todo
            </button>
        </form>
    )
}
