import React, { useRef, useCallback } from 'react';
import './Signup.css';

export default function Signup() {
  const singUpForm = useRef();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      fetch('/sign/up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: singUpForm.current.username,
          email: singUpForm.current.email,
          password: [singUpForm.current.password, singUpForm.current.password],
        }),
      });
    },
    [singUpForm],
  );

  return (
    <div className="registr-box anim-show-signup">
      <form
        className="form"
        autoComplete="off"
        ref={singUpForm}
        onSubmit={onSubmit}
      >
        <div className="input-section">
          <i className="far" />
          <input
            required
            name="username"
            className="input-area"
            type="text"
            placeholder="Username"
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
        <button type="submit" className="btn" id="login-btn">
          Зарегистрироваться
        </button>
        <div className="question-box">
          <p className="question" />
          <a className="reg-btn" href="/sign/in">
            Войти
          </a>
        </div>
      </form>
    </div>
  );
}
