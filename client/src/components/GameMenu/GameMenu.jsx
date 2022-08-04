import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../store/userReducer/reducer';

import './GameMenu.css';

function GameMenu() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  const onClick = useCallback(() => {
    dispatch(signOut());
  }, []);

  return (
    <nav className="anim-show-gamemenu">
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/game">Начать игру</Link>
            </li>
            <li>
              <Link to="/profile">Настройки</Link>
            </li>
            <li>
              <Link to="/profileHero">Ваш герой</Link>
            </li>
            <li>
              <Link to="/rating">Рейтинг игроков</Link>
            </li>
            <li>
              <Link to="/sign/in" onClick={onClick}>
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
