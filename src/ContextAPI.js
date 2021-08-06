import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db, auth } from './firebase/firebase';
import firebase from 'firebase';
import {v4 as uuidv4 } from 'uuid';
const ContextAPI = React.createContext();

export function ContextHook() {
  return useContext(ContextAPI);
}

export const ContextProvider = ({ children }) => {
  const [render, setRender] = useState(0);
  const [List, setStateList] = useState([]);
  const { user, setUser, isUserLoad, setUserLoad } = useAuth();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {  
        setUser(user);
        setUserLoad(false);
        if(user) {
          db.collection(user.uid)
          .orderBy('time', 'desc')
          .onSnapshot((snapshot) => {
            setStateList(snapshot.docs.map(doc => ({
              key:doc.id,
              data:doc.data()
            })))
          });   
        }
        else {
          setStateList([])
        }  
        
    });
    return unsubscribe;
  }, []);
  const clearCheckedHandler = () => {
    //using batch to update all docs.
    //Then commit to db.
    //render only 1 time
    if (user) {
      const batch = db.batch();
      db.collection(user.uid)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const docRef = db.collection(user.uid).doc(doc.id);
            batch.update(docRef, { isDone: false });
          });
          batch.commit();
        });
    } else {
      const newList = [...List];
      newList.forEach((element) => {
        element.data.isDone = false;
      });
      setStateList(newList);
    }
  };
  const onAnonSubmit = (item) => {
    if (item === null || !item.trim()) return;
    const newTodo = {
      key: uuidv4(),
      data: {
        value: item,
        isDone: false,
      },
    };
    console.log(newTodo.key);
    const newList = [newTodo, ...List];
    setStateList(newList);
  };

  const onSubmit = (item) => {
    if (item === null) return;
    if (!item.trim()) return;
    db.collection(user.uid).add({
      value: item,
      isDone: false,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const clickHandler = (item) => {
    if (user) {
      const index = List.findIndex((element) => element.key === item.key);
      db.collection(user.uid).doc(item.key).update({
        isDone: !List[index].data.isDone,
      });
    } else {
      const index = List.findIndex((element) => element.key === item.key);
      const newList = [...List];
      newList[index].data.isDone = !newList[index].data.isDone;
      setStateList(newList);
    }
  };

  const delHandler = (item) => {
      
      if(user) db.collection(user.uid).doc(item.key).delete();
      else {
        const index = List.indexOf(item)  
        const newList = [...List.slice(0,index),...List.slice(index+1)]
        setStateList(newList);
      }
  
  }
  const renderStateHandler = (renderState) => setRender(renderState);

  const countActives = () => {
    if (render === 2) return 0;
    return List.filter((element) => !element.data.isDone).length;
  };

  const data = {
    render,
    List,
    clearCheckedHandler,
    countActives,
    renderStateHandler,
    delHandler,
    clickHandler,
    onSubmit,
    onAnonSubmit,
  };
  return <ContextAPI.Provider value={data}>{children}</ContextAPI.Provider>;
};
