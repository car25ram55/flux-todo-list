import { EventEmitter } from "eventemitter3";
import dispatcher from "../Dispatcher";

let _todos = [];

function addTodo(text) {
  _todos.push({ id: Date.now(), text: text });
}

function deleteTodo(id) {
  _todos = _todos.filter((todo) => todo.id !== id);
}

class TodoStore extends EventEmitter {
  getTodos() {
    return _todos;
  }

  emitChange() {
    this.emit("change");
  }

  addChangeListener(callback) {
    this.on("change", callback);
  }

  removeChangeListener(callback) {
    this.removeListener("change", callback);
  }
}

const store = new TodoStore();

dispatcher.register((action) => {
  switch (action.actionType) {
    case "ADD_TODO":
      addTodo(action.text);
      store.emitChange();
      break;
    case "DELETE_TODO":
      deleteTodo(action.id);
      store.emitChange();
      break;
    default:
    // no op
  }
});

export default store;
