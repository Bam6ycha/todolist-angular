import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../redux/actions/todoActions';

const Input = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const addTodo = () => {
    if (value.trim()) {
      dispatch(addTodoAsync(value));
      setValue('');
    }
    inputRef.current.focus();
  };

  return (
    <>
      <label htmlFor='addTodo'>
        <input
          placeholder='What you are going to do?'
          ref={inputRef}
          autoFocus
          autoComplete='off'
          type='text'
          id='addTodo'
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </label>
      <button type='submit' onClick={addTodo}>
        {' '}
        ADD TODO{' '}
      </button>
    </>
  );
};

export default Input;
