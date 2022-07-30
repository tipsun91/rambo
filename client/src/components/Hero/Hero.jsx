import React from 'react';
import { useSelector } from 'react-redux';

function Hero() {
  const { player } = useSelector((state) => state.game);

  return (
    <div className="hero" style={{ transform: `translate(${player.x.toString()}px, ${player.y.toString()}px)` }}>1</div>
  );
}

export default Hero;
