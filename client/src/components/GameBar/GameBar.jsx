import React from 'react';
import { useSelector } from 'react-redux';
import './GameBar.css';

function GameBar() {
  const { player, game } = useSelector((state) => state.game);

  return (
    <div className="nes-container is-dark with-title gamebar__wrapper">
      <div className="gamebar">
        <div className="gamebar__left">
          <p className="gamebar__progress__damage__number">
            {`🎯${game.countDamage}`}
          </p>
          <p>S:100</p>
        </div>
        <div className="gamebar__center">
          <div
            className="gamebar__progress__hp"
            style={{ width: `${player.hp}%` }}
          >
            <p className="gamebar__progress__number">{`${player.hp}💔`}</p>
          </div>
          <p className="gamebar__progress__number">1000 lvl</p>
        </div>
        <div className="gamebar__right">
          <p className="gamebar__progress__money__number">{`🥮${game.countMoney}`}</p>
          <p className="gamebar__progress__enemies__number">{`👻${game.countEnemies}`}</p>
        </div>
      </div>
    </div>
  );
}

export default GameBar;
