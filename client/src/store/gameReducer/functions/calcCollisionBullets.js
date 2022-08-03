/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';

function calcCollisionBullets(state, arr) {
  state.bullets.forEach((bullet) => {
    arr.forEach((enemie) => {
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
        // console.log(enemie.hp);
        state.game.countDamage += bullet.damage;
        // console.log(state.game.countDamage);
        // state.bullets.splice(bullet, 1);
        // enemie.skin1 = '/animations/boom2.gif';
        state.bullets.splice(
          arr.findIndex((el) => el.id === bullet.id),
          1,
        );
        if (enemie.hp <= 0) {
          state.golds.push({
            id: uuidv4(),
            x: enemie.x,
            y: enemie.y,
            h: state.gold.h,
            w: state.gold.w,
            skin: state.gold.skin,
          });
          state.game.countEnemies += 1;
          // state.game.countMoney += 15;
          arr.splice(
            arr.findIndex((el) => el.id === enemie.id),
            1,
          );
        }
      }
    });
  });
}

export default calcCollisionBullets;
