import React from 'react';
import './Signup.css';

export default function Signup() {
  return (
    <div className="registr-box">
      <div className="input-section">
        <i className="far" />
        <input className="input-area" type="text" placeholder="Username" />
      </div>
      <div className="input-section">
        <i className="far" />
        <input className="input-area" type="text" placeholder="Email" />
      </div>
      <div className="input-section">
        <i className="fas" />
        <input className="input-area" type="password" placeholder="Password" />
      </div>
      <button type="button" className="btn" id="login-btn">
        Зарегистрироваться
      </button>
      <div className="question-box">
        <p className="question" />
        <a className="reg-btn" href="/">
          Войти
        </a>
      </div>
    </div>
  );
}
