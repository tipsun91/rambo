import React from 'react';
import './GameMenu.css';

function GameMenu() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a data-title="Ты готов?" id="jogar-btn">
              Войти
            </a>
          </li>
          <li>
            <a data-title="Ты готов?" id="jogar-btn">
              Зарегистрироваться
            </a>
          </li>
          <li>
            <a data-title="Ты готов?" id="jogar-btn">
              Статистика
            </a>
          </li>
          <li>
            <a data-title="Ты готов?" id="jogar-btn">
              Выход
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default GameMenu;
