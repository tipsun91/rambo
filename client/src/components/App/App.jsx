/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../Hero/Hero';
import Bullet from '../Bullet/Bullet';
import './App.css';
import { updateFrame, calcBullets } from '../../store/gameReducer/reducer';

function App() {
  const dispatch = useDispatch();

  const { bullets, player } = useSelector((state) => state.game);

  const [arrowRight, setArrowRight] = useState(false);
  const [arrowLeft, setArrowLeft] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [bullet, setBullet] = useState(false);
  const [timeBullet, seTimeBullet] = useState(Date.now());

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

    dispatch(updateFrame({ player: pressedButtons }));

    setTimeout(() => {
      setTimeoutFlag((prev) => !prev);
    }, 20);
  }, [timeoutFlag]);

  return (
    <div className="App">
      <Hero />
      { bullets
        && bullets.map((el) => <Bullet bullet={el} key={el.id} />)}
    </div>
  );
}

export default App;
