import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodoAsync } from '../redux/actions/todoActions';

const EditTodo = React.forwardRef(({ message, setIsEditable, id }, ref) => {
  const [value, setValue] = useState(() => message);

  const dispatch = useDispatch();

  const setNewValue = (value) => {
    setValue(value);
  };

  const changeTodo = () => {
    const newTodo = { value, id };
    setIsEditable(false);
    dispatch(editTodoAsync(newTodo));
  };

  const changeEditable = () => {
    setIsEditable(false);
  };

  return (
    <>
      <input
        ref={ref}
        type='text'
        value={value}
        onChange={({ target }) => setNewValue(target.value)}
        style={{ textAlign: 'center', width: 100 }}
      />
      <button onClick={changeTodo}> ACCEPT </button>
      <button onClick={changeEditable}> Decline </button>
    </>
  );
});

export default EditTodo;
