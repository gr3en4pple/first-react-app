import React, { useEffect } from 'react';
import { ContextHook } from '../ContextAPI';
import TodoItem from './TodoItem';
const ALL = 0;
const ACTIVE = 1;
const COMPLETED = 2;

const DisplayItem = () => {
  const { List, render } = ContextHook();

  return (
    <>
      {(render === ALL &&
        List.map((element) => <TodoItem item={element} key={element.key} />)) ||
        (render === ACTIVE &&
          List.filter((element) => !element.data.isDone).map((element) => (
            <TodoItem item={element} key={element.key} />
          ))) ||
        (render === COMPLETED &&
          List.filter((element) => element.data.isDone).map((element) => (
            <TodoItem item={element} key={element.key} />
          )))
      }
    </>
  );
};
export default DisplayItem;
