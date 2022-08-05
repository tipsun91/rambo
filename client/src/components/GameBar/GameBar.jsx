/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GameBar.css';
import { sendStartHp } from '../../store/gameReducer/reducer';

function GameBar() {
  const dispatch = useDispatch();
  const { startHp } = useSelector((state) => state.game);
  const {
    player, game, gamePlay, enemies,
  } = useSelector((state) => state.game);

  function findNum() {
    const proportinon = ((player.hp / startHp));
    return proportinon;
  }

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
          <p className="gamebar__progress__enemies__number">{`enemies: ${game.countEnemies}`}</p>
        </div>
        <div className="gamebar__center">
          <div
            className="gamebar__progress__hp"
            style={{ width: `${(findNum() * 100)}%` }}
          >
            <p className="gamebar__progress__number">{`${player.hp}💔`}</p>
          </div>
          <p className="gamebar__progress__number">lvl: 1000</p>
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
