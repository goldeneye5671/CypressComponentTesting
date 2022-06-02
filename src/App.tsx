import InputField from "./components/inputField";
import TodoList from "./components/TodoList";
import React, { useState } from "react";
import { Todo } from "./model";
import "./app.css"
import InputTest from "./components/InputTest";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  // makes an array of Todos specifically
  const [todos, setTodos] = useState<Todo []>([]);
  
  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault()
    if (todo) setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}])
    setTodo("")
  }

  return (
    // <InputTest initial={""} />
    <div>
      <div className="inputs">
        <h1 className="heading">To Do Today</h1>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      </div>
      <div className="listheaders">
          <h3>Completed Items</h3>
          <h3>Incomplete Items</h3>
        </div>
      <div className="lists">
        <div className="completed-items">
          <TodoList completed={false} todos={todos} filteredTodos={todos.filter(todo => todo.isDone === true)} setTodos={setTodos}/>
        </div>
        <div className="incomplete-items">
          <TodoList completed={true} todos={todos} filteredTodos={todos.filter(todo => todo.isDone === false)} setTodos={setTodos}/>
        </div>
      </div>
    </div>
  );
}

export default App;