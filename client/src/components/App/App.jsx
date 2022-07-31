/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../Hero/Hero';
import GameBar from '../GameBar/GameBar';
import Bullet from '../Bullet/Bullet';
import Enemy from '../Enemy/Enemy';
import './App.css';
import { updateFrame, sendStatistic } from '../../store/gameReducer/reducer';

function App() {
  const dispatch = useDispatch();
  const {
    enemies, bullets, player, game,
  } = useSelector((state) => state.game);
  const [countWawes, setCountWawes] = useState(1);
  const [playGame, setplayGame] = useState(true);
  const [arrowRight, setArrowRight] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [bullet, setBullet] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeBullet, seTimeBullet] = useState(Date.now());
  const [timeEnemy, setTimeEnemy] = useState(Date.now());

  useEffect(() => {
    const funtion1 = (event) => {
      if (event.key === 'ArrowRight') {
        setArrowRight(true);
      }
      if (event.key === 'ArrowLeft') {
        setArrowLeft(true);
      }
      if (event.key === 'ArrowUp') {
        setArrowUp(true);
      }
      if (event.key === 'ArrowDown') {
        setArrowDown(true);
      }
      if (event.key === ' ') {
        setBullet(true);
      }
    };

    const function2 = (event) => {
      if (event.key === 'ArrowRight') {
        setArrowRight(false);
      }
      if (event.key === 'ArrowLeft') {
        setArrowLeft(false);
      }
      if (event.key === 'ArrowUp') {
        setArrowUp(false);
      }
      if (event.key === 'ArrowDown') {
        setArrowDown(false);
      }
      if (event.key === ' ') {
        setBullet(false);
      }
    };

    document.addEventListener('keydown', funtion1);
    document.addEventListener('keyup', function2);

    return () => {
      document.removeEventListener('keydown', funtion1);
      document.removeEventListener('keyup', function2);
    };
  }, []);

  const [timeoutFlag, setTimeoutFlag] = useState(false);
  useEffect(() => {
    const pressedButtons = [];

    if (arrowRight) {
      pressedButtons.push('ArrowRight');
    }
    if (arrowLeft) {
      pressedButtons.push('ArrowLeft');
    }
    if (arrowUp) {
      pressedButtons.push('ArrowUp');
    }
    if (arrowDown) {
      pressedButtons.push('ArrowDown');
    }
    if (bullet) {
      if ((Date.now() - timeBullet) > 300) {
        pressedButtons.push(' ');
        seTimeBullet(Date.now);
      }
    }
    if ((Date.now() - timeEnemy) > 2000) {
      pressedButtons.push('enemy');
      setTimeEnemy(Date.now());
    }

    dispatch(updateFrame({ player: pressedButtons }));
    if (player.hp <= 0) {
      setplayGame(false);
    }

    if (playGame) {
      if (game.countEnemies === 2) {
        setCountWawes(2);
      }
      if (game.countEnemies === 3) {
        setCountWawes(3);
      }
      if (game.countEnemies === 4) {
        setCountWawes(4);
      }
      if (game.countEnemies === 5) {
        setCountWawes(5);
      }
    }

    if (playGame) {
      setTimeout(() => {
        setTimeoutFlag((prev) => !prev);
      }, 20);
    }
  }, [timeoutFlag]);

  useEffect(() => {
    if (!playGame) {
      const time = (+Date.now() - +startTime) / 1000;
      dispatch(sendStatistic({
        countEnemies: game.countEnemies,
        countMoney: game.countMoney,
        countDamage: game.countDamage,
        countWawes,
        timeGame: time,
      }));
    }
  }, [playGame]);

  return (
    <div className="App">
      {
        playGame
          ? (
            <div>
              <GameBar />
              <Hero />
              { bullets
                && bullets.map((el) => <Bullet key={el.id} bullet={el} />)}
              { enemies
                && enemies.map((el) => <Enemy key={el.id} enemy={el} />)}
            </div>
          )
          : (
            <div className="gameOver">
              <h1>GAME OVER</h1>
              <button type="button">Играть еще раз</button>
              <button type="button">Вернуться в главное меню</button>
            </div>
          )
      }
    </div>
  );
}

export default App;
