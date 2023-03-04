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
        createdAt: new Date(Date.now()),
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
      <h1 className="text-center my-4">TODO-React</h1>
        <form id="form" className="form row" onSubmit={handleSubmit}>
          <div className="row ">
            <div className="me-3">
              <div className="my-2">
                <input
                  required
                  name="title"
                  placeholder="Task name"
                  className="form-control w-100 ml-3"
                  value={todoName}
                  onChange={(evt) => setTodoName(evt.target.value)}
                  type="text"
                />
              </div>
            </div>

            <div className="col-lg-2">
          <div className="my-2">
            <button type="submit" className="btn btn-primary w-150">Add</button>
          </div>
        </div>

        <button className="btn btn-primary w-100 ml-1" onClick={() => handleClearAll(todos)} type="button">
            ClearAll
          </button>
          </div>

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
