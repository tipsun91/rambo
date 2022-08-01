/* eslint-disable no-param-reassign */
function calcCollisionBullets(state) {
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

export default calcCollisionBullets;
