import React, { useState } from "react";
import Item from "./item/Item";

export default function Todo() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos"))
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  localStorage.setItem(
    "todos",
    JSON.stringify(todos) ? JSON.stringify(todos) : "[]"
  );

  const [todoName, setTodoName] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    setTodos([
      ...todos,
      {
        name: todoName,
        isDone: false,
        id: todos.length + 1,
        dueDate: new Date(Date.now()),
      },
    ]);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function handleToggle(id) {
    let tempTodos = [...todos];
    let index = tempTodos.findIndex((todo) => todo.id === id);

    if (typeof index !== "number") return;
    tempTodos[index].isDone = !tempTodos[index].isDone;

    setTodos(tempTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function handleClearAll(id) {
    setTodos([]);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //   function handleChecked(id) {

  //   }

  return (
    <div>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="inp-value"
            value={todoName}
            onChange={(evt) => setTodoName(evt.target.value)}
            type="text"
          />
          <button type="submit">Add</button>
          <button onClick={() => handleClearAll(todos)} type="button">
            ClearAll
          </button>
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
    </div>
  );
}
