/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import calcBulletTrajectory from './calcBulletTrajectory';

function calcPlayer(state, action) {
  if (action.payload.player.includes('d')) {
    if (state.player.x < (state.display.width - state.player.w)) {
      state.player.x += state.player.speed; // идем вправо
    }
  }
  if (action.payload.player.includes('a')) {
    if (state.player.x > 0) {
      state.player.x -= state.player.speed; // идем влево
    }
  }
  if (action.payload.player.includes('w')) {
    if (state.player.y > 0) {
      state.player.y -= state.player.speed; // идем вверх
    }
  }
  if (action.payload.player.includes('s')) {
    if (state.player.y < (state.display.height - state.player.h)) {
      state.player.y += state.player.speed; // идем вниз
    }
  }

  if (action.payload.mouseCord.length > 0) {
    const [speedX, speedY] = calcBulletTrajectory(state, action); // скорость пуль по Х и У
    // console.log(speedX);
    // console.log(speedY);
    state.bullets.push({
      id: uuidv4(), // айди пули
      x: state.player.x, // координата хиро по Х
      y: state.player.y - state.player.h / 2, // координата хиро по У
      w: 12, // ширина пули
      h: 3, // высота пули
      speedX, // скорость пуль по Х
      speedY, // скорость пуль по У
      damage: state.weapon.damage, // нанисенный урон
    });
  }
  if (action.payload.player.includes('enemy')) { // рожаем врагов
    const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
    if (randomNum < 6) {
      state.enemies.push({
        id: uuidv4(),
        x: state.display.width + 50,
        y: Math.floor(Math.random() * (state.display.height - 100)) + 100, // вертикаль
        w: 30, // высота
        h: 30, // ширина
        hp: 100, // здоровье
        damage: 5, // урон
        coolDown: 30, // скорость удара
      });
    } else {
      state.enemies.push({
        id: uuidv4(),
        x: -60, // Math.floor(Math.random() * ((-30) - (-50))) + (-50), // горизонталь
        y: Math.floor(Math.random() * (300 - 100)) + 50, // вертикаль
        w: 30, // высота
        h: 30, // ширина
        hp: 100, // здоровье
        damage: 5, // урон
        coolDown: 30, // скорость удара
      });
    }
  }
}

export default calcPlayer;
