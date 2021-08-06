import './App.css';
import React, { useEffect } from 'react';
import Input from './components/Input';
import Footer from './components/footer';
import Navbar from './components/navbar';
import AuthForm from './components/authForm';
import DisplayItem from './components/DisplayItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { ContextProvider, ContextHook } from './ContextAPI';
import { AuthProvider, useAuth } from './AuthContext';
const App = () => {
  const { isUserLoad } = useAuth();
  return (
    <AuthProvider>
      <ContextProvider>
        <div className="App">
          <header className="navbar">
            <Navbar Icons={[ExitToAppSharpIcon, AccountCircleIcon]} />
          </header>
          <AuthForm />
          {!isUserLoad && (
            <div className="Todo-list">
              <Input />
              <DisplayItem />
              <Footer />
            </div>
          )}
        </div>
      </ContextProvider>
    </AuthProvider>
  );
};

export default App;
