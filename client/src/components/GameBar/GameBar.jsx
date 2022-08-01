import React from 'react';
import { useSelector } from 'react-redux';
import './GameBar.css';

function GameBar() {
  const { player, game } = useSelector((state) => state.game);

  return (
    <div className="gamebar">
      <div className="gamebar__progress">
        <div
          className="gamebar__progress__hp"
          style={{ width: `${player.hp}px` }}
        />
        <span className="gamebar__progress__number">{player.hp}</span>
        {/* <div
          className="gamebar__progress__damage"
          style={{ width: `${game.countDamage}px` }}
        /> */}
        <span className="gamebar__progress__damage__number">{game.countDamage}</span>
        <span className="gamebar__progress__money__number">{game.countMoney}</span>
        <span className="gamebar__progress__waves__number">{game.countWawes}</span>
        <span className="gamebar__progress__enemies__number">{game.countEnemies}</span>
      </div>
    </div>
  );
}

export default GameBar;
