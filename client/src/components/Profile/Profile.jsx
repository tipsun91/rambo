import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/userReducer/reducer';
import './Profile.css';

export default function Profile() {
  const dispatch = useDispatch();
  const editProfileForm = useRef();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(editUser(event));
    },
    [editProfileForm],
  );

  return (
    <div className="container__stats anim-show-profile flex">
      <div className="profile__wrapper">
        <div className="user-profile">
          <img
            className="avatar"
            src="https://cdnn11.img.sputnik.by/img/07e5/07/06/1054427663_79:0:979:900_1920x0_80_0_0_7d61a9785aa88b97857d3414f37ba600.jpg"
            alt="Ash"
          />
          <div className="username">Rembo</div>
          <div className="edit-profile">
            <input
              required
              className="edit-avatar"
              name="file"
              type="file"
              defaultValue=""
            />
          </div>
        </div>
        <div className="edit-user-profile">
          <form className="edit-form" ref={editProfileForm} onSubmit={onSubmit}>
            <div className="edit-profile">
              <input
                required
                autoComplete="off"
                name="name"
                type="name"
                placeholder="Name"
                defaultValue=""
              />
            </div>
            <div className="edit-profile">
              <input
                required
                autoComplete="off"
                name="email"
                type="email"
                placeholder="Email"
                defaultValue=""
              />
            </div>
            <div className="edit-profile">
              <input
                required
                autoComplete="off"
                name="passoword"
                type="password"
                placeholder="Password"
                defaultValue=""
              />
            </div>
            <button type="submit" className="btn-2 nes-btn is-primary">
              Изменить данные
            </button>
          </form>
        </div>
      </div>
      <div className="body">
        <table className="container__profile">
          <thead>
            <tr>
              <th>
                <h1>Уровень</h1>
              </th>
              <th>
                <h1>Очки</h1>
              </th>
              <th>
                <h1>Золото</h1>
              </th>
              <th>
                <h1>Убийства</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>100</td>
              <td>200</td>
              <td>300</td>
              <td>400</td>
            </tr>
          </tbody>
        </table>
        <table className="container__profile">
          <thead>
            <tr>
              <th>
                <h1>Игр сыграно</h1>
              </th>
              <th>
                <h1>Время в игре</h1>
              </th>
              <th>
                <h1>Победы %</h1>
              </th>
              <th>
                <h1>Средний урон</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>500</td>
              <td>600</td>
              <td>700</td>
              <td>800</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="score-box-profile">
        <p className="score-profile" />
        <Link className="return-profile" to="/game">
          &lt;&lt; НАЗАД
        </Link>
      </div>
    </div>
  );
}
