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
      w: 30, // высота
      h: 30, // ширина
      speed: 7, // скорость передвижения
      hp: 100, // здоровье
      weapon: ['trunk'],
      ammunition: [{ // боезапас
        trunk: 0,
      }],
    },
    enemies: [{
      id: 1,
      w: 30, // высота
      h: 30, // ширина
      x: 600, // горизонталь
      y: 30, // вертикаль
      hp: 100, // здоровье
      damage: 1, // урон
    }, {
      id: 2,
      w: 30, // высота
      h: 30, // ширина
      x: 600, // горизонталь
      y: 80, // вертикаль
      hp: 100, // здоровье
      damage: 1, // урон
    }, {
      id: 3,
      w: 30, // высота
      h: 30, // ширина
      x: 600, // горизонталь
      y: 150, // вертикаль
      hp: 100, // здоровье
      damage: 1, // урон
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
            y: state.player.y - state.player.h / 2,
            speed: 50,
            damage: state.weapon.damage,
          });
        }
        if (action.payload.player.includes('enemy')) {
          state.enemies.push({
            id: uuidv4(),
            w: 30,
            h: 30,
            x: 900, // горизонталь
            y: Math.floor(Math.random() * (600 - 100)) + 100, // вертикаль
            hp: 100, // здоровье
            damage: 1,
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

      function calcCollisionsEnemie(arr, hero) {
        function randomDamage(arrX) {
          const num = Math.floor(Math.random() * arrX.length);
          return arrX[num];
        }
        arr.forEach((enemie) => {
          if ((hero.x + hero.w / 2 >= enemie.x - enemie.w / 2)
            && (hero.x - hero.w / 2 <= enemie.x + enemie.w / 2)
            && (hero.y - hero.h <= enemie.y + enemie.h)
            && (hero.y >= enemie.y)) {
            hero.hp -= randomDamage([0, 0, 0, 0, enemie.damage, 0, 0, 0, 0]);
          }
        });
      }
      function calcCollisionBullets() {
        state.bullets.forEach((bullet) => {
          state.enemies.forEach((enemy) => {
            if (bullet.x >= enemy.x
              && bullet.y >= (enemy.y - 20)
              && bullet.y <= (enemy.y + 20)) {
              enemy.hp -= bullet.damage;
              state.bullets.splice(state.enemies.findIndex((el) => el.id === bullet.id), 1);
              if (enemy.hp <= 0) {
                state.enemies.splice(state.enemies.findIndex((el) => el.id === enemy.id), 1);
              }
            }
          });
        });
      }

      calcEnemies(state.enemies, state.player);
      calcPlayer();
      calcBullets();
      calcCollisionsEnemie(state.enemies, state.player);
      calcCollisionBullets();
    },
  },
  extraReducers: {},
});

export const { updateFrame } = gameSlice.actions;

export default gameSlice.reducer;
