export let randomInt = x => ~~(Math.random() * x)

export let xy = s => s.split(`,`).map(s => +s)

export let easeOutCubic = (currentIteration, startValue, changeInValue, totalIterations) =>
  changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue
