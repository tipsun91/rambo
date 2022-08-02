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
        <span className="gamebar__progress__number">{`${player.hp}💔`}</span>
        <span className="gamebar__progress__damage__number">{`🎯${game.countDamage}`}</span>
        <span className="gamebar__progress__enemies__number">{`👻${game.countEnemies}`}</span>
        <span className="gamebar__progress__waves__number">{`Волна:${game.countWawes}`}</span>
        {/* <div
          className="gamebar__progress__experience"
          style={{ width: `${player.experience}px` }}
        /> */}
        {/* <span className="gamebar__progress__experience__number">
        {`⭐${player.experience}`}</span> */}
        <span className="gamebar__progress__money__number">{`🥮${game.countMoney}`}</span>

      </div>
    </div>
  );
}

export default GameBar;
