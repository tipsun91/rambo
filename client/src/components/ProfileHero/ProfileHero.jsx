import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlayer,
  updateHeroHp,
  updateHeroDamage,
  updateHeroSpeed,
} from '../../store/gameReducer/reducer';
import { buy } from '../../store/userReducer/reducer';
import './profileHero.css';

function ProfileHero() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { player } = useSelector((state) => state.game);
  console.log(user.money);

  useEffect(() => {
    dispatch(getPlayer());
  }, []);

  console.log(user);
  function updateHP() {
    dispatch(updateHeroHp());
    if (user.money > 100) {
      dispatch(buy());
    }
  }

  function updateDAMAGE() {
    dispatch(updateHeroDamage());
    if (user.money > 100) {
      dispatch(buy());
    }
  }

  function updateSPEED(speed) {
    dispatch(updateHeroSpeed(speed));
    if (user.money > 100 && player.speed >= 10) {
      dispatch(buy());
    }
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
                { user.money > 100
                  ? (
                    <button onClick={updateHP} type="button" className="update btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                  )
                  : (
                    <button disabled type="button" className="update btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                  )}
              </span>
              <span className="span-update">
                <div className="update">DAMAGE</div>
                <div className="update">{player.damage}</div>
                { user.money > 100
                  ? (
                    <button onClick={updateDAMAGE} type="button" className="update btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                  )
                  : (
                    <button disabled type="button" className="update btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                  )}
              </span>
              <span className="span-update">
                <div className="update">SPEED</div>
                <div className="update">{player.speed}</div>
                { user.money > 100 && player.speed < 10
                  && (
                    <button onClick={() => updateSPEED(player.speed)} type="button" className="update btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                  )}
                {user.money < 100
                    && (
                    <button disabled type="button" className="update btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                    )}
                {player.speed === 10
                    && (
                    <button disabled type="button" className="update btn-2 nes-btn is-primary">
                      Макс
                    </button>
                    )}
              </span>
            </>
          )
      }
    </div>
  );
}

export default ProfileHero;
