import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import classNames from 'classnames';
import '../App.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const AuthForm = () => {
  const [mail, setMail] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [showError, setError] = useState('');
  const {
    signUp,
    signIn,
    isUserLoad,
    setUserLoad,
    currentForm,
    setCurrentForm,
  } = useAuth();

  const onFocusHandler = (e) => {
    setError('');
  };

  const clearOutInput = () => {
    setPw('');
    setMail('');
    setPwConfirm('');
    setError('');
  };

  const onCloseForm = (e) => {
    e.preventDefault();
    clearOutInput();
    setCurrentForm('');
  };

  const onChangeForm = (e) => {
    clearOutInput();
    setCurrentForm(e.currentTarget.innerText);
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    if (currentForm === 'Register') {
      if (pw !== pwConfirm) {
        setError('Please type password correctly');
        return;
      }
      try {
        setUserLoad(true);
        await signUp(mail, pw);
      } catch (error) {
        setError(error.message);
        return;
      } finally {
        setUserLoad(false);
      }
    } else if (currentForm === 'Login') {
      try {
        setUserLoad(true);
        await signIn(mail, pw);
      } catch (error) {
        setError('Wrong email or password');
        return;
      } finally {
        setUserLoad(false);
      }
    }
    setUserLoad(false);
    onCloseForm(e);
  }

  return (
    <>
      <div className={classNames('modal', { show: currentForm })}></div>

      <div
        className={classNames(
          'auth-form',
          { slideIn: currentForm },
          { opa95: isUserLoad }
        )}
      >
        <div className="loading">
          {isUserLoad && (
            <CircularProgress style={{ color: 'rgb(252, 90, 49)' }} />
          )}
        </div>
        <div className="auth-form__header">
          <h1 className="auth-form__text-bold">
            {(currentForm === 'Register' && 'Register') ||
              (currentForm === 'Login' && 'Login')}
          </h1>
          <h3
            onClick={!isUserLoad ? onChangeForm : undefined}
            className={classNames('auth-form__text-primary')}
          >
            {(currentForm === 'Register' && 'Login') ||
              (currentForm === 'Login' && 'Register')}
          </h3>
        </div>

        <form onSubmit={(e) => onSubmitHandler(e)} className="auth-form__form">
          <p className={classNames('errors', { show: showError })}>
            {showError}
          </p>
          <input
            onFocus={onFocusHandler}
            className="auth-form__input"
            type="text"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            disabled={isUserLoad}
          />
          <input
            onFocus={onFocusHandler}
            className="auth-form__input"
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            disabled={isUserLoad}
          />
          {currentForm === 'Register' && (
            <input
              onFocus={onFocusHandler}
              className="auth-form__input"
              type="password"
              placeholder="Confirm password"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
              disabled={isUserLoad}
            />
          )}

          <div className="auth-form__buttons">
            <button
              type="submit"
              onClick={(e) => onSubmitHandler(e)}
              className={classNames('auth-form__btn primary')}
              disabled={isUserLoad}
            >
              {(currentForm === 'Register' && 'Sign up') ||
                (currentForm === 'Login' && 'Sign in')}
            </button>
            <button
              onClick={onCloseForm}
              className={classNames('auth-form__btn')}
              disabled={isUserLoad}
            >
              Back
            </button>
          </div>
        </form>
        <div className="auth-form__socials"></div>
      </div>
    </>
  );
};

export default AuthForm;
