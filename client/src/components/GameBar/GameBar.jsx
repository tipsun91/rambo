/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import './GameBar.css';

function GameBar() {
  const {
    player, game, gamePlay, enemies,
  } = useSelector((state) => state.game);

  return (
    <div className="nes-container is-dark with-title gamebar__wrapper">
      <div className="gamebar">
        <div className="gamebar__left">
          <p className="gamebar__progress__damage__number">
            damage-
            {player.damage}
          </p>
          <p className="gamebar__progress__damage__number">
            speed-
            {player.speed}
          </p>
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
          <p className="gamebar__progress__money__number">{`gold${game.countMoney}`}</p>
          <p className="gamebar__progress__enemies__number">{`kill${game.countEnemies}`}</p>
        </div>
      </div>
    </div>
  );
}

export default GameBar;
