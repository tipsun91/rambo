import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Rating.css';

function Rating() {
  const { user } = useSelector((state) => state.user);
  console.log('🚀 ~ file: Rating.jsx ~ line 8 ~ Rating ~ user', user);
  return (
    <div className="center anim-show-rating">
      <h1>
        <span className="blue">TOP</span>
        <span className="yellow">USERS</span>
      </h1>

      <table className="container-rating">
        <thead>
          <tr>
            <th>
              <h1>Player</h1>
            </th>
            <th>
              <h1>Score</h1>
            </th>
            <th>
              <h1>Games</h1>
            </th>
            <th>
              <h1>Enemies</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Вован</td>
            <td>9518</td>
            <td>15</td>
            <td>567</td>
          </tr>
          <tr>
            <td>Дамир</td>
            <td>7326</td>
            <td>13</td>
            <td>444</td>
          </tr>
          <tr>
            <td>Саня</td>
            <td>4162</td>
            <td>9</td>
            <td>345</td>
          </tr>
          <tr>
            <td>Макс</td>
            <td>3654</td>
            <td>7</td>
            <td>342</td>
          </tr>
          <tr>
            <td>Абдула</td>
            <td>2002</td>
            <td>21</td>
            <td>556</td>
          </tr>
          <tr>
            <td>Паша</td>
            <td>4623</td>
            <td>11</td>
            <td>235</td>
          </tr>
        </tbody>
      </table>
      <div className="score-box-rating">
        <p className="score-rating" />
        <Link className="return-rating" to="/">
          &lt;&lt; НАЗАД
        </Link>
      </div>
    </div>
  );
}

export default Rating;
