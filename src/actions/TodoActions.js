import Dispatcher from "../Dispatcher";

const TodoActions = {
  addTodo: (text) => {
    Dispatcher.dispatch({
      actionType: "ADD_TODO",
      text: text,
    });
  },
  deleteTodo: (id) => {
    Dispatcher.dispatch({
      actionType: "DELETE_TODO",
      id: id,
    });
  },
};

export default TodoActions;
