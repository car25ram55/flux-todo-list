import React, { useState, useEffect } from "react";
import TodoStore from "./stores/TodoStore";
import TodoActions from "./actions/TodoActions";

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
    <div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(e.target.value);
            e.target.value = "";
          }
        }}
      />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
