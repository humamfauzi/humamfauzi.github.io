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

#### Basics
Like before, we try to plot a circle with plottable JS.
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

#### Attributes

We use a scatter plot to demonstrate attribute

<div class="plot_container" width="800px" height="800px">
<svg id="example3" width="550px" height="550px" class="plot"></svg>
</div>
<script type="text/javascript">
  var svgDOM = document.getElementById("example3")
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

The scatter plot have one more datapoint, size. We set random number as a size, so anytime we refresh the page, the plot will be changed. We apply same `x` and `y` datapoint, same as previous plot. 

Each plottable compenent is based on `svg` tag which stands for Scalable Vector Graphics. PlottableJS generates resizeable plot that ultilize vector so it won't break when zoomed. Like any HTML tags, `svg` also have their own attribute to enrich browsing experience. Attribute can be accesses via `.attr` method which consists of the attribute and the value we want.

```javascript
var plot = new Plots.Scatter()
  .addDataset(new Dataset(data))
  .x(function(d) { return d.x; }, xScale)
  .y(function(d) { return d.y; }, yScale)
  .size(function() { return Math.random()*100})
  // this is for SVG Attributes
  .attr("fill-opacity", .4)
```

In the example, we change attribute of `fill-opacity` to reduce opacity of each scatter plot. Full list of available attribute can be found [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute).

If we click the plot, it will change color randomly. `Interactions` can alter color of plot. Our interactions function are

```javascript
const interaction = new Interactions.Click();
interaction.onClick(function() {
  const color = ['red', 'green', 'blue', 'yellow', '#AAAAAA']
  plot.selections().attr('fill', color[Math.floor(Math.random() * color.length)])
})
interaction.attachTo(plot)
```

There are three part of interaction, first we need to instantiate the type of interactions. Second, we need to declare the function of what happen if the trigger happen. Finally, we need to attach it to the designated plot. In this example, we change the scatter plot color randomly in each click.

#### Non Plots

We can utilize PlottableJS to create non plots. Let's say we want to create a confusion matrix. A confusion matrix, in its simplest form, is a two by two matrix. The first one shows the true positive rate of an categorical prediction. For example, you create a prediction engine that predict a coin toss result where head equal positive and tail equal to negative. If the result and the prediction is the same, then it belongs to true positive. Second one is the false negative, the number when your prediction shows head (equal positive) and tail the result tail (equal negative) then it belongs to second one, the third one is like the second one but reversed and the last one is like first one but both of them are negative.

Confusion matrix will look like this.

<div class="plot_container" width="600px" height="500px">
<svg id="example4" width="500px" height="400px" class="plot"></svg>
</div>
<script type="text/javascript">
  var svgDOM = document.getElementById("example3")
  var data = {
    tpr: 10,
    fnr: 12,
    fpr: 15,
    tnr: 22,
  }
  var confMatrix = plotLineInstance.confusionMatrixV2(data, "svg#example4")
  window.addEventListener("resize", function() {
    confMatrix.redraw();
  });
</script>

Confusion matrix is constructed based on label, numbers and predicted/actual sign is a label. We compose it using group. First composition is the actual matrix itself
```javascript
const yLabelAT = new Components.Label(ACTUAL_TRUE, 90)
const yLabelAF = new Components.Label(ACTUAL_FALSE, 90)  

const xLabelPT = new Components.Label(PRED_TRUE)
const xLabelPF = new Components.Label(PRED_FALSE)

const padding = 50
const tprLabel = new Components.Label(tpr.toString()).padding(padding).addClass('modLabel')
const fnrLabel = new Components.Label(fnr.toString()).padding(padding).addClass('modLabel')
const fprLabel = new Components.Label(fpr.toString()).padding(padding).addClass('modLabel')
const tnrLabel = new Components.Label(tnr.toString()).padding(padding).addClass('modLabel')
const group2 = new Components.Table([
  [yLabelAT, tprLabel, fprLabel],
  [yLabelAF, fnrLabel, tnrLabel],
  [null, xLabelPT, xLabelPF],
])
```

we add padding to increase matrix readibility. PlottableJS also support passing down a CSS stylesheet to a label. Each oh the number now have `.modLable` style which alter their font-size. After we compose it, now we will embed it to master plot.

```javascript
const masterTitle = new Components.TitleLabel("CONFUSION MATRIX")
const masterChart = new Components.Table([
  [null, masterTitle],
  [yLabel, group2],
  [null, xLabel]
])
masterChart.renderTo(frame);

```
Modifying table is not possible for now since all table in PlottableJS is constructed using a `g` tag and it does not support modification such as adding border or color through CSS. However modifying text and plot is still possbile since basic svg tags such as `text` and `rect` accept CSS styling.

### Interaction
Plottable also support interaction. Let's see how it works. Let's say we want to generate random scatter plot. So every time we click radomize, the plot will generate different sample.
<div class="plot_container" width="600px" height="400px">
<svg id="example5" width="600px" height="300px" class="plot"></svg>
</div>
<script type="text/javascript">
  var confMatrix = plotLineInstance.randomScatter("svg#example5")
  window.addEventListener("resize", function() {
    confMatrix.redraw();
  });
</script>
The first problem we could notice here is the scale apparently does not count the scatter size so there is a visible cutoffline when using scatter with variable size.

```javascript
const colorLabel = new Components.Label("Color")
const randomizeLabel = new Components.Label("Random")
const panel = new Components.Table([
  [colorLabel],
  [randomizeLabel]
])
```

We use labels to create additional button. Later, we attach an interaction to each label. We use click interaction. There are two kind of interaction that we want to present. First, we change the color of the plot, and second, we randomize the value. For the color part, the code is straightoforward.
```javascript
const interactionClick2 = new Interactions.Click();
interactionClick2.onClick(() => {
  const color = ['#374025', '#D8D9C7', '#A6896F', '#8C594D', '#592B27'];
  plot.selections().attr('fill', color[Math.floor(Math.random() * color.length)])
})
interactionClick2.attachTo(colorLabel)
```

We set a colorscheme and a random chooser so everytime we click the panel, plot picks random color and change the plot color. Personally, i feel the `.onClick` method is redundant since we already declare we want a click interaction in `new Interactions.Click()`. After we set what happen when we click, we attach it to the label. Same principle goes to randomizer
```Javascript
const interactionClick = new Interactions.Click();
interactionClick.onClick(() => {
  plot.removeDataset(dataset)
  dataset = new Dataset(this.generateRandomScatterData(100))
  plot.addDataset(dataset)
})
interactionClick.attachTo(randomizeLabel)
```

First, we remove current dataset, create a new one, and add it to the plot. The interaction is not as smooth as plotlyjs but for displaying interactive environment, it did well.

### Animation

<div class="plot_container" width="600px" height="500px">
<svg id="example6" width="500px" height="400px" class="plot"></svg>
</div>
<script type="text/javascript">
  var anim = plotLineInstance.animationScatter("svg#example6")
  window.addEventListener("resize", function() {
    anim.redraw();
  });
</script>

Here we draw a random scatter plot. Each time we click the plot, it will generate new one. We apply animation in the transition. Animation works in change, in this case, the change is caused by click in the plot. Let's see what happen if we animate a line plot

<div class="plot_container" width="600px" height="500px">
<svg id="example7" width="500px" height="400px" class="plot"></svg>
</div>
<script type="text/javascript">
  var anim = plotLineInstance.animateLinePlot("svg#example7")
  window.addEventListener("resize", function() {
    anim.redraw();
  });
</script>

Apparently, animation in line plot is less impressive compared to scatter one. Let's see if bar chart have better animation

<div class="plot_container" width="600px" height="500px">
<svg id="example8" width="500px" height="400px" class="plot"></svg>
</div>
<script type="text/javascript">
  var anim = plotLineInstance.plotBarAnimation("svg#example8")
  window.addEventListener("resize", function() {
    anim.redraw();
  });
</script>

Bar has better animation than line. 

### Conclusion

Plottable JS have an intuitive API. Albeit, it has some limitation, for web plotting should be adequate. The only notable limitation is in plot annotations. Hopefully we will see more feature from D3.js translated to Plottable JS. 