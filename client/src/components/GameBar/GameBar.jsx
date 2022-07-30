import React from 'react';
import { useSelector } from 'react-redux';
import './GameBar.css';

function GameBar() {
  const { player } = useSelector((state) => state.game);

  return (
    <div className="gamebar">
      <div className="gamebar__progress">
        <div
          className="gamebar__progress-inner"
          style={{ width: `${player.hp}%` }}
        />
        <span className="gamebar__progress-persent">{player.hp}</span>
      </div>
    </div>
  );
}

export default GameBar;
