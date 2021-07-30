import React from 'react';
import classNames from 'classnames';
import '../App.css';
import checkDoneIcon from '../svg/checkDone.svg';
import checkIcon from '../svg/check.svg';
import xMark from '../svg/cancel.svg';

const TodoItem = ({ item, onClick, delItem }) => {

  const checkIconHandler = (item) => onClick(item);
  const delHandler = (item) => delItem(item);
  const { value , isDone } = item;
  let icon = checkIcon;
  if (isDone) icon = checkDoneIcon;
  return (
    <div className="TodoItem">
      <img
        onClick={() => checkIconHandler(item)}
        className="check-icon"
        src={icon}
      ></img>
      <div className={classNames('text', { done: isDone })}> {value}</div>
      <img onClick={() => delHandler(item)} src={xMark} className="del-icon" />
    </div>
  );
  
};

export default TodoItem;
