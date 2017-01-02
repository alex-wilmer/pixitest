import { autoDetectRenderer } from 'pixi.js'

export default ({
  element,
  width,
  height,
}) => {

  let renderer = autoDetectRenderer(
    width, height,
    { antialias: false, transparent: true, resolution: 1 }
  )

  renderer.autoResize = true

  element.appendChild(renderer.view)

  return renderer
}
