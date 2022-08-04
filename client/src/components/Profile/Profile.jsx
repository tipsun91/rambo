import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../store/userReducer/reducer';
import './Profile.css';

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const editProfileForm = useRef();

  // функция преобразования секунд в формат 00:00:00
  function format(seconds) {
    const s = (seconds % 60).toString();
    const m = Math.floor((seconds / 60) % 60).toString();
    const h = Math.floor((seconds / 60 / 60) % 60).toString();
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
  }
  console.log(format(100));

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
          <div className="username">{user.name}</div>
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
        <div className="edit-user-profile nes-container is-rounded">
          <form className="edit-form" ref={editProfileForm} onSubmit={onSubmit}>
            <div className="edit-profile">
              <input
                required
                autoComplete="off"
                name="name"
                type="name"
                placeholder="Name"
                defaultValue={user.name}
                style={{ color: 'black' }}
              />
            </div>
            <div className="edit-profile">
              <input
                required
                autoComplete="off"
                name="email"
                type="email"
                placeholder="Email"
                defaultValue={user.email}
                style={{ color: 'black' }}
              />
            </div>
            <div className="edit-profile">
              <input
                required
                autoComplete="off"
                name="password"
                type="password"
                placeholder="New password"
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
        <Link className="return-profile" to="/">
          &lt;&lt; НАЗАД
        </Link>
      </div>
    </div>
  );
}
