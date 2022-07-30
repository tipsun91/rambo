/* eslint-disable react/prop-types */
import React from 'react';
import './Enemy_Style.css';

function Enemy({ enemy }) {
  return (
    <div
      className="enemy"
      style={{
        transform: ` translate(${enemy.x}px, ${enemy.y}px)`,
        width: `${enemy.w}px`,
        height: `${enemy.h}px`,
      }}
    >
      f
    </div>
  );
}

export default Enemy;
