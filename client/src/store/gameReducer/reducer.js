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
      w: 60, // высота
      h: 60, // ширина
      skin: '/animations/hero1.gif',
      move: 1,
      speed: 4, // скорость передвижения
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
    enemies: [ // массив врагов
      {
        id: 1,
        type: 1,
        w: 60, // высота
        h: 60, // ширина
        x: 500, // горизонталь
        y: 300, // вертикаль
        hp: 100, // здоровье
        speed: 0.7,
        damage: 5, // урон
        coolDown: 30, // скорость удара
        skin: '/animations/enemie0move.gif',
        move: 1,
      }, {
        id: 2,
        type: 1,
        w: 60, // высота
        h: 60, // ширина
        x: 300, // горизонталь
        y: 60, // вертикаль
        hp: 100, // здоровье
        speed: 0.7,
        damage: 5, // урон
        coolDown: 30, // скорость удара
        skin: '/animations/enemie0move.gif',
        move: 1,
      }, {
        id: 3,
        type: 1,
        w: 60, // высота
        h: 60, // ширина
        x: 400, // горизонталь
        y: 50, // вертикаль
        hp: 100, // здоровье
        speed: 0.7,
        damage: 5, // урон
        coolDown: 30, // скорость удара
        skin: '/animations/enemie0move.gif',
        move: 1,
      },
    ],
    enemies2: [
      {
        id: 1,
        type: 2,
        w: 80, // высота
        h: 80, // ширина
        x: 600, // горизонталь
        y: 45, // вертикаль
        hp: 100, // здоровье
        speed: 0.9,
        damage: 5, // урон
        coolDown: 20, // скорость удара
        skin: '/animations/enemie1move.gif',
        move: 1,
      }, {
        id: 2,
        type: 2,
        w: 80, // высота
        h: 80, // ширина
        x: 300, // горизонталь
        y: 70, // вертикаль
        hp: 100, // здоровье
        speed: 0.9,
        damage: 5, // урон
        coolDown: 20, // скорость удара
        skin: '/animations/enemie1move.gif',
        move: 1,
      }, {
        id: 3,
        type: 2,
        w: 80, // высота
        h: 80, // ширина
        x: 400, // горизонталь
        y: 40, // вертикаль
        hp: 100, // здоровье
        speed: 0.9,
        damage: 5, // урон
        coolDown: 20, // скорость удара
        skin: '/animations/enemie1move.gif',
        move: 1,
      },
    ],
    enemies3: [{
      id: 1,
      type: 3,
      w: 120, // высота
      h: 120, // ширина
      x: 600, // горизонталь
      y: 30, // вертикаль
      hp: 100, // здоровье
      speed: 0.7,
      damage: 5, // урон
      coolDown: 30, // скорость удара
      skin: '/animations/enemie2move.gif',
      move: 1,
    }, {
      id: 2,
      type: 3,
      w: 120, // высота
      h: 120, // ширина
      x: 300, // горизонталь
      y: 60, // вертикаль
      hp: 100, // здоровье
      speed: 0.7,
      damage: 5, // урон
      coolDown: 30, // скорость удара
      skin: '/animations/enemie2move.gif',
      move: 1,
    }, {
      id: 3,
      type: 3,
      w: 120, // высота
      h: 120, // ширина
      x: 400, // горизонталь
      y: 50, // вертикаль
      hp: 100, // здоровье
      speed: 0.7,
      damage: 5, // урон
      coolDown: 30, // скорость удара
      skin: '/animations/enemie2move.gif',
      move: 1,
    },
    ],
    enemies4: [
      {
        id: 1,
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
    ],
    weapon: { // НЕ ИСПОЛЬЗУЕТСЯ
      name: 'trunk', // название
      damage: 20, // урон
      clip: 30, // обойма
      rateOfFire: 0.5, // скорострельность
      recharge: 1500, // время перезарядки
    },
    bullets: [], // массив в который мы пушим пули
    game: { // объект для сбора статистики за игру
      countEnemies: 0,
      countMoney: 0,
      countDamage: 0,
      timeGame: 0,
      countWawes: 1,
    },
    gameLoop: 0, // игровой цик
    display: { // размеры экрана юзера
      width: 0,
      height: 0,
    },
    backgroundPositionLeft: 0, // начальные координаты локации
    calcEnemiesFlag: false, // ии врагов
    calcEnemiesFlag1: false, // ии врагов
  },
  reducers: {
    deleteAllEnemies(state, action) {
      state.enemies = [];
    },
    // логика движения игрока при смены локации чтобы он проходил в ворота
    updatePositionPlayer(state, action) {
      if (state.player.y < 600) {
        if (state.player.y !== 600) {
          state.player.y += 5;
        }
      } else if (state.player.y !== 600) {
        state.player.y -= 5;
      }
    },
    // передвигаем бэкграунд при прохождении первой волны
    updateBackgroundWawes2(state, action) {
      if (state.backgroundPositionLeft > -2600) {
        state.backgroundPositionLeft -= 10;
      }
    },
    // передвигаем бэкграунд при прохождении второй волны
    updateBackgroundWawes3(state, action) {
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
    updateWawes(state, action) {
      state.game.countWawes += 1;
    },
    updateFrame(state, action) {
      upGameLoop(state); // прибовляет 1 каждый цикл;
      calcEnemies(state, state.enemies, state.player); // рассчитывает поведение мобов
      // calcEnemies(state, state.enemies2, state.player);
      // calcEnemies(state, state.enemies3, state.player);
      // calcEnemies(state, state.enemies4, state.player);
      calcPlayer(state, action); // рассчитывает функционал героя, внутри скорость пуль по Х и У
      calcBullets(state); // рассчитыввает длинну полета пули
      calcCollisionsEnemie(state, state.enemies, state.player);
      // calcCollisionsEnemie(state, state.enemies2, state.player);
      // calcCollisionsEnemie(state, state.enemies3, state.player);
      // calcCollisionsEnemie(state, state.enemies4, state.player); // рассчит контакт героя и моба
      calcCollisionBullets(state, state.enemies);
      // calcCollisionBullets(state, state.enemies2);
      // calcCollisionBullets(state, state.enemies3);
      // calcCollisionBullets(state, state.enemies4); // рассчитывает контакт моба и пули
    },
  },
  extraReducers: {},
});

export const {
  display,
  updateFrame,
  updateWawes,
  updateEnemies,
  updateBackgroundWawes2,
  updateBackgroundWawes3,
  updatePositionPlayer,
  deleteAllEnemies,
} = gameSlice.actions;

export default gameSlice.reducer;
