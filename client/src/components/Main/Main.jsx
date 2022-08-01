import React from 'react';
import './Main.css';

export default function Main() {
  return (
    <nav className="anim-show">
      <ul>
        <li>
          <a required href="/" data-title="Ты готов?" id="jogar-btn">
            Начать игру
          </a>
        </li>
      </ul>
    </nav>
  );
}
