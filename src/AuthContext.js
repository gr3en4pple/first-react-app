import React, { createContext, useContext, useState } from 'react';
import { auth } from './firebase/firebase';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentForm, setCurrentForm] = useState('');
  const [isUserLoad, setUserLoad] = useState(true);
  const signIn = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);
  const signUp = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  const signOut = () => auth.signOut();

  const value = {
    user,
    setUser,
    signUp,
    signIn,
    signOut,
    currentForm,
    setCurrentForm,
    isUserLoad,
    setUserLoad,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider
