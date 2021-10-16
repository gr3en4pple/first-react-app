import './App.css';
import React, { useState , useEffect} from 'react';
import Input from './components/Input';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import DisplayItem from './components/DisplayItem';
import Switch from './components/Switch';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { ContextHook } from './ContextAPI';
import { useAuth } from './AuthContext';
import classNames from 'classnames';
import Loading from './components/Loading';
const App = () => {
  const { isUserLoad, user } = useAuth();
  const { isChecked, setChecked } = ContextHook();
  const [isDrop, setDrop] = useState(false);
  useEffect(() => {
    isDrop
      ? document.getElementsByTagName('html')[0].classList.add('noscroll')
      : document.getElementsByTagName('html')[0].classList.remove('noscroll');
  }, [isDrop]);
  
  const dropSwitchHandler = () => {
    setDrop((prev) => !prev);
  };
  return (
    <div className={classNames('layout', { dark: isChecked })}>
      <div className="container">
        <div className="wrapper">
          <header className="navbar">
            <Navbar
              dropSwitchHandler={dropSwitchHandler}
              isChecked={isChecked}
              setChecked={setChecked}
              Icons={[ExitToAppSharpIcon, AccountCircleIcon]}
            />
          </header>
          {user && (
            <div
              onClick={dropSwitchHandler}
              className={classNames('modal', { show: isDrop })}
            >
              <Switch
                isDrop={isDrop}
                isChecked={isChecked}
                setChecked={setChecked}
              />
            </div>
          )}
          {isUserLoad && <Loading />}
          <AuthForm />

          {!isUserLoad && (
            <div className="Todo-list">
              <Input />
              <DisplayItem />
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
