/* eslint-disable no-mixed-operators */
function calcBulletTrajectory(state, cord) {
  const codrX = cord.payload.mouseCord[0];
  const codrY = cord.payload.mouseCord[1];
  // console.log(codrX);
  // console.log(codrY);
  const speed = 50;
  const heroX = state.player.x;
  const heroY = state.player.y;
  const dX = codrX - heroX;
  const dY = codrY - heroY;
  const hypotenuse = Math.sqrt(dX ** 2 + dY ** 2);
  const speedX = speed / hypotenuse * dX;
  const speedY = speed / hypotenuse * dY;
  return [speedX, speedY];
}
export default calcBulletTrajectory;
