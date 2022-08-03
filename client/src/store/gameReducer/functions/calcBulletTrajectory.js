/* eslint-disable no-mixed-operators */
function calcBulletTrajectory(state, cord) {
  const codrX = cord.payload.mouseCord[0]; // корды клика мышки по Х
  const codrY = cord.payload.mouseCord[1]; // корды клика мышки по У
  // console.log(codrX);
  // console.log(codrY);
  const speed = 50; // скорость пули
  const heroX = state.player.x; // корды героя по Х
  const heroY = state.player.y + state.player.h / 2; // корды героя по У
  const dX = codrX - heroX; // длинна безду Х героя и Х клика
  const dY = codrY - heroY; // длинна безду У героя и У клика
  const hypotenuse = Math.sqrt(dX ** 2 + dY ** 2); // гипотенуза
  const speedX = speed / hypotenuse * dX; // скорость по Х
  const speedY = speed / hypotenuse * dY; // скорость по У
  return [speedX, speedY];
}
export default calcBulletTrajectory;
