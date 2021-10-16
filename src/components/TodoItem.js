import React from 'react';
import classNames from 'classnames';
import '../App.css';
import CloseIcon from '@material-ui/icons/Close';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { ContextHook } from '../ContextAPI';
const TodoItem = ({ item }) => {
  const { delHandler, clickHandler } = ContextHook();
  const {
    data: { isDone, value },
  } = item;

  let Icon = CheckBoxOutlineBlankIcon;
  if (isDone) Icon = CheckBoxIcon;
  return (
    <div className="TodoItem">
      <Icon className="check-icon" onClick={() => clickHandler(item)} />
      <div className="text">
        <span  className={classNames('text-input',{done:isDone})}>
          {value}
          
        </span>
      </div>
      <CloseIcon className="del-icon" onClick={() => delHandler(item)} />
    </div>
  );
};

export default TodoItem;
