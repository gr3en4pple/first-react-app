import React from 'react';
import classNames from 'classnames';
import '../App.css';
import xMark from '../svg/cancel.svg';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { ContextHook } from '../ContextAPI';
const TodoItem = ({item}) => {
  const { delHandler, clickHandler } = ContextHook();
  const {data: {isDone, value} } = item;
  let Icon = CheckBoxOutlineBlankIcon;
  if (isDone) Icon = CheckBoxIcon;
  return (
    <div className="TodoItem">
      <Icon className="check-icon" onClick={() => clickHandler(item)} />
      <div className="text">
        <span className={classNames({ checked: isDone })}>
          {value}
          <span className={classNames('line', { done: isDone })}></span>
        </span>
      </div>
      <img onClick={() => delHandler(item)} src={xMark} className="del-icon" />
    </div>
  );
};

export default TodoItem;
