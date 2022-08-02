import React from 'react';
import { Link } from 'react-router-dom';
import './GameMenu.css';

function GameMenu() {
  const user = {
    name: 'Max',
    lvl: 80,
  };
  return (
    <nav className="anim-show-gamemenu">
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/">Начать игру</Link>
            </li>
            <li>
              <Link to="/game">Настройки</Link>
            </li>
            <li>
              <Link to="/profile">Личный кабинет</Link>
            </li>
            <li>
              <Link to="/rating">Рейтинг игроков</Link>
            </li>
            <li>
              <Link to="/logout">Сменить пользователя</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/sign/in">Войти</Link>
            </li>
            <li>
              <Link to="/sign/up">Зарегистрироваться</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default GameMenu;
