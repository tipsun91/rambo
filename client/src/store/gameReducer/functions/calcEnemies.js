/* eslint-disable no-param-reassign */
function calcEnemies(state, arr, hero) {
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
        [heroXY.x - heroXY.h, heroXY.y - heroXY.w]];
      const cord = Math.floor(Math.random() * arrCord.length);
      return arrCord[cord];
    }
    if ((hero.x - el.x) < -50) {
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
  });
}

export default calcEnemies;
