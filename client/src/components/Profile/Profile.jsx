import React from 'react';
import './Profile.css';

export default function Profile() {
  return (
    <div className="container__stats anim-show-profile">
      <div className="user-profile">
        <img
          className="avatar"
          src="https://cdnn11.img.sputnik.by/img/07e5/07/06/1054427663_79:0:979:900_1920x0_80_0_0_7d61a9785aa88b97857d3414f37ba600.jpg"
          alt="Ash"
        />
        <div className="username">Rembo</div>
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
        <a className="return-profile" href="/">
          &lt;&lt; НАЗАД
        </a>
      </div>
    </div>
  );
}
