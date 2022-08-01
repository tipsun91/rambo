/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import calcPlayer from './functions/calcPlayer';
import calcBullets from './functions/calcBullets';
import calcEnemies from './functions/calcEnemies';
import calcCollisionsEnemie from './functions/calcCollisionsEnemie';
import calcCollisionBullets from './functions/calcCollisionBullets';

export const sendStatistic = createAsyncThunk(
  'api/statistics',
  async (statGame, { rejectWithValue }) => {
    try {
      const responce = await fetch('/api/statistics', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countEnemies: statGame.countEnemies,
          countMoney: statGame.countMoney,
          countDamage: statGame.countDamage,
          countWawes: statGame.countWawes,
          timeGame: statGame.timeGame,
        }),
        credentials: true,
      });
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    player: {
      x: 0, // горизонталь
      y: 100, // вертикаль
      w: 30, // высота
      h: 30, // ширина
      speed: 5, // скорость передвижения
      hp: 100, // здоровье
      damage: 2, // урон
      weapon: ['trunk'],
      ammunition: [
        {
          // боезапас
          trunk: 0,
        },
      ],
    },
    enemies: [{
      id: 1,
      w: 30, // высота
      h: 30, // ширина
      x: 600, // горизонталь
      y: 30, // вертикаль
      hp: 100, // здоровье
      damage: 5, // урон
      coolDown: 30, // скорость удара
    }],
    weapon: {
      name: 'trunk', // название
      damage: 20, // урон
      clip: 30, // обойма
      rateOfFire: 0.5, // скорострельность
      recharge: 1500, // время перезарядки
    },
    bullets: [],
    game: {
      countEnemies: 0, // кол-во убитых мобов
      countMoney: 0, // кол-во заработаных денег
      countDamage: 0, // кол-во нанесеного урона
      timeGame: 0, // кол-во время в игре
      countWawes: 0, // кол-во пройденых волн
    },
    gameLoop: 0, // игровой цик
    display: {
      width: 0,
      height: 0,
    },
    calcEnemiesFlag: false, // ии врагов
    calcEnemiesFlag1: false, // ии врагов
  },
  reducers: {
    display(state, action) {
      state.display.height = action.payload.height;
      state.display.width = action.payload.width;
    },
    updateWawes(state, action) {
      state.game.countWawes = action.payload;
    },
    updateFrame(state, action) {
      function upGameLoop() { // прибовляет 1 каждый цикл
        state.gameLoop += 1;
      }
      upGameLoop();
      calcEnemies(state, state.enemies, state.player); // рассчитывает поведение мобов
      calcPlayer(state, action); // рассчитывает функционал героя, внутри скорость пуль по Х и У
      calcBullets(state); // рассчитыввает длинну полета пули
      calcCollisionsEnemie(state, state.enemies, state.player); // рассчитывает контакт героя и моба
      calcCollisionBullets(state); // рассчитывает контакт моба и пули
    },
  },
  extraReducers: {},
});

export const { display, updateFrame, updateWawes } = gameSlice.actions;

export default gameSlice.reducer;
