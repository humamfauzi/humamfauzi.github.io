---
layout: post
title: Plotting a Circle 
category: CompSci
tags: [Visualization, test]
description: plotting a circle and have fun with it
---
We want to plot a circle, first we need to define the circle function
$$ r^2 = x^2 + y^2 $$


### Circle Plotting
Plain basic circle
<div id="circle" style="width:600px;height:250px;"></div>
<script>
const circle = document.getElementById("circle");
  function createCircle(radius) {
    const x = []
    const y = []
    for (let index = -radius; index <= radius; index+=0.1) {
      x.push(index)
      y.push(Math.sqrt( (radius * radius) - (index * index)))          
    }
    for (let index = radius; index >= -radius; index-=0.1) {
      x.push(index)
      y.push(-1 * Math.sqrt( (radius * radius) - (index * index)))
    }
    return [x, y]
  }
  const [x_circle, y_circle] = createCircle(10)
  const square = 20
  const layout = {
		width: 800,
		height: 800,
    xaxis: {
      range: [-square,square]
    },
    yaxis: {
      range: [-square,square]
    }
  }
  const component = [
    {
      x: x_circle,
      y: y_circle
    }
  ]
  Plotly.newPlot(circle, component, layout)
</script>
