import './App.css';
import React, { useState } from 'react';
import TodoItem from './components/TodoItem';
import Input from './components/Input';
import Footer from './components/footer';

const ALL = 0;
const ACTIVE = 1;
const COMPLETED = 2;
const App = () => {

  const [List, setStateList] = useState([]);
  const [render, setRender] = useState(ALL);

  const clickHandler = (item) => {
    const index = List.indexOf(item);
    const newList = [...List];
    newList[index].isDone = !newList[index].isDone
    setStateList(newList);
  };

  const delHandler = (item) => {
    const index = List.indexOf(item);
    const newList = [...List.slice(0, index), ...List.slice(index + 1)];
    setStateList(newList);
  };

  const onSubmit = (item) => {
    if (!item) return;
    const newList = [{ value: item, isDone:false }, ...List];
    setStateList(newList);
  };

  const countActives = () => {
    if(render === COMPLETED) 
      return 0;
    return List.filter((element) => !element.isDone).length;
  };

  const clearCheckedHandler = () => {
    const newList = [...List];
    newList.forEach((element) => {
      element.isDone = false;
    });
    setStateList(newList);
  };

  const inputCheckHandler = () => {
    const newList = [...List];
    newList.forEach((element) => {
      element.isDone = true;
    });
    setStateList(newList);
  };

  const renderStateHandler = (renderState) => {
    setRender(renderState);
  };

  return (
    <div className="App">
      <Input onCheck={inputCheckHandler} onSubmit={onSubmit} />
      {(render === ALL &&
        List.map((element, index) => (
          <TodoItem
            delItem={delHandler}
            onClick={clickHandler}
            key={index}
            item={element}
          />
        ))) ||
        (render === ACTIVE &&
          List.filter((element) => !element.isDone).map((element, index) => (
            <TodoItem
              delItem={delHandler}
              onClick={clickHandler}
              key={index}
              item={element}
            />
          ))) ||
        (render === COMPLETED && List.filter((element) => element.isDone)).map(
          (element, index) => (
            <TodoItem
              delItem={delHandler}
              onClick={clickHandler}
              key={index}
              item={element}
            />
          )
        )}
      <Footer
        onRenderClick={renderStateHandler}
        clearCheck={clearCheckedHandler}
        itemLeft={countActives()}
        renderState={render}
      />
    </div>
  );
};

export default App;
