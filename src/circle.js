import { Graphics } from 'pixi.js'

export default ({
  color,
  x,
  y,
  r,
}) => {
  let s = new Graphics()

  s.beginFill(color)
  s.drawCircle(x, y, r)
  s.endFill()

  return s
}
