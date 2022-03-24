import React, { useRef, useState } from 'react';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import EditTodo from '../EditTodo/EditTodo';
import {
  editTodoAction,
  removeTodoAsync,
  toggleTodoAsync,
} from '../redux/actions/todoActions';

const Item = ({ id, message, isCompleted }) => {
  const [isEditable, setIsEditable] = useState(false);

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const toggleCheck = (isCompleted, id) => {
    const todoInfo = { isCompleted, id };
    dispatch(toggleTodoAsync(todoInfo));
  };

  const removeTodo = (id) => {
    dispatch(removeTodoAsync(id));
  };

  const changeTodo = () => {
    setIsEditable((prevState) => !prevState);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  return (
    <li
      key={id}
      style={{
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        textDecorationLine: isCompleted === true ? 'line-through' : 'none',
      }}
    >
      <input
        disabled={isEditable}
        type='checkbox'
        onChange={({ target }) => toggleCheck(target.checked, id)}
        checked={isCompleted}
      />
      {isEditable ? (
        <EditTodo
          message={message}
          id={id}
          setIsEditable={setIsEditable}
          ref={inputRef}
        />
      ) : (
        <>
          {message}
          <div>
            <FaTrashAlt
              style={{ cursor: 'pointer', marginLeft: 10 }}
              onClick={() => removeTodo(id)}
            />
            <FaPencilAlt
              style={{ cursor: 'pointer', marginLeft: 10 }}
              onClick={() => changeTodo(id, message)}
            />
          </div>
        </>
      )}
    </li>
  );
};

export default Item;
