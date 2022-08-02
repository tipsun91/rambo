import React from 'react';
import './GameMenu.css';

function GameMenu() {
  return (
    <nav className="anim-show-gamemenu">
      <ul>
        <li>
          <a href="/sign/in">Войти</a>
        </li>
        <li>
          <a href="/sign/up">Зарегистрироваться</a>
        </li>
        <li>
          <a href="/profile">Статистика</a>
        </li>
        <li>
          <a href="/rating">Рейтинг</a>
        </li>
        <li>
          <a href="/main">Выход</a>
        </li>
      </ul>
    </nav>
  );
}

export default GameMenu;
