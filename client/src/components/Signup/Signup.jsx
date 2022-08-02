import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../store/userReducer/reducer';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)
  const signUpForm = useRef();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      dispatch(signUp(event));
    },
    [signUpForm],
  );

  useEffect(
    () => {
      if (user && user.id) {
        navigate('/main');
      }
    },
    [user]
  );

  return (
    <div className="registr-box anim-show-signup">
      <form
        className="form"
        autoComplete="off"
        ref={signUpForm}
        onSubmit={onSubmit}
      >
        <div className="input-section">
          <i className="far" />
          <input
            required
            name="name"
            className="input-area"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="input-section">
          <i className="far" />
          <input
            required
            name="email"
            className="input-area"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="input-section">
          <i className="fas" />
          <input
            required
            name="password"
            className="input-area"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="input-section">
          <i className="fas" />
          <input
            required
            name="pswdcfrm"
            className="input-area"
            type="password"
            placeholder="Password confirm"
          />
        </div>
        <button type="submit" className="btn" id="login-btn">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
