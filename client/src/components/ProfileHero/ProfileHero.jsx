import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './profileHero.css';
import { updateHeroHp, updateHeroDamage, updateHeroSpeed } from '../../store/gameReducer/reducer';

function ProfileHero() {
  const dispatch = useDispatch();
  const { player } = useSelector((state) => state.game);
  console.log(player);
  function updateHP() {
    dispatch(updateHeroHp());
  }

  function updateDAMAGE() {
    dispatch(updateHeroDamage());
  }

  function updateSPEED(speed) {
    dispatch(updateHeroSpeed(speed));
  }
  return (
    <div>
      {
        player
          && (
            <>
              <span className="span-update">
                <div className="update">LVL</div>
                <div className="update">{player.lvl}</div>
              </span>
              <span className="span-update">
                <div className="update">HP</div>
                <div className="update">{player.hp}</div>
                <button onClick={updateHP} type="button" className="update btn-2 nes-btn is-primary">
                  100 💰
                </button>
              </span>
              <span className="span-update">
                <div className="update">DAMAGE</div>
                <div className="update">{player.damage}</div>
                <button onClick={updateDAMAGE} type="button" className="update btn-2 nes-btn is-primary">
                  100 💰
                </button>
              </span>
              <span className="span-update">
                <div className="update">SPEED</div>
                <div className="update">{player.speed}</div>
                <button onClick={() => updateSPEED(player.speed)} type="button" className="update btn-2 nes-btn is-primary">
                  100 💰
                </button>
              </span>
            </>
          )
      }
    </div>
  );
}

export default ProfileHero;
