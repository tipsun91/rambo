import React from 'react';
import { useSelector } from 'react-redux';
import './Hero_Style.css';

function Hero() {
  const { player } = useSelector((state) => state.game);

  return (
    <div
      className="hero"
      style={{
        transform: ` translate(${player.x.toString()}px, ${player.y.toString()}px)`,
        width: `${player.w}px`,
        height: `${player.h}px`,
      }}
    >
      1
    </div>
  );
}

export default Hero;
