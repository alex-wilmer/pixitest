import * as d3 from 'd3'
import _ from 'lodash'
import { Container } from 'pixi.js'
import createView from './view'
import circle from './circle'
import { randomInt, xy } from './utils'

// statics

let nodes = 100
let domainY = 10
let domainX = 100

// example helpers

let generateRandomData = ({ nodes, domainX, domainY }) => new Map(
  _.range(nodes).map(n => [`${randomInt(domainX)},${randomInt(domainY)}`, n])
)

// data

let data = generateRandomData({ nodes, domainX, domainY })

// first chart target

let element = document.querySelector(`.charts`)

let getDimensions = element => ({
  width: element.clientWidth,
  height: 400,
})

// create scales

let { width, height } = getDimensions(element)

let createScales = ({ width, height, minX, maxX, minY, maxY }) => {

  let scaleX = d3.scaleLinear()
    .domain([minX, maxX])
    .range([0, width])

  let scaleY = d3.scaleLinear()
    .domain([minY, maxY])
    .range([0, height])

  return { scaleX, scaleY }
}

// render chart

let stage = new Container()

// generate circles

let { scaleX, scaleY } = createScales({
  ...getDimensions(element),
  minX: 0,
  maxX: domainX,
  minY: 0,
  maxY: domainY,
})

let drawCircles = ({ data, scaleX, scaleY }) => {
  let circles = []
  for (let [k] of data) {
    let [x, y] = xy(k)

    circles.push(circle({
      color: 0x123456,
      x: scaleX(x),
      y: scaleY(y),
      r: 4,
    }))
  }
  return circles
}

let circles = drawCircles({ data, scaleX, scaleY })
circles.forEach(x => stage.addChild(x))

let renderer = createView({
  element,
  data,
  width,
  height,
  scaleX,
  scaleY,
})

// handle window resize

let resize = () => {
  let { width, height } = getDimensions(element)
  console.log(width, height)
  renderer.resize(width, height)
}

window.addEventListener(`resize`, resize)

// zoom testing

let zoomBtn = document.getElementById(`zoom`)
let resetBtn = document.getElementById(`reset`)

zoomBtn.addEventListener(`click`, () => {

})

resetBtn.addEventListener(`click`, () => {

})

// main loop

let loop = () => {
  requestAnimationFrame(loop)
  renderer.render(stage)
}

loop()
