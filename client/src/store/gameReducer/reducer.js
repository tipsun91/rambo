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
      x: 100,
      y: 50,
      hp: 100,
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
      function calePlayer() {
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
      calePlayer();
    },

  },
  extraReducers: {

  },
});

export const {
  updateFrame,
} = gameSlice.actions;

export default gameSlice.reducer;
