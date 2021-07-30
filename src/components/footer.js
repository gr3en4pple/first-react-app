import React from 'react';
import classNames from 'classnames';
import '../App.css';

const Footer = (props) => {
  const { itemLeft, clearCheck, onRenderClick, renderState } = props;
  const onRenderClickHandler = (value) => {
    if (value === 'All') onRenderClick(0);
    else if (value === 'Active') onRenderClick(1);
    else if (value === 'Completed') onRenderClick(2);
  };

  return (
    <footer className="Footer">
      <div className="items">{itemLeft} Items left</div>
      <div
        onClick={(e) => onRenderClickHandler(e.target.innerText)}
        className="buttons"
      >
        <span className={classNames('btn', { 'active': renderState === 0 })}>
          All
        </span>
        <span className={classNames('btn', { 'active': renderState === 1 })}>
          Active
        </span>
        <span className={classNames('btn', { 'active': renderState === 2 })}>
          Completed
        </span>
      </div>
      <div onClick={clearCheck} className="btn clear">
        Clear
      </div>
    </footer>
  );
};

export default Footer;
