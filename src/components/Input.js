import React, { useState } from 'react';
import '../App.css';
import { ContextHook } from '../ContextAPI';
import { useAuth } from '../AuthContext';

const Input = () => {
  const [inputValue, setInputValue] = useState('');
  const { onSubmit, onAnonSubmit } = ContextHook();
  const { user } = useAuth();
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
      if(user)
        onSubmit(inputValue);
      else {
        onAnonSubmit(inputValue)
      }
    setInputValue('');
  };

  return (
    <form onSubmit={onSubmitHandler} className="Input">
      <input
        type="text"
        onChange={onChangeHandler}
        value={inputValue}
        className="Input-box"
        placeholder="Things to do..."
      />
    </form>
  );
};

export default Input;
