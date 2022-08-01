/* eslint-disable no-param-reassign */
function calcCollisionsEnemie(state, arr, hero) {
  arr.forEach((enemie) => {
    if (
      hero.x + hero.w / 2 >= enemie.x - enemie.w / 2
      && hero.x - hero.w / 2 <= enemie.x + enemie.w / 2
      && hero.y - hero.h <= enemie.y + enemie.h
      && hero.y >= enemie.y
    ) {
      if (state.gameLoop % enemie.coolDown === 0) {
        hero.hp -= enemie.damage;
      }
      enemie.hp -= hero.damage; // PVP damage
      // hero.damagevalue += hero.damage; // counts pvp damage into GameBar !
      // if (enemie.hp <= 0) {
      //   state.enemies.splice(
      //     state.enemies.findIndex((el) => el.id === enemie.id),
      //     1,
      //   ); // enemy die
      // }
    }
  });
}

export default calcCollisionsEnemie;
