import React from "react";
import {Todo} from "../model"
import SingleTodo from "./SingleTodo"

// Tells us what our props should be, and what types they should be so we dont make any simple mistakes
interface Props{
    todos: Todo [],
    filteredTodos: Todo [],
    completed: boolean,
    setTodos: React.Dispatch<React.SetStateAction<Todo []>>
  }

const TodoList: React.FC<Props> = ({todos, filteredTodos, completed, setTodos}: Props) => {
    return (
        <div className={completed ? "incomplete-todo-list": "complete-todo-list"}>
            {filteredTodos.map(filteredTodo => (
                <>
                    <SingleTodo 
                        todo={filteredTodo}
                        todos={todos}
                        setTodos={setTodos}
                        key={filteredTodo.id}
                    />
                </>
            ))}
        </div>
    )
}

export default TodoList