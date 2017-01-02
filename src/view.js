import { autoDetectRenderer } from 'pixi.js'

export default ({
  element,
  width = element.clientWidth,
  height = element.clientHeight,
}) => {

  let renderer = autoDetectRenderer(
    width, height,
    { antialias: false, transparent: true, resolution: 1 }
  )

  renderer.autoResize = true

  element.appendChild(renderer.view)

  return renderer
}
