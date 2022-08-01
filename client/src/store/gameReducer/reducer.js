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
import upGameLoop from './functions/upGameLoop';

export const sendStatistic = createAsyncThunk(
  '/api/statistics',
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
    enemies: [
      {
        id: 1,
        w: 30, // высота
        h: 30, // ширина
        x: 600, // горизонталь
        y: 30, // вертикаль
        hp: 100, // здоровье
        damage: 5, // урон
        coolDown: 30, // скорость удара
      },
    ],
    weapon: {
      name: 'trunk', // название
      damage: 20, // урон
      clip: 30, // обойма
      rateOfFire: 0.5, // скорострельность
      recharge: 1500, // время перезарядки
    },
    bullets: [],
    game: {
      countEnemies: 0,
      countMoney: 0,
      countDamage: 0,
      timeGame: 0,
      countWawes: 1,
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
    updateEnemies(state, action) {
      state.enemies.forEach((el) => {
        el.hp *= 1.2;
        el.damage *= 1.2;
        el.coolDown *= 1.2;
      });
    },
    display(state, action) {
      state.display.height = action.payload.height;
      state.display.width = action.payload.width;
    },
    updateWawes(state, action) {
      state.game.countWawes += 1;
    },
    updateFrame(state, action) {
      upGameLoop(state); // прибовляет 1 каждый цикл;
      calcEnemies(state, state.enemies, state.player); // рассчитывает поведение мобов
      calcPlayer(state, action); // рассчитывает функционал героя, внутри скорость пуль по Х и У
      calcBullets(state); // рассчитыввает длинну полета пули
      calcCollisionsEnemie(state, state.enemies, state.player); // рассчитывает контакт героя и моба
      calcCollisionBullets(state); // рассчитывает контакт моба и пули
    },
  },
  extraReducers: {},
});

export const {
  display, updateFrame, updateWawes, updateEnemies,
} = gameSlice.actions;

export default gameSlice.reducer;
