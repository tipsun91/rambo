/* eslint-disable react/prop-types */
import React from 'react';

function Enemy({ enemy }) {
  return (
    <div
      className="enemy"
      style={{ transform: ` translate(${enemy.x}px, ${enemy.y}px)` }}
    >
      f
    </div>
  );
}

export default Enemy;
