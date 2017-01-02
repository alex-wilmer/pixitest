import * as d3 from 'd3'
import _ from 'lodash'
import { Container } from 'pixi.js'
import createView from './view'
import circle from './circle'
import text from './text'
import { randomInt, xy, getDimensions } from './utils'

// statics

let nodes = 3
let domainY = 10
let domainX = 100

// example helpers

let generateRandomData = ({ nodes, domainX, domainY }) => new Map(
  // _.range(nodes).map(n => [`${randomInt(domainX)},${randomInt(domainY)}`, {
  //   data: n,
  //   graphic: null,
  // }])
  _.range(nodes).map(n => [`${(n + 1) * 10},5`, {
    data: n,
    graphic: null,
  }])
)

// data

let data = generateRandomData({ nodes, domainX, domainY })

// first chart target

let chart1 = document.querySelector(`.charts`)

// create scales

let createScales = ({ width, height, minX, maxX, minY, maxY }) => {

  let scaleX = d3.scaleLinear()
    .domain([minX, maxX])
    .range([0, width])

  let scaleY = d3.scaleLinear()
    .domain([minY, maxY])
    .range([0, height])

  return { scaleX, scaleY }
}

let renderer = createView({
  ...getDimensions(chart1),
  element: chart1,
  data,
  scaleX,
  scaleY,
})

let stage = new Container()

// generate circles

let { scaleX, scaleY } = createScales({
  ...getDimensions(chart1),
  minX: 0,
  maxX: domainX,
  minY: 0,
  maxY: domainY,
})

let ticks = []

let drawCircles = ({ data, scaleX, scaleY }) => {
  for (let [k, v] of data) {
    let [x, y] = xy(k)

    v.graphic = circle({
      color: 0x123456,
      x: scaleX(x),
      y: scaleY(y),
      r: 4,
    })

    stage.addChild(v.graphic)

    let sx = scaleX(x)
    let txt = text(sx)
    txt.x = sx
    txt.y = 10
    stage.addChild(txt)
    ticks.push({ x, text: txt })
  }
}

let mutateCircles = ({ data, scaleX }) => {
  for (let [k, v] of data) {
    let [x, y] = xy(k)
    v.graphic.x = scaleX(x)
    ticks.find(q => q.x === x).text.x = scaleX(x)
  }
}

drawCircles({ data, scaleX, scaleY })

// handle window resize

let resize = () => {
  let { width, height } = getDimensions(chart1)
  renderer.resize(width, height)
}

window.addEventListener(`resize`, resize)

// zoom testing

let zoomBtn = document.getElementById(`zoom`)
let resetBtn = document.getElementById(`reset`)

zoomBtn.addEventListener(`click`, () => {
  let { scaleX, scaleY } = createScales({
    ...getDimensions(chart1),
    minX: 0,
    maxX: domainX - 20,
    minY: 0,
    maxY: domainY,
  })

  mutateCircles({ data, scaleX, scaleY })
})

resetBtn.addEventListener(`click`, () => {
  let { scaleX, scaleY } = createScales({
    ...getDimensions(chart1),
    minX: 0,
    maxX: domainX,
    minY: 0,
    maxY: domainY,
  })

  mutateCircles({ data, scaleX, scaleY })
})

// main loop

let loop = () => {
  requestAnimationFrame(loop)
  renderer.render(stage)
}

loop()
