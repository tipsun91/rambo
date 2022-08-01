/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../Hero/Hero';
import GameBar from '../GameBar/GameBar';
import Bullet from '../Bullet/Bullet';
import Enemy from '../Enemy/Enemy';
import './App.css';
import {
  display,
  updateFrame,
  sendStatistic,
  updateWawes,
  updateEnemies,
} from '../../store/gameReducer/reducer';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useRef();
  const {
    enemies, bullets, player, game,
  } = useSelector((state) => state.game);
  const [passageWawes, setPassageWawes] = useState(1);
  const [countWawes, setCountWawes] = useState(1);
  const [playGame, setPlayGame] = useState('play');
  const [arrowRight, setArrowRight] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [bullet, setBullet] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeBullet, seTimeBullet] = useState(Date.now());
  const [timeEnemy, setTimeEnemy] = useState(Date.now());
  const [shoot, setShoot] = useState(false);
  const [cordMouse, setCordMouse] = useState();

  useEffect(() => {
    const mouseClickDown = (event) => {
      setShoot(true);
      setCordMouse([event.clientX - 36, event.clientY - 35]);
    };
    const mouseClickUp = (event) => {
      setShoot(false);
    };

    const funtion1 = (event) => {
      if (event.key === 'd') {
        setArrowRight(true);
      }
      if (event.key === 'a') {
        setArrowLeft(true);
      }
      if (event.key === 'w') {
        setArrowUp(true);
      }
      if (event.key === 's') {
        setArrowDown(true);
      }
      if (event.key === ' ') {
        setBullet(true);
      }
    };

    const function2 = (event) => {
      if (event.key === 'd') {
        setArrowRight(false);
      }
      if (event.key === 'a') {
        setArrowLeft(false);
      }
      if (event.key === 'w') {
        setArrowUp(false);
      }
      if (event.key === 's') {
        setArrowDown(false);
      }
      if (event.key === ' ') {
        setBullet(false);
      }
    };

    document.addEventListener('mousedown', mouseClickDown);
    document.addEventListener('mouseup', mouseClickUp);

    dispatch(display({ width: app.current.offsetWidth, height: app.current.offsetHeight }));

    document.addEventListener('keydown', funtion1);
    document.addEventListener('keyup', function2);

    return () => {
      document.removeEventListener('mousedown', mouseClickDown);
      document.removeEventListener('mouseup', mouseClickUp);
      document.removeEventListener('keydown', funtion1);
      document.removeEventListener('keyup', function2);
    };
  }, []);

  const [timeoutFlag, setTimeoutFlag] = useState(false);
  useEffect(() => {
    const pressedButtons = [];
    const mouseCord = [];

    if (shoot) {
      if ((Date.now() - timeBullet) > 300) {
        mouseCord.push(cordMouse[0], cordMouse[1]);
        seTimeBullet(Date.now);
      }
    }

    if (arrowRight) {
      pressedButtons.push('d');
    }
    if (arrowLeft) {
      pressedButtons.push('a');
    }
    if (arrowUp) {
      pressedButtons.push('w');
    }
    if (arrowDown) {
      pressedButtons.push('s');
    }
    if (bullet) {
      if (Date.now() - timeBullet > 300) {
        pressedButtons.push(' ');
        seTimeBullet(Date.now);
      }
    }
    if (Date.now() - timeEnemy > 2000) {
      pressedButtons.push('enemy');
      setTimeEnemy(Date.now());
    }

    dispatch(updateFrame({ player: pressedButtons, mouseCord }));
    if (player.hp <= 0) {
      setPlayGame('game-over');
    }

    if (playGame === 'play') {
      if (game.countEnemies === 2 && passageWawes === 1) {
        dispatch(updateWawes());
        dispatch(updateEnemies());
        setPassageWawes(2);
      }
      if (game.countEnemies === 4 && passageWawes === 2) {
        dispatch(updateWawes());
        dispatch(updateEnemies());
        setPassageWawes(3);
      }
      if (game.countEnemies === 5) {
        setPlayGame('vin');
      }
    }

    if (playGame === 'play') {
      setTimeout(() => {
        setTimeoutFlag((prev) => !prev);
      }, 20);
    }
  }, [timeoutFlag]);

  useEffect(() => {
    if (playGame === 'game-over') {
      const time = (+Date.now() - +startTime) / 1000;
      dispatch(
        sendStatistic({
          countEnemies: game.countEnemies,
          countMoney: game.countMoney,
          countDamage: game.countDamage,
          countWawes,
          timeGame: time,
        }),
      );
    }
  }, [playGame]);

  return (
    <div ref={app} className="App">
      {playGame === 'play'
        && (
        <div>
          <GameBar />
          <Hero />
          {bullets && bullets.map((el) => <Bullet key={el.id} bullet={el} />)}
          {enemies && enemies.map((el) => <Enemy key={el.id} enemy={el} />)}
        </div>
        )}
      {playGame === 'game-over'
        && (
        <div className="gameOver">
          <h1>GAME OVER</h1>
          <Link className="nes-btn is-primary" to="/">
            Играть еще раз
          </Link>
          <Link className="nes-btn is-warning" to="/main">
            Вернуться в главное меню
          </Link>
        </div>
        )}
      {playGame === 'vin'
          && (
            <div className="gameOver">
              <h1>VINNER</h1>
              <Link className="nes-btn is-primary" to="/">
                Играть еще раз
              </Link>
              <Link className="nes-btn is-warning" to="/main">
                Вернуться в главное меню
              </Link>
            </div>
          )}
    </div>
  );
}

export default App;
