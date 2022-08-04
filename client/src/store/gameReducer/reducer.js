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
import calcGoldCoin from './functions/calcGoldCoin';

export const getPlayer = createAsyncThunk(
  '/hero/getPlayer',
  async (_, { rejectWithValue }) => {
    try {
      const responce = await fetch('/hero/getPlayer', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateHeroHp = createAsyncThunk(
  '/hero/updateHp',
  async (_, { rejectWithValue }) => {
    try {
      const responce = await fetch('/hero/updateHp', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await responce.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateHeroDamage = createAsyncThunk(
  '/hero/updateDamage',
  async (_, { rejectWithValue }) => {
    try {
      const responce = await fetch('/hero/updateDamage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateHeroSpeed = createAsyncThunk(
  '/hero/updateSpeed',
  async (speed, { rejectWithValue }) => {
    try {
      const responce = await fetch('/hero/updateSpeed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          speed,
        }),
      });
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const sendStatistic = createAsyncThunk(
  '/api/statistics/',
  async (statGame, { rejectWithValue }) => {
    try {
      const responce = await fetch('/api/statistics/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countEnemies: statGame.countEnemies,
          countMoney: statGame.countMoney,
          countDamage: statGame.countDamage,
          countWaves: statGame.countWaves,
          timeGame: statGame.timeGame,
        }),
        credentials: 'include',
      });
      const data = await responce.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const userAllStats = createAsyncThunk(
  '/api/statistics',
  async (event, { rejectWithValue }) => {
    try {
      const responce = await fetch('/api/statistics', {
        method: 'GET',
      });
      const data = await responce.json();
      console.log('🚀 data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gamePlay: {
      waves1: 5, // кол-во мобов
      waves1Count: 0,
      waves2: 5, // кол-во мобов
      waves2Count: 0,
      waves3: 5, // кол-во мобов
      waves3Count: 0,
    },
    player: {
      // Client only
      x: 0, // горизонталь
      y: 500, // вертикаль
      w: 180, // высота
      h: 180, // ширина
      skin: '/animations/hero1.gif',
      move: 1,
      weapon: ['trunk'],
      ammunition: [
        {
          // боезапас
          trunk: 0,
        },
      ],
    },
    statistic: [],
    enemies: [], // массив врагов
    enemies1: {
      type: 1,
      w: 120, // высота
      h: 120, // ширина
      x: 500, // горизонталь
      y: 300, // вертикаль
      hp: 100, // здоровье
      speed: 1.3, // скорость
      damage: 5, // урон
      coolDown: 30, // скорость удара
      skin: '/animations/enemie0move.gif',
      move: 1,
    },
    enemies2: {
      type: 2,
      w: 180, // высота
      h: 180, // ширина
      x: 600, // горизонталь
      y: 45, // вертикаль
      hp: 100, // здоровье
      speed: 0.9, // скорость
      damage: 5, // урон
      coolDown: 20, // скорость удара
      skin: '/animations/enemie1move.gif',
      move: 1,
    },
    enemies3: {
      type: 3,
      w: 200, // высота
      h: 200, // ширина
      x: 600, // горизонталь
      y: 30, // вертикаль
      hp: 100, // здоровье
      speed: 1.2,
      damage: 5, // урон
      coolDown: 30, // скорость удара
      skin: '/animations/enemie2move.gif',
      move: 1,
    },
    enemies4: {
      type: 4,
      w: 180, // высота
      h: 180, // ширина
      x: 400, // горизонталь
      y: 50, // вертикаль
      hp: 500, // здоровье
      speed: 0.7,
      damage: 5, // урон
      coolDown: 30, // скорость удара
      skin: '/animations/enemie3move.gif',
      move: 1,
    },
    weapon: {
      // НЕ ИСПОЛЬЗУЕТСЯ
      name: 'trunk', // название
      damage: 20, // урон
      clip: 30, // обойма
      rateOfFire: 0.5, // скорострельность
      recharge: 1500, // время перезарядки
    },
    gold: {
      id: 1,
      x: 50,
      y: 70,
      h: 50,
      w: 50,
      skin: '/animations/gold.gif',
    },
    golds: [
      {
        id: 1,
        x: 400,
        y: 70,
        h: 50,
        w: 50,
        skin: '/animations/gold.gif',
      },
    ],
    bullets: [], // массив в который мы пушим пули
    game: {
      // объект для сбора статистики за игру
      countEnemies: 0,
      countMoney: 0,
      countDamage: 0,
      timeGame: 0,
      countWaves: 1,
    },
    gameLoop: 0, // игровой цик
    display: {
      // размеры экрана юзера
      width: 0,
      height: 0,
    },
    backgroundPositionLeft: 0, // начальные координаты локации
    calcEnemiesFlag: false, // ии врагов
    calcEnemiesFlag1: false, // ии врагов
  },
  reducers: {
    deleteAllGolds(state, action) {
      state.golds = [];
    },
    deleteAllEnemies(state, action) {
      state.enemies = [];
    },
    // логика движения игрока при смены локации чтобы он проходил в ворота
    updatePositionPlayer(state, action) {
      if (state.player.y < 450) {
        if (state.player.y !== 450) {
          state.player.y += 5;
        }
      } else if (state.player.y !== 600) {
        state.player.y -= 5;
      }
    },
    // передвигаем бэкграунд при прохождении первой волны
    updateBackgroundWaves2(state, action) {
      if (state.backgroundPositionLeft > -2600) {
        state.backgroundPositionLeft -= 10;
      }
    },
    // передвигаем бэкграунд при прохождении второй волны
    updateBackgroundWaves3(state, action) {
      if (state.backgroundPositionLeft > -5600) {
        state.backgroundPositionLeft -= 10;
      }
    },
    // увеличиваем характеристики врагов
    updateEnemies(state, action) {
      state.enemies.forEach((el) => {
        el.hp *= 1.2;
        el.damage *= 1.2;
        el.coolDown *= 1.2;
      });
    },
    // записываем координаты экрана юзера
    display(state, action) {
      state.display.height = action.payload.height;
      state.display.width = action.payload.width;
    },
    // обновляем игроавую волну
    updateWaves(state, action) {
      state.game.countWaves += 1;
    },
    updateFrame(state, action) {
      // console.log(state.player.x);
      upGameLoop(state); // прибовляет 1 каждый цикл;
      calcEnemies(state, state.enemies, state.player); // рассчитывает поведение мобов
      calcPlayer(state, action); // рассчитывает функционал героя, внутри скорость пуль по Х и У
      calcBullets(state); // рассчитыввает длинну полета пули
      calcCollisionsEnemie(state, state.enemies, state.player); // рассчит контакт героя и моба
      calcCollisionBullets(state, state.enemies); // рассчитывает контакт моба и пули
      calcGoldCoin(state, state.golds, state.player);
    },
  },
  extraReducers: {
    [getPlayer.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getPlayer.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.player = { ...state.player, ...action.payload.player };
    },
    [updateHeroHp.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [updateHeroHp.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.player.hp = action.payload.hp;
    },
    [updateHeroDamage.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [updateHeroDamage.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.player.damage = action.payload.damage;
    },
    [updateHeroSpeed.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [updateHeroSpeed.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.player.speed = action.payload.speed;
    },
    [userAllStats.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [userAllStats.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.statistic = action.payload.statistics;
    },
  },
});

export const {
  display,
  updateFrame,
  updateWaves,
  updateEnemies,
  updateBackgroundWaves2,
  updateBackgroundWaves3,
  updatePositionPlayer,
  deleteAllEnemies,
  deleteAllGolds,
} = gameSlice.actions;

export default gameSlice.reducer;
