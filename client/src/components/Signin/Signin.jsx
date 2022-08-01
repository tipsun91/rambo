import React from 'react';
import './Signin.css';

export default function Signin() {
  return (
    <div className="login-box anim-show-singin">
      <form className="form_login" autoComplete="off">
        <div className="input-section">
          <i className="far" />
          <input
            required
            className="input-area"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="input-section">
          <i className="fas" />
          <input
            required
            className="input-area"
            type="password"
            placeholder="Password"
          />
        </div>
        <button type="button" className="btn" id="login-btn">
          Войти
        </button>
      </form>
    </div>
  );
}
