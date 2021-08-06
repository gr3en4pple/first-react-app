import React from 'react';
import classNames from 'classnames';
import '../App.css';
import { ContextHook } from '../ContextAPI';

const Footer = (props) => {
  const {clearCheckedHandler, countActives, renderStateHandler,render } = ContextHook();
  const onRenderClickHandler = (value) => {
    if (value === 'All') renderStateHandler(0)
    else if (value === 'Active') renderStateHandler(1)
    else if (value === 'Completed') renderStateHandler(2)
  };

  return (
    <footer className="Footer">
      <div className="items">{countActives()} Items left</div>
      <div
        onClick={(e) => onRenderClickHandler(e.target.innerText)}
        className="buttons"
      >
        <span className={classNames('btn', { 'active': render === 0 })}>
          All
        </span>
        <span className={classNames('btn', { 'active': render === 1 })}>
          Active
        </span>
        <span className={classNames('btn', { 'active': render === 2 })}>
          Completed
        </span>
      </div>
      <div onClick={clearCheckedHandler} className="btn clear">
        Clear
      </div>
    </footer>
  );
};

export default Footer;
