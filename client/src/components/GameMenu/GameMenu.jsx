import React from 'react';
import './GameMenu.css';

function GameMenu() {
  return (
    <nav className="anim-show">
      <ul>
        <li>
          <a href="/">Войти</a>
        </li>
        <li>
          <a href="/">Зарегистрироваться</a>
        </li>
        <li>
          <a href="/">Статистика</a>
        </li>
        <li>
          <a href="/">Выход</a>
        </li>
      </ul>
    </nav>
  );
}

export default GameMenu;
