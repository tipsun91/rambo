/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    player: {
      x: 0, // горизонталь
      y: 0, // вертикаль
      w: 20, // высота
      h: 20, // ширина
      speed: 1, // скорость передвижения
      hp: 1000, // здоровье
      weapon: ['trunk'],
      ammunition: [{ // боезапас
        trunk: 0,
      }],
    },
    enemies: [{
      id: 1,
      on: false,
      x: 600, // горизонталь
      y: 30, // вертикаль
      hp: 100, // здоровье
    }, {
      id: 2,
      on: false,
      x: 600, // горизонталь
      y: 80, // вертикаль
      hp: 100, // здоровье
    }, {
      id: 3,
      on: false,
      x: 600, // горизонталь
      y: 150, // вертикаль
      hp: 100, // здоровье
    }],
    weapon: [{
      name: 'trunk', // название
      damage: 50, // урон
      clip: 30, // обойма
      rateOfFire: 0.5, // скорострельность
      recharge: 1500, // время перезарядки
    }],
  },
  reducers: {
    updateFrame(state, action) {
      function calcPlayer() {
        if (action.payload.player.includes('ArrowRight')) {
          state.player.x += state.player.speed;// идем вправо
        }
        if (action.payload.player.includes('ArrowLeft')) {
          state.player.x -= state.player.speed;// идем влево
        }
        if (action.payload.player.includes('ArrowUp')) {
          state.player.y -= state.player.speed;// идем вверх
        }
        if (action.payload.player.includes('ArrowDown')) {
          state.player.y += state.player.speed;// идем вниз
        }
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
      calcEnemies(state.enemies, state.player);
      calcPlayer();
    },

  },
  extraReducers: {

  },
});

export const {
  updateFrame,
} = gameSlice.actions;

export default gameSlice.reducer;
