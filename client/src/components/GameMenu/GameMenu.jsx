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
              <Link to="/game" className="lists__items nes-btn nes-btn__oth is-success btn-menu">Начать игру</Link>
            </li>
            <li>
              <Link to="/profile" className="lists__items nes-btn nes-btn__oth is-primary btn-menu">Настройки профиля</Link>
            </li>
            <li>
              <Link to="/profileHero" className="lists__items nes-btn nes-btn__oth is-primary btn-menu">Ваш герой</Link>
            </li>
            <li>
              <Link to="/rating" className="lists__items nes-btn nes-btn__oth is-primary btn-menu">Рейтинг игроков</Link>
            </li>
            <li>
              <Link to="/sign/in" onClick={onClick} className="lists__items nes-btn nes-btn__oth is-error btn-menu">
                Сменить пользователя
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/sign/in" className="lists__items nes-btn nes-btn__oth is-primary">Войти</Link>
            </li>
            <li>
              <Link to="/sign/up" className="lists__items nes-btn nes-btn__oth is-primary">Зарегистрироваться</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default GameMenu;
