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
  console.log(player.damage);

  useEffect(() => {
    dispatch(getPlayer());
  }, []);

  function updateHP() {
    if (user.money >= 100) {
      dispatch(updateHeroHp());
      dispatch(buy());
    }
  }

  function updateDAMAGE() {
    if (user.money >= 100) {
      dispatch(updateHeroDamage());
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
    <div className="nes-container is-rounded is-dark profile__wrapper">
      <h1>
        <span className="blue">UPGRADE</span>
        {' '}
        <span className="yellow">HERO!</span>
      </h1>
      <div className="form__wrapper">
        {
        player
          && (
            <>
              <span className="span-update">
                <div className="update">LVL</div>
                <div className="update">{player.lvl}</div>
              </span>
              <span className="span-update">
                <div className="update">
                  HP:
                  {' '}
                  {player.hp}
                </div>
                { user.money >= 100
                  ? (
                    <button onClick={updateHP} type="button" className="update btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                  )
                  : (
                    <button disabled type="button" className="update__button btn-2 nes-btn is-disabled">
                      нужны деньги
                    </button>
                  )}
              </span>
              <span className="span-update">
                <div className="update">
                  DAMAGE:
                  {' '}
                  {player.damage}
                </div>
                { user.money >= 100
                  ? (
                    <button onClick={updateDAMAGE} type="button" className="update__button btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                  )
                  : (
                    <button disabled type="button" className="update__button btn-2 nes-btn is-disabled">
                      нужны деньги
                    </button>
                  )}
              </span>
              <span className="span-update">
                <div className="update">
                  SPEED:
                  {' '}
                  {player.speed}
                </div>
                { user.money > 100 && player.speed < 10
                  && (
                    <button onClick={() => updateSPEED(player.speed)} type="button" className="update__button btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                  )}
                { user.money < 100 && player.speed < 10
                  && (
                    <button disabled type="button" className="update btn-2 nes-btn is-primary">
                      100 💰
                    </button>
                  )}
                {player.speed >= 10
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
    </div>
  );
}

export default ProfileHero;