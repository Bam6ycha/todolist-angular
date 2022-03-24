import {
  ADD_ALL_TODO,
  ADD_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  TOGGLE_DONE,
} from '../reducers/todoReducer/todoReducer';

const addTodoAction = (payload) => ({ type: ADD_TODO, payload });

const getAllTodosAction = (payload) => ({ type: ADD_ALL_TODO, payload });

const removeTodoAction = (payload) => ({ type: REMOVE_TODO, payload });

const editTodoAction = (payload) => ({ type: EDIT_TODO, payload });

const toggleTodoAction = (payload) => ({ type: TOGGLE_DONE, payload });

export const getTodos = () => (dispatch) => {
  fetch('http://localhost:3000/todos')
    .then((data) => data.json())
    .then((data) => dispatch(getAllTodosAction(data)));
};

export const addTodoAsync = (message) => (dispatch) => {
  const newTodo = { message, isCompleted: false };

  fetch(`http://localhost:3000/todos`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then((data) => dispatch(addTodoAction(data)))
    .catch((err) => console.log(err.message));
};

export const removeTodoAsync = (id) => (dispatch) => {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
  })
    .then(() => dispatch(removeTodoAction(id)))
    .catch((err) => console.log(err.message));
};

export const toggleTodoAsync = (payload) => (dispatch) => {
  fetch(`http://localhost:3000/todos/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ isCompleted: payload.isCompleted }),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then(() => dispatch(toggleTodoAction(payload)))
    .catch((err) => console.log(err.message));
};

export const editTodoAsync = (payload) => (dispatch) => {
  fetch(`http://localhost:3000/todos/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ message: payload.value }),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then(() => dispatch(editTodoAction(payload)))
    .catch((err) => console.log(err.message));
};
