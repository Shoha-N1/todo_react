import React, { useState } from "react";
import Item from "./item/Item";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    setTodos([
      ...todos,
      { name: todoName, isDone: false, id: todos.length + 1, dueDate: new Date(Date.now()) },
    ]);
  }

  function handleToggle(id) {
    let tempTodos = [...todos];
    let index = tempTodos.findIndex((todo) => todo.id === id);

    if (typeof index !== "number") return;

    tempTodos[index].isDone = !tempTodos[index].isDone;

    setTodos(tempTodos);
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleClearAll(id) {
    setTodos([])
  }

//   function handleChecked(id) {
    
//   }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className="inp-value"
          value={todoName}
          onChange={(evt) => setTodoName(evt.target.value)}
          type="text"
        />
        <button type="submit">Add</button>
        <button onClick={() => handleClearAll(todos)} type="button">ClearAll</button>
      </form>
      <div>
        {todos.map((todo) => (
          <Item
            onDelete={() => handleDelete(todo.id)}
            key={todo.id}
            id={todo.id}
            onToggle={() => handleToggle(todo.id)}
            // onChecked={() => }
            name={todo.name}
            isDone={todo.isDone}
            dueDate={todo.dueDate}
          />
        ))}
      </div>
    </div>
  );
}
