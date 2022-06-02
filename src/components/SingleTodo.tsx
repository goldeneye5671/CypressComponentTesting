import React, {useState} from "react"
import {Todo} from "../model"

interface Props {
    todo: Todo,
    todos: Todo [],
    setTodos: React.Dispatch<React.SetStateAction<Todo []>>
}

const SingleTodo: React.FC<Props> = ({todo, todos, setTodos}:Props) => {
    
    let [editMode, setEditMode] = useState<boolean>(false);
    let [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (e:React.FormEvent, id: number): void => {
        e.preventDefault()
        setTodos(todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
    }

    const handleDelete = (e:React.FormEvent, id: number): void => {
        e.preventDefault();
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleSave = (e:React.FormEvent, id: number): void => {
        e.preventDefault();
        setTodos(todos.map(todo => todo.id === id ? {...todo, todo: editTodo}: todo))
    }
    
    return (
        <form className={todo.isDone ? "todo-complete": "todo-incomplete"}>
            {
                editMode ? 
                    (
                        <input 
                            value={editTodo}
                            onChange={
                                e => setEditTodo(e.target.value)
                            }
                        />
                    ) 
                : 
                    (todo.isDone ? 
                        (<h4><s>{todo.todo}</s></h4>)
                    :
                        (<h4>{todo.todo}</h4>)
                    )
            }

            {
                editMode ? 
                    (
                        <>
                            <button
                                onClick={(e) => {handleSave(e, todo.id); setEditMode(!editMode)}}
                            >Save</button>
                            <button 
                                className="cancel"
                                onClick={e => {e.preventDefault(); setEditMode(!editMode)}}
                            >Cancel</button>
                        </>
                    )
                :
                    (
                        <>
                        {todo.isDone ? 
                            (
                                <button 
                                    className="not done"
                                    onClick={(e) => handleDone(e, todo.id)}
                                >Mark as Incomplete</button>)
                            : 
                            (
                                <button 
                                    className="done"
                                    onClick={(e) => handleDone(e, todo.id)}
                                >Mark as Complete</button>
                            )
                            }
                            <button 
                                className="edit"
                                onClick={e => {e.preventDefault(); setEditMode(!editMode)}}
                            >Edit</button>
                            <button
                                className="remove"
                                onClick={(e) => handleDelete(e, todo.id)}
                            >Remove</button>
                        </>
                    )
            }
        </form>
    )
}

export default SingleTodo