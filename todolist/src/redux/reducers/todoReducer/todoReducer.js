const initialState = [];

const ADD_TODO = 'ADD_TODO';
const ADD_ALL_TODO = 'ADD_ALL_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_DONE = 'TOGGLE_DONE';

const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ALL_TODO:
      return (state = [...payload]);

    case ADD_TODO:
      return [
        ...state,
        {
          message: payload.message,
          id: payload._id,
          isCompleted: payload.isCompleted,
        },
      ];

    case REMOVE_TODO:
      return state.filter(({ id }) => id !== payload);

    case EDIT_TODO: {
      const updatedTodo = state.map((todo) => {
        if (todo.id === payload.id) {
          console.log(todo, payload);
          return { ...todo, message: payload.value };
        }
        return todo;
      });

      return (state = [...updatedTodo]);
    }

    case TOGGLE_DONE:
      return state.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, isCompleted: payload.isCompleted };
        } else {
          return todo;
        }
      });

    default:
      return state;
  }
};

export {
  ADD_TODO,
  ADD_ALL_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  TOGGLE_DONE,
  todoReducer,
};
