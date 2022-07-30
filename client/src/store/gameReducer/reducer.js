/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    player: {
      x: 0, // горизонталь
      y: 0, // вертикаль
      w: 60, // высота
      h: 60, // ширина
      speed: 7, // скорость передвижения
      hp: 100, // здоровье
      weapon: ['trunk'],
      ammunition: [{ // боезапас
        trunk: 0,
      }],
    },
    enemies: [{
      id: 1,
      x: 600, // горизонталь
      y: 30, // вертикаль
      hp: 100, // здоровье
    }, {
      id: 2,
      x: 600, // горизонталь
      y: 80, // вертикаль
      hp: 100, // здоровье
    }],
    weapon: {
      name: 'trunk', // название
      damage: 20, // урон
      clip: 30, // обойма
      rateOfFire: 0.5, // скорострельность
      recharge: 1500, // время перезарядки
    },
    bullets: [],
  },
  reducers: {
    updateFrame(state, action) {
      function calcPlayer() {
        if (action.payload.player.includes('ArrowRight')) {
          state.player.x += state.player.speed; // идем вправо
        }
        if (action.payload.player.includes('ArrowLeft')) {
          state.player.x -= state.player.speed; // идем влево
        }
        if (action.payload.player.includes('ArrowUp')) {
          state.player.y -= state.player.speed; // идем вверх
        }
        if (action.payload.player.includes('ArrowDown')) {
          state.player.y += state.player.speed; // идем вниз
        }
        if (action.payload.player.includes(' ')) {
          state.bullets.push({
            id: uuidv4(),
            x: state.player.x,
            y: state.player.y,
            speed: 50,
            damage: state.weapon.damage,
          });
        }
        if (action.payload.player.includes('enemy')) {
          state.enemies.push({
            id: uuidv4(),
            x: 900, // горизонталь
            y: Math.floor(Math.random() * (600 - 100)) + 100, // вертикаль
            hp: 100, // здоровье
          });
        }
      }
      function calcBullets() {
        state.bullets.forEach((el) => {
          el.x += el.speed;
          if (el.x >= (state.player.x + 900)) {
            state.bullets.splice(el.id, 1);
          }
        });
      }
      function calcEnemies(arr, hero) {
        arr.forEach((el) => {
          if (hero.x >= el.x) {
            el.x += 1;
          }
          if (hero.x <= el.x) {
            el.x -= 1;
          }
          if (hero.y > el.y) {
            el.y += 0.35;
          }
          if (hero.y < el.y) {
            el.y -= 0.35;
          }
        });
      }

      function calcCollisionBullets() {
        state.bullets.forEach((bullet) => {
          state.enemies.forEach((enemy) => {
            if (bullet.x >= enemy.x
              && bullet.y >= (enemy.y - 20)
              && bullet.y <= (enemy.y + 20)) {
              console.log(enemy.hp);
              enemy.hp -= bullet.damage;
              state.bullets.splice(state.enemies.findIndex((el) => el.id === bullet.id), 1);
              if (enemy.hp <= 0) {
                state.enemies.splice(state.enemies.findIndex((el) => el.id === enemy.id), 1);
              }
            }
          });
        });
      }

      function calcCollisionEnemyes() {
        const playerPosX = state.player.x;
        const enemyPosX = state.enemies.x;
        const playerPosY = state.player.y;
        const enemyPosY = state.enemies.y;

        // console.log((playerPosX >= enemyPosX - 30 - 30) && (playerPosX <= enemyPosX + 30 + 30)
        // && (playerPosY <= enemyPosY + 120) && (playerPosY >= enemyPosY)); // log for collision

        // if ((playerPosX >= enemyPosX - 30 - 30) && (playerPosX <= enemyPosX + 30 + 30)
        // && (playerPosY <= enemyPosY + 120) && (playerPosY >= enemyPosY)) { // PVP Collision model
        // }
      }

      calcEnemies(state.enemies, state.player);
      calcPlayer();
      calcBullets();
      calcCollisionEnemyes();
      calcCollisionBullets();
    },
  },
  extraReducers: {},
});

export const { updateFrame } = gameSlice.actions;

export default gameSlice.reducer;
