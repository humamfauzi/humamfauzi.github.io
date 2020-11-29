---
layout: post
title: Plotting With a Frame 
category: CompSci
tags: [Visualization, test]
requires: ['plotly']
description: plotting a circle and have fun with it
---
We want to plot a circle, first we need to define the circle function
$ r^2 = x^2 + y^2 $


### Circle Plotting
Plain basic circle
<div id="circle" style="width:600px;height:600px;"></div>
<script>
  let circle = document.getElementById("circle");
  let frames = [
    {name: 'small_circle', data: [{x: [], y: []}]},
    {name: 'circle', data: [{x: [], y: []}]},
    {name: 'large_circle', data: [{x: [], y: []}]},
  ];
  let n = 100;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1) * 2 - 1;
    frames[0].data[0].x[i] = 0.5 * Math.sin(t * Math.PI);
    frames[0].data[0].y[i] = 0.5 * Math.cos(t * Math.PI);
    frames[1].data[0].x[i] = 1 * Math.sin(t * Math.PI);
    frames[1].data[0].y[i] = 1 * Math.cos(t * Math.PI);
    frames[2].data[0].x[i] = 2 * Math.sin(t * Math.PI);
    frames[2].data[0].y[i] = 2 * Math.cos(t * Math.PI);
  }
  Plotly.newPlot(circle, [{
    x: frames[0].data[0].x,
    y: frames[0].data[0].y,
    line: {simplify: false},
    }], {
    xaxis: {range: [-Math.PI, Math.PI]},
    yaxis: {range: [-Math.PI, Math.PI]},
    updatemenus: [{
      buttons: [
        {method: 'animate', args: [['small_circle']], label: 'small'},
        {method: 'animate', args: [['circle']], label: 'regular'},
        {method: 'animate', args: [['large_circle']], label: 'large'}
      ]
    }]
  }).then(function() {
    Plotly.addFrames(circle, frames);
  });
</script>

Every plotly consists of component and layout. Component is where we insert the data, It takes an array `[]`. Each member of this array which contains data will be plotted. Layouts is where we arange the plot itself. It take care of min and max value in x and y axis. The width and height of plot is also decided here.

If one familiar with matplotlib package in python, you can think the component is the `Axes` and layout is the `Figure`. Ploty also enable interactive multi plot with `Frames`.

```javascript
  const frames = [
    {name: 'small_circle', data: [{x: [], y: []}]},
    {name: 'circle', data: [{x: [], y: []}]},
    {name: 'large_circle', data: [{x: [], y: []}]},
  ];
```

Inside this snippet we declare what we want to plot. In this example, we declare three plot which is a circle plot that has different size. `name` key will be called later to connect between a frame and a button. We let the `data` key empty because we want to fill it later with a for loop. Key `data` have same properties as component.

```javascript
const n = 100;
for (let i = 0; i < n; i++) {
  const t = i / (n - 1) * 2 - 1;
  frames[0].data[0].x[i] = 0.5 * Math.cos(t * Math.PI);
  frames[0].data[0].y[i] = 0.5 * Math.sin(t * Math.PI);
  frames[1].data[0].x[i] = 1 * Math.cos(t * Math.PI);
  frames[1].data[0].y[i] = 1 * Math.sin(t * Math.PI);
  frames[2].data[0].x[i] = 2 * Math.cos(t * Math.PI);
  frames[2].data[0].y[i] = 2 * Math.sin(t * Math.PI);
}
```
Here we  fill our frames data with circle data. Every circle in cartesian coordiantes x and y can be decomposed to a sin function for y and cos function for x. We make difference in each radius. `frames[0]` belong to small circle hence the radius is the smaller among three. `frames[2]` belong to large circle hence the radius is the largest among three.

```javascript
const component = [{
  x: frames[0].data[0].x,
  y: frames[0].data[0].y,
  line: {simplify: false},
}];

Plotly.newPlot(circle, component, {
    xaxis: {range: [-Math.PI, Math.PI]},
    yaxis: {range: [-Math.PI, Math.PI]},
    updatemenus: [{
      buttons: [
        {method: 'animate', args: [['small_circle']], label: 'small'},
        {method: 'animate', args: [['circle']], label: 'regular'},
        {method: 'animate', args: [['large_circle']], label: 'large'}
      ]
    }]
  }).then(function() {
    Plotly.addFrames(circle, frames);
  });
```
Once we completed our frame, we can compose our plot. We create initial data inside the component. The `line.simplify` key equal to false to ensure smoothness of frame transition. We set limit of our plot in `yaxis` and `xaxis` key for x axis and y axis respectively. We declare `updatemenus` so that our plot have an option to jump between frame. We declare our frame in `buttons` key. Inside `button` key, we declare our `label` and `args`. We connect our frame and button in `args` key. Value of `args` key should have the same value as `name` key in frame. We put a label so it would be displayed in button we just create.

We add frame using `addFrames`. It has input our DOM `circle` and our frame we declare in first place.

<div id="circle2" style="width:600px;height:600px;"></div>
<script>
  circle = document.getElementById("circle2");
  frames = [
    {name: 'small_circle', data: [{x: [], y: []}]},
    {name: 'circle', data: [{x: [], y: []}]},
    {name: 'large_circle', data: [{x: [], y: []}]},
  ];
  n = 100;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1) * 2 - 1;
    frames[0].data[0].x[i] = 0.5 * Math.sin(t * Math.PI);
    frames[0].data[0].y[i] = 0.5 * Math.cos(t * Math.PI);
    frames[1].data[0].x[i] = 1 * Math.sin(t * Math.PI);
    frames[1].data[0].y[i] = 1 * Math.cos(t * Math.PI);
    frames[2].data[0].x[i] = 2 * Math.sin(t * Math.PI);
    frames[2].data[0].y[i] = 2 * Math.cos(t * Math.PI);
  }
  let data = [{
    x: frames[0].data[0].x,
    y: frames[0].data[0].y,
    line: {simplify: false},
  }];
  let options = [
    {method: 'animate', args: [['small_circle']], label: 'S'},
    {method: 'animate', args: [['circle']], label: 'R'},
    {method: 'animate', args: [['large_circle']], label: 'L'}
  ]
  let layout = {
    xaxis: {range: [-Math.PI, Math.PI]},
    yaxis: {range: [-Math.PI, Math.PI]},
    sliders: [{
      pad: {l: 0, t: 55},
      currentvalue: {
        visible: false,
        prefix: 'Size:',
        xanchor: 'center',
        font: {size: 330, color: '#666'}
      },
      steps: options
    }]
  }
  Plotly.newPlot(circle, {data, layout, frames})
</script>

Another option is using slider. As we can see in second plot, we have a slider. Each slider state represent our frame like in button. where in update menus it has `buttons`, in sliders it has `steps`. Sliders can be useful for representing comparison between value. 


### Eliptic Curve
Let's create another plot. This time we will use contour plot. Contour plot takes three argument, x and y value like previous plot, and z. Input z have value for all combination of x and y. For example, we have x value from -10 to 10 with 1 increment -10,-9,...,9,10. Input y value also have the same range value. Input z should have value for (-10, -10), (-10, -9), ..., (-9, -10) and so on up to (10, 10). 

For example, we want to map an eliptic curve which have form of $ z = x^3 - y^2 + ax + b $. We assign $a$ equal to $-1$ and $b$ equal to $1$. Let's say our range of $x$ and $y$ is $[-2, 2]$. Now we try input our value to function so we have our $z$ value. 

$$
  \begin{align}
      z &= -2^3 - (-2^2) + (-1)(-2) + 1 \\
      z &= -8 - 4 + 2 + 1 \\
      z &= -9 \\
  \end{align}
$$

Now we did this calculation for every possible combination of $[-2, 2]$.
<div id="eliptic" style="width:600px;height:600px;"></div>
<script>
  function eliptic_curve(x_axis, y_axis, a, b) {
    z_axis = new Array(x_axis.length)
    for (i=0; i < x_axis.length; i++) {
      z_axis[i] = new Array(x_axis.length)
      for (j=0; j < x_axis.length; j++) {
        const cubic = x_axis[j] * x_axis[j] * x_axis[j];
        const quadratic = y_axis[i] * y_axis[i]
        z_axis[i][j] = cubic - quadratic + a * x_axis[j] + b
      }
    }
    return z_axis
  }
  let eliptic = document.getElementById("eliptic");
  let a = -1, b = 1;
  let x_data = y_data = z_data = [];
  for (let i=-10; i<10; i+=.1) {
    x_data.push(i)
    y_data.push(i)
  }
  z_data = eliptic_curve(x_data, y_data, a, b)
  data = [{
    x:x_data,
    y:y_data, 
    z:z_data,
    type: 'contour',
    autocontour: false,
    contours: {
      coloring: 'lines',
      start: -1,
      end: 1,
      size: 1
    },
    colorbar:{
      thickness: 10,
    }
  }];
  layout = {
    xaxis: {range: [-3, 3]},
    yaxis: {range: [-3, 3]},
  }
  Plotly.newPlot(eliptic, {data, layout})
</script>

We have three plot which represent when $z$ equal to $[-1, 0, 1]$. The line is quite small. Unfortunately, plotly does not provide a way to thickens the contour plot lines. The red line represent $z=1$, the gray one represent $z=0$ and the blue one represent $z=-1$. 

Now we want to use slider as a input for our value $a$ while keep $b$ value constant. The first step we should do is to create frames for each $a$. We assume $a$ have range of $[-2, 2]$. We set increment $a$ range equal to $0.5$.

<div id="elipticframe" style="width:600px;height:600px;"></div>
<script>
  elipticframe = document.getElementById("elipticframe");
  b = 1;
  x_data = y_data = z_data = [];
  for (let i=-10; i<10; i+=.1) {
    x_data.push(i)
    y_data.push(i)
  }
  console.time("Start")
  z_data_minus_one = eliptic_curve(x_data, y_data, -1, b)
  console.time("End")
  z_data_zero = eliptic_curve(x_data, y_data, 0, b)
  z_data_one = eliptic_curve(x_data, y_data, 1, b)
  basic_contour_property = {
    type: 'contour',
    autocontour: false,
    contours: {
      coloring: 'lines',
      start: -5,
      end: 5,
      size: 1
    },
    colorbar:{
      thickness: 10,
    }
  }
  frames = [
    {name: 'minus_one', data: [Object.assign({}, basic_contour_property, {x: x_data, y: y_data,z: z_data_minus_one})]},
    {name: 'zero', data: [Object.assign({}, basic_contour_property, {x: x_data, y: y_data, z: z_data_zero})]},
    {name: 'one', data: [Object.assign({}, basic_contour_property, {x: x_data, y: y_data, z: z_data_one})]},
  ];
  options = [
    {method: 'animate', args: [['minus_one']], label: '-1'},
    {method: 'animate', args: [['zero']], label: '0'},
    {method: 'animate', args: [['one']], label: '1'}
  ]
  data = [{
    x:x_data,
    y:y_data, 
    z:z_data_minus_one,
    type: 'contour',
    autocontour: false,
    contours: {
      coloring: 'lines',
      start: -1,
      end: 1,
      size: 1
    },
    colorbar:{
      thickness: 10,
    }
  }];
  layout = {
    xaxis: {range: [-3, 3]},
    yaxis: {range: [-3, 3]},
    sliders: [{
      pad: {l: 0, t: 55},
      currentvalue: {
        visible: false,
        prefix: 'Size:',
        xanchor: 'center',
        font: {size: 330, color: '#666'}
      },
      steps: options
    }]
  }
  Plotly.newPlot(elipticframe, {data, layout, frames})
</script>

Now we create a contour plot of an eliptic curve with a different $a$ value. We apply same slider principle into contour plot. Unfortunately, contour plot does not support smoth transition between plot. The slider act as a value of $a$ in plot. We set available value of $[-1,0,1]$. We can make it smoother by making the frame more fine.

<div id="elipticframe2" style="width:600px;height:600px;"></div>
<script>
  elipticframe = document.getElementById("elipticframe2");
  let a_array = []; b = 1;
  x_data = []; y_data = []; z_data = []; frames = []; options = [];
  for (let i=-10; i<10; i+=.1) {
    x_data.push(i)
    y_data.push(i)
  }
  for (let i=-1; i<1; i +=.1) {
    a_array.push(i.toFixed(1))
    z_data.push(eliptic_curve(x_data, y_data, i,b) )
  }
  for (let i=0; i<a_array.length; i++) {
    frames.push({
      name: `a${a_array[i]}`,
      data: [
        Object.assign({}, basic_contour_property, {x: x_data, y: y_data,z: z_data[i]})
      ]
    })
    options.push({method: 'animate', args:[[`a${a_array[i]}`]], label: `${a_array[i]}`})
  }
  data = [{
    x:x_data,
    y:y_data, 
    z:z_data[0],
    type: 'contour',
    autocontour: false,
    contours: {
      coloring: 'lines',
      start: -5,
      end: 5,
      size: 1
    },
    colorbar:{
      thickness: 10,
    }
  }];
  layout = {
    xaxis: {range: [-3, 3]},
    yaxis: {range: [-3, 3]},
    sliders: [{
      pad: {l: 0, t: 55},
      currentvalue: {
        visible: false,
        prefix: 'Size:',
        xanchor: 'center',
        font: {size: 330, color: '#666'}
      },
      steps: options
    }]
  }
  Plotly.newPlot(elipticframe, {data, layout, frames})
</script>

We add finer increment so it easier to show transitiion between value. As we can see from the slider, if we have $a > 0$ the graph wont show any "island". The island emerge only when $a < 0$. When in $a < 0$, the curve start to have choke point in $x=0$ to $x=1$. We automate creation of frame and its option based on how many $a$ value we increment.

```javascript
for (let i=-1; i<1; i +=.1) {
    a_array.push(i.toFixed(1))
    z_data.push(eliptic_curve(x_data, y_data, i,b) )
  }
```
For each $a$ increment, we push an eliptic curve to an array. In previous example, we do it manually because we only have three frames. After we collect each `z_data` for each frame, we should build the frame itself.

```javascript
for (let i=0; i<a_array.length; i++) {
  frames.push({
    name: `a${a_array[i]}`,
    data: [
      Object.assign({}, basic_contour_property, {x: x_data, y: y_data,z: z_data[i]})
    ]
  })
  options.push({method: 'animate', args:[[`a${a_array[i]}`]], label: `${a_array[i]}`})
}
```
Each frame should have a name so we name it what $a$ value it represents. For the data key, we input our `z_data` that we create in previous loop. Lastly, we put options with the proper label which is $a$ value. Once we have `frames` and `options` filled, the rest is same for building  a contour plot.
> `Object.assign` act like addition in javascript object. It reads from right hand side to left. The empty object `{}` added to make sure that assign operation create new object instead of replacing previous object.

> Javascript code that used for the plot can be accessed in Developer tools `Ctrl + Shift + i` and pick tab Debugger.

That's all notes for now, we learn how to use plotly frame to animate or show changes in our plot.