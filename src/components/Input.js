import React, { useState } from 'react';
import classNames from 'classnames';
import '../App.css';
import checkDone from '../svg/tick.svg'
import checkMark from '../svg/checkMark.svg'


const Input = ({ onCheck,onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [icon,setIcon] = useState(checkMark)
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };
  
  const onCheckHandler = () => {
    if(icon === checkMark)
      setIcon(checkDone)
    else
      setIcon(checkMark)
    onCheck()
  }
  return (
    <form onSubmit={onSubmitHandler} className="Input">
        <img onClick ={onCheckHandler} className="check-icon" src={icon}></img> 
      <input
        type="text"
        onChange={onChangeHandler}
        value={inputValue}
        className="Input-box"
        placeholder="Enter anything here"
      />
    </form>
  );
};

export default Input;
