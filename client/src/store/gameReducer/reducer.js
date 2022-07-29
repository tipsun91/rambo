/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    player: {
      playerSkin: '/img/222.gif',
      x: 0,
      y: 0,
      speed: 10,
      hp: 100,
    },
    enemies: [
      {
        x: 100,
        y: 50,
        speed: 10,
        hp: 100,
      },
    ],
  },
  reducers: {
    updateFrame(state, action) {
      function calePlayer() {
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
      }
      calePlayer();
    },
  },
  extraReducers: {},
});

export const { updateFrame } = gameSlice.actions;

export default gameSlice.reducer;
