/* eslint-disable react/prop-types */
import React from 'react';
import './Enemy_Style.css';

function Enemy({ enemy }) {
  return (
    <div
      className="enemy"
      style={{ height: '20px', width: '20px', transform: ` translate(${enemy.x}px, ${enemy.y}px)` }}
    >
      f
    </div>
  );
}

export default Enemy;
