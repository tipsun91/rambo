/* eslint-disable react/prop-types */
import React from 'react';
import './Enemy_Style.css';

function Enemy({ enemy }) {
  return (
    <div
      className="enemy"
      style={{
        transform: ` translate(${enemy.x}px, ${enemy.y}px) scale(${enemy.move}, 1)`,
        width: `${enemy.w}px`,
        height: `${enemy.h}px`,
      }}
    >
      <img
        src={`${enemy.skin}`} // скин врака
        alt={`${enemy.move}`} // зеркалим скин
      />
    </div>
  );
}

export default Enemy;
