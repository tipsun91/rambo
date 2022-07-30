/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    player: {
      playerSkin: '/img/222.gif',
      x: 0,
      y: 0,
      speed: 1,
    },
    enemies: [{
      x: 100,
      y: 50,
      hp: 100,
    }],
    bullets: [],
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
        if (action.payload.player.includes(' ')) {
          // console.log(action.payload.player.every((el) => el === ' '));
          state.bullets.push({
            id: uuidv4(), x: state.player.x, y: state.player.y, speed: 50,
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
      calcBullets();
      calePlayer();
    },
  },
  extraReducers: {

  },
});

export const {
  updateFrame,
  calcBullets,
} = gameSlice.actions;

export default gameSlice.reducer;
