import React, { useState, useEffect } from "react";
import TodoStore from "./stores/TodoStore";
import TodoActions from "./actions/TodoActions";
import "./TodoList.css"; // Import the CSS file

function App() {
  const [todos, setTodos] = useState(TodoStore.getTodos());

  useEffect(() => {
    const onChange = () => setTodos(TodoStore.getTodos());
    TodoStore.addChangeListener(onChange);

    return () => {
      TodoStore.removeChangeListener(onChange);
    };
  }, []);

  const addTodo = (text) => {
    TodoActions.addTodo(text);
  };

  const deleteTodo = (id) => {
    TodoActions.deleteTodo(id);
  };

  return (
    <div className="todo-container">
      <input
        type="text"
        className="todo-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(e.target.value);
            e.target.value = "";
          }
        }}
        placeholder="Add a new task"
      />

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
