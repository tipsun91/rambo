/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
      });
      const data = await responce.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    player: {
      x: 0, // горизонталь
      y: 0, // вертикаль
      w: 30, // высота
      h: 30, // ширина
      speed: 3, // скорость передвижения
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
      {
        id: 2,
        w: 30, // высота
        h: 30, // ширина
        x: 600, // горизонталь
        y: 80, // вертикаль
        hp: 100, // здоровье
        damage: 5, // урон
        coolDown: 30,
      },
      {
        id: 3,
        w: 30, // высота
        h: 30, // ширина
        x: 400, // горизонталь
        y: 150, // вертикаль
        hp: 100, // здоровье
        damage: 5, // урон
        coolDown: 30,
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
      countWawes: 0,
    },
    gameLoop: 0,
  },
  reducers: {
    updateFrame(state, action) {
      function upGameLoop() {
        state.gameLoop += 1;
      }
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
            x: Math.floor(Math.random() * (1400 - 1200)) + 1200, // горизонталь
            y: Math.floor(Math.random() * (300 - 100)) + 50, // вертикаль
            w: 30, // высота
            h: 30, // ширина
            hp: 100, // здоровье
            damage: 5, // урон
            coolDown: 30, // скорость удара
          });
        }
      }
      function calcBullets() {
        state.bullets.forEach((el) => {
          el.x += el.speed;
          if (el.x >= state.player.x + 900) {
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
          if (
            hero.x + hero.w / 2 >= enemie.x - enemie.w / 2 &&
            hero.x - hero.w / 2 <= enemie.x + enemie.w / 2 &&
            hero.y - hero.h <= enemie.y + enemie.h &&
            hero.y >= enemie.y
          ) {
            // hero.hp -= randomDamage([0, 0, 0, 0, enemie.damage, 0, 0, 0, 0]);
            if (state.gameLoop % enemie.coolDown === 0) {
              hero.hp -= enemie.damage;
            }
            enemie.hp -= hero.damage; // PVP damage
            hero.damagevalue += hero.damage; // counts pvp damage into GameBar !
            if (enemie.hp <= 0) {
              state.enemies.splice(
                state.enemies.findIndex((el) => el.id === enemie.id),
                1
              ); // enemy die
            }
          }
        });
      }
      function calcCollisionBullets() {
        state.bullets.forEach((bullet) => {
          state.enemies.forEach((enemy) => {
            if (enemy.x > state.player.x) {
              if (
                bullet.x >= enemy.x &&
                bullet.y >= enemy.y &&
                bullet.y <= enemy.y + state.player.w
              ) {
                enemy.hp -= bullet.damage;
                state.game.countDamage += bullet.damage;
                // console.log(state.game.countDamage);
                state.bullets.splice(
                  state.enemies.findIndex((el) => el.id === bullet.id),
                  1
                );
                if (enemy.hp <= 0) {
                  state.game.countEnemies += 1;
                  state.game.countMoney += 15;
                  state.enemies.splice(
                    state.enemies.findIndex((el) => el.id === enemy.id),
                    1
                  );
                }
              }
            }
          });
        });
      }
      upGameLoop();
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
