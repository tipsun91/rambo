import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../store/userReducer/reducer';

import './GameMenu.css';

function GameMenu() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(signOut());
  }, []);

  return (
    <nav className="anim-show-gamemenu">
      <ul className="game-menu nes-container is-dark with-title">
        {user ? (
          <>
            <li>
              <Link to="/game" className="lists__items">Начать игру</Link>
            </li>
            <li>
              <Link to="/profile">Настройки профиля</Link>
            </li>
            <li>
              <Link to="/profileHero">Ваш герой</Link>
            </li>
            <li>
              <Link to="/rating" className="lists__items">Рейтинг игроков</Link>
            </li>
            <li>
              <Link to="/sign/in" onClick={onClick} className="lists__items">
                Сменить пользователя
              </Link>
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
