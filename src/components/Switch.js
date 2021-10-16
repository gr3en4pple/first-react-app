import React from 'react';
import classNames from 'classnames';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { IconButton } from '@material-ui/core';
import { useAuth } from '../AuthContext';
import { db } from '../firebase/firebase';
function Switch({ isDrop, isChecked, setChecked }) {
  const { user } = useAuth();
  const onCheckHandler = () => {
    const newMode = !isChecked;
    setChecked(newMode);
    db.collection('mode-list').doc(user.uid).set({ mode: newMode });
  };
  return (
    <label className={classNames('switch', {drop: isDrop})}>
      <input type="checkbox" checked={isChecked} onChange={onCheckHandler} />
      <span className="slider"></span>
      <IconButton
        disableRipple
        className={classNames('sun mode', { active: !isChecked })}
      >
        <WbSunnyIcon />
      </IconButton>
      <IconButton
        disableRipple
        className={classNames('moon mode', { active: isChecked })}
      >
        <Brightness3Icon />
      </IconButton>
    </label>
  );
}

export default Switch;
