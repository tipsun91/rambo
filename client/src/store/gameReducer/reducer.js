/* eslint-disable no-mixed-operators */
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
      countWawes: 0,
    },
    gameLoop: 0,
    display: {
      width: 0,
      height: 0,
    },
    calcEnemiesFlag: false,
    calcEnemiesFlag1: false,
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
      function upGameLoop() {
        state.gameLoop += 1;
      }
      function GANGBANG360(hero) {
        const codrX = action.payload.mouseCord[0];
        const codrY = action.payload.mouseCord[1];
        const speed = 50;
        const heroX = hero.x;
        const heroY = hero.y;
        const dX = codrX - heroX;
        const dY = codrY - heroY;
        const hypotenuse = Math.sqrt(Math.floor(dX ** 2) + Math.floor(dY ** 2));
        const speedX = speed / Math.floor(hypotenuse) * dX;
        const speedY = speed / Math.floor(hypotenuse) * dY;
        return [speedX, speedY];
      }
      function calcPlayer() {
        if (action.payload.player.includes('ArrowRight')) {
          if (state.player.x < state.display.width - state.player.w) {
            state.player.x += state.player.speed; // идем вправо
          }
        }
        if (action.payload.player.includes('ArrowLeft')) {
          if (state.player.x > 0) {
            state.player.x -= state.player.speed; // идем влево
          }
        }
        if (action.payload.player.includes('ArrowUp')) {
          if (state.player.y > 0) {
            state.player.y -= state.player.speed; // идем вверх
          }
        }
        if (action.payload.player.includes('ArrowDown')) {
          if (state.player.y < state.display.height - state.player.h) {
            state.player.y += state.player.speed; // идем вниз
          }
        }
        // if (action.payload.player.includes(' ')) {
        //   state.bullets.push({
        //     id: uuidv4(),
        //     x: state.player.x,
        //     y: state.player.y - state.player.h / 2,
        //     speed: 50,
        //     damage: state.weapon.damage,
        //   });
        // }

        if (action.payload.mouseCord.length > 0) {
          // console.log(action.payload.mouseCord[1]);
          // console.log(action.payload.mouseCord[0]);
          const [speedX, speedY] = GANGBANG360(state.player);
          // console.log(speedX);
          // console.log(speedY);
          state.bullets.push({
            id: uuidv4(),
            x: state.player.x,
            y: state.player.y - state.player.h / 2,
            w: 12,
            h: 3,
            speedX,
            speedY,
            damage: state.weapon.damage,
          });
        }
        if (action.payload.player.includes('enemy')) {
          const randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
          if (randomNum < 6) {
            state.enemies.push({
              id: uuidv4(),
              x: state.display.width + 50,
              y: Math.floor(Math.random() * (state.display.height - 100)) + 100, // вертикаль
              w: 30, // высота
              h: 30, // ширина
              hp: 100, // здоровье
              damage: 5, // урон
              coolDown: 30, // скорость удара
            });
          } else {
            state.enemies.push({
              id: uuidv4(),
              x: -60, // Math.floor(Math.random() * ((-30) - (-50))) + (-50), // горизонталь
              y: Math.floor(Math.random() * (300 - 100)) + 50, // вертикаль
              w: 30, // высота
              h: 30, // ширина
              hp: 100, // здоровье
              damage: 5, // урон
              coolDown: 30, // скорость удара
            });
          }
        }
      }
      function calcBullets() {
        state.bullets.forEach((el) => {
          el.x += el.speedX;
          el.y += el.speedY;
          if (el.x >= state.player.x + 1200) {
            state.bullets.splice(el.id, 1);
          }
        });
      }
      function calcEnemies(arr, hero) {
        function randomFlag() {
          const arrFlag = [true, false];
          const flag = Math.floor(Math.random() * arrFlag.length);
          return arrFlag[flag];
        }
        arr.forEach((el) => {
          // if (hero.x <= el.x) {
          // let q = false;
          //   const time = 400;
          //   const distances = el.x - hero.x;
          //   const wave = 10;
          //   const waveAmount = distances / wave;
          //   const timeLoop = state.gameLoop;
          //   el.x -= 1;
          function randomNumLoop() {
            const arrr = [70, 110, 150];
            const flag = Math.floor(Math.random() * arrr.length);
            return arrr[flag];
          }
          function randomCord(heroXY) {
            const arrCord = [
              [heroXY.x, heroXY.y - heroXY.w * 2],
              [heroXY.x + heroXY.w, heroXY.y - heroXY.w],
              [heroXY.x, heroXY.y],
              [heroXY.x - heroXY.h, heroXY.y - heroXY.w],
            ];
            const cord = Math.floor(Math.random() * arrCord.length);
            return arrCord[cord];
          }
          if (hero.x - el.x < -50) {
            if (state.gameLoop % randomNumLoop() === 0) {
              state.calcEnemiesFlag = !state.calcEnemiesFlag;
            }
            if (state.calcEnemiesFlag) {
              if (state.calcEnemiesFlag1) {
                el.y += 0.95;
                if (randomFlag()) {
                  state.calcEnemiesFlag1 = !state.calcEnemiesFlag1;
                }
              } else {
                el.y -= 0.95;
                if (randomFlag()) {
                  state.calcEnemiesFlag1 = !state.calcEnemiesFlag1;
                }
              }
            } else {
              if (hero.y > el.y) {
                el.y += 0.35;
              }
              if (hero.y < el.y) {
                el.y -= 0.35;
              }
            }
            if (hero.x >= el.x) {
              el.x += 1;
            }
            if (hero.x <= el.x) {
              el.x -= 1;
            }
          } else {
            const cord = randomCord(state.player);
            if (cord[0] >= el.x) {
              el.x += 0.7;
            }
            if (cord[0] <= el.x) {
              el.x -= 0.7;
            }
            if (cord[1] > el.y) {
              el.y += 0.7;
            }
            if (cord[1] < el.y) {
              el.y -= 0.7;
            }
          }
          // if (hero.y > el.y) {
          //   el.y += 0.35;
          // }
          // if (hero.y < el.y) {
          //   el.y -= 0.35;
          // }
        });
      }

      function calcCollisionsEnemie(arr, hero) {
        function randomDamage(arrX) {
          const num = Math.floor(Math.random() * arrX.length);
          return arrX[num];
        }
        arr.forEach((enemie) => {
          if (
            hero.x + hero.w / 2 >= enemie.x - enemie.w / 2
            && hero.x - hero.w / 2 <= enemie.x + enemie.w / 2
            && hero.y - hero.h <= enemie.y + enemie.h
            && hero.y >= enemie.y
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
                1,
              ); // enemy die
            }
          }
        });
      }
      function calcCollisionBullets() {
        state.bullets.forEach((bullet) => {
          state.enemies.forEach((enemie) => {
            // if (enemy.x > state.player.x) {
            //   if (
            //     bullet.x >= enemy.x
            //     && bullet.y >= enemy.y
            //     && bullet.y <= enemy.y + state.player.w
            //   ) {
            if (bullet.x + bullet.w / 2 >= enemie.x - enemie.w / 2
              && bullet.x - bullet.w / 2 <= enemie.x + enemie.w / 2
              && bullet.y - bullet.h <= enemie.y + enemie.h
              && bullet.y >= enemie.y) {
              enemie.hp -= bullet.damage;
              console.log(enemie.hp);
              state.game.countDamage += bullet.damage;
              // console.log(state.game.countDamage);
              state.bullets.splice(bullet, 1);
              // state.bullets.splice(
              //   state.enemies.findIndex((el) => el.id === bullet.id),
              //   1,
              // );
              if (enemie.hp <= 0) {
                state.game.countEnemies += 1;
                state.game.countMoney += 15;
                state.enemies.splice(
                  state.enemies.findIndex((el) => el.id === enemie.id),
                  1,
                );
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

export const { display, updateFrame, updateWawes } = gameSlice.actions;

export default gameSlice.reducer;
