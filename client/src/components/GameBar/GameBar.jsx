import React from 'react';
import { useSelector } from 'react-redux';
import './GameBar.css';

function GameBar() {
  const { player } = useSelector((state) => state.game);

  return (
    <div className="gamebar">
      <div className="gamebar__progress">
        <div
          className="gamebar__progress__hp"
          style={{ width: `${player.hp}px` }}
        />
        <span className="gamebar__progress__number">{player.hp}</span>
       <div
          className="gamebar__progress__damage"
          style={{ width: `${player.damagevalue}px` }}
        />
        <span className="gamebar__progress__damage__number">{player.damagevalue}</span>
      </div>
    </div>
  );
}

export default GameBar;
