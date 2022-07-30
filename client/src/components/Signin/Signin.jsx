import React from 'react';
import './Signin.css';

export default function Signin() {
  return (
    <div className="registr-box">
      <div className="input-section">
        <i className="far" />
        <input className="input-area" type="text" placeholder="Email" />
      </div>
      <div className="input-section">
        <i className="fas" />
        <input className="input-area" type="password" placeholder="Password" />
      </div>
      <button type="button" className="btn" id="login-btn">
        Войти
      </button>
    </div>
  );
}
