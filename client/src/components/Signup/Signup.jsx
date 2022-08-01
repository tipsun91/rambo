import React, { useRef, useCallback } from 'react';
import './Signup.css';

const URL = '/api/sign/up/';

export default function Signup() {
  const signUpForm = useRef();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:  signUpForm.current.name.value,
          email: signUpForm.current.email.value,
          password: [
            signUpForm.current.password.value,
            signUpForm.current.pswdcfrm.value
          ],
        }),
      })
      .then(
        data => data.json()
      )
      .then(
        data => { console.log(data); }
      )
      .catch(
        error => { console.log(error); }
      );
    },
    [signUpForm],
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
