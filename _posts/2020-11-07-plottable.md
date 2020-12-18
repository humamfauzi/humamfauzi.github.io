---
layout: post 
title: Plottable JS
categories: Dev
tags: [Visualization, test]
requires: ['plottablejs']
description: Trying plottablejs by Palantir Technologies. PlottableJS promise a component based plot based on D3.js so it has all fluidity that D3.js offers while relatively easy to use. In this post we try capabilities and limitations of PlottableJS
---

Unfortunately, plottablejs 3.x is kind of weird and does not work as intended. I try official [tutorials](http://plottablejs.org/components/plots/line/) in 3.x and none of them are working. All plottable JS here is in 2.4.0 version which works as expected.

We use node modules and webpack to insert PlottableJS inside our browser. The reason why we want to use PlottableJS is because it based on typescript so it could used by other typescript program seamlessly.

The ideas is we create our own library using typescript and pack it using webpack so our pages could fetch some function from it. My library is in `scripts/index.ts`. Webpack could embed it in `window` variable which accessible from browser. Our library called `AncillaryLib`.

Like before, we trey to plot a circle with plottable JS.
<div class="plot_container" width="800px" height="800px">
<svg id="example2" width="550px" height="550px" class="plot"></svg>
</div>
<script type="text/javascript">
  var data = []
  let n = 100;
  for (let i = 0; i < n; i++) {
    var t = i / (n - 1) * 2 - 1;
    let x = 0.5 * Math.sin(t * Math.PI);
    let y = 0.5 * Math.cos(t * Math.PI);
    data.push({x, y})
  }
  var getLib = new window.AncillaryLib.GeneralLibrary()
  var plottableLibs = new getLib.ExtractPlottableLib()
  var plotLineInstance = new plottableLibs()
  var plotLine = plotLineInstance.plotLine(data, "svg#example2")
  window.addEventListener("resize", function() {
    plotLine.redraw();
  });
</script>


To create such plot, let us look inside the library.

```javascript
const { 
  Components,
  Axes,
  Scales, 
  Plots,
  Dataset
} = PlottableSource
export class PlottableLibrary {
  /**
   * plotLine
   */
  public plotLine(data :LineDataArray, frame: HTMLElement|string) :PlottableSource.Plots.Line<unknown>{
    const xScale = new Scales.Linear();
    const yScale = new Scales.Linear();
    const xAxis = new Axes.Numeric(xScale, "bottom");
    const yAxis = new Axes.Numeric(yScale, "left");

    const plot = new Plots.Line()
    plot.x(d => d.x, xScale)
    plot.y(d => d.y, yScale)
    
    const title = new Components.TitleLabel("Circle")
    const xLabel = new Components.AxisLabel("X Axis")
    const yLabel = new Components.AxisLabel("Y Axis", 270)
    plot.addDataset(new Dataset(data))
    const groupPlot = new Components.Group([plot])
    const chart = new Components.Table([
      [null, null, title],
      [yLabel, yAxis, groupPlot],
      [null, null, xAxis],
      [null, null, xLabel]
    ]);
    
    chart.renderTo(frame);
    return plot
  }

  public plottableBase() {
    return PlottableSource
  }
}
```
That's a long piece of code, let us breakdown bit by bit. The most important part of the plot is the `Compoenent.Table` since it gave our plot a structure

```javascript
const chart = new Components.Table([
  [null,    null, title],
  [yLabel, yAxis, groupPlot],
  [null,    null, xAxis],
  [null,    null, xLabel]
]);
```
The constructor for `Table` class require a two by two array which tells plottable JS which component goes where. As we can see, we have six component and if you map the array to the plot, you could roughly understand the place of every component.

```javascript
const title = new Components.TitleLabel("Circle")
const xLabel = new Components.AxisLabel("X Axis")
const yLabel = new Components.AxisLabel("Y Axis", 270)
```
`yLabel` and `xLabel` are label compoenents which specifically for labeling axis `AxisLabel` which take two constructor, the display text and it rotation. Title have their own component called `TitleLabel` which need a text as a constructor

```javascript
const xScale = new Scales.Linear();
const yScale = new Scales.Linear();
const xAxis = new Axes.Numeric(xScale, "bottom");
const yAxis = new Axes.Numeric(yScale, "left");
```
We set the Axes by putting a scales as a constructor to denote how we want our axis behave. We need a linear axis so we instantiate a class `Scales.Linear` for both `xScale` and `yScale`. For Axis instatiation, we declare `Axes.Numeric` with additional constructor of where we want to place it relative to the plot. For example, if we put `left` in `yAxis`, then the ruler will appear first instead of the number. The correct one is to put `right` because `yAxis` located in left hand side of the plot.

```javascript
const plot = new Plots.Line()
plot.x(d => d.x, xScale)
plot.y(d => d.y, yScale)
plot.addDataset(new Dataset(data))
```
In this example, we create line plot so we instantiate `Plots.Line`. We put the `x` and `y` to the plot using method with the same name. The method input is a function and a scale. The function tells the plot how to get value from dataset that we input later.

PlottableJS only accept dataset through class of `Dataset` so any data we have should be fed to the class and create an instantiation that will become an input in a `Plots.Line` method `addDataset`.

We also can modify the property of each component, this will be useful want we want to create an interaction so we could design what triggers change what propertries.

We use a scatter plot to demonstrate attribute

<div class="plot_container" width="800px" height="800px">
<svg id="example3" width="550px" height="550px" class="plot"></svg>
</div>
<script type="text/javascript">
  const svgDOM = document.getElementById("example3")
  var data = []
  n = 100;
  for (let i = 0; i < n; i++) {
    var t = i / (n - 1) * 2 - 1;
    let x = 0.5 * Math.sin(t * Math.PI);
    let y = 0.5 * Math.cos(t * Math.PI);
    let size = Math.random()
    data.push({x, y, size})
  }
  var plotScatter = plotLineInstance.plotScatter(data, "svg#example3")
  window.addEventListener("resize", function() {
    plotScatter.redraw();
  });
</script>

