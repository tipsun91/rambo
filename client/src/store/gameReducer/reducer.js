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
      on: false,
      x: 600, // горизонталь
      y: 30, // вертикаль
      hp: 100, // здоровье
      damage: 1, // урон
    }, {
      id: 2,
      w: 30, // высота
      h: 30, // ширина
      on: false,
      x: 600, // горизонталь
      y: 80, // вертикаль
      hp: 100, // здоровье
      damage: 1, // урон
    }, {
      id: 3,
      w: 30, // высота
      h: 30, // ширина
      on: false,
      x: 600, // горизонталь
      y: 150, // вертикаль
      hp: 100, // здоровье
      damage: 1, // урон
    }],
    weapon: [{
      name: 'trunk', // название
      damage: 50, // урон
      clip: 30, // обойма
      rateOfFire: 0.5, // скорострельность
      recharge: 1500, // время перезарядки
    }],
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
          // console.log(action.payload.player.every((el) => el === ' '));
          state.bullets.push({
            id: uuidv4(), x: state.player.x, y: state.player.y - state.player.h / 2, speed: 50,
          });
        }
      }
      function calcBullets() {
        state.bullets.forEach((el) => {
          el.x += el.speed;
          if (el.x >= (state.player.x + 700)) {
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
      calcEnemies(state.enemies, state.player);
      calcPlayer();
      calcBullets();
      calcCollisionsEnemie(state.enemies, state.player);
    },
  },
  extraReducers: {},
});

export const { updateFrame } = gameSlice.actions;

export default gameSlice.reducer;
