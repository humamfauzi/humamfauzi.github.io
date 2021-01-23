import { 
  Components,
  Axes,
  Scales, 
  Plots,
  Dataset,
  Interactions,
  Animators
} from "plottable";

interface LineData {
  x: string|number,
  y: number
}

interface ScatterData {
  x: number,
  y: number,
  size: number
}

type LineDataArray = Array<LineData>
type ScatterDataArray = Array<ScatterData>

export class PlottableLibrary {
  /**
   * plotLine
   */
  public plotLine(data :LineDataArray, frame: HTMLElement|string) :Plots.Line<unknown>{
    const [ xScale, yScale ] = this.buildXYScale()
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
    const interaction = new Interactions.Click();
    function onClickInteraction(point) {
      plot.selections().attr("stroke", "#888888");
    }
    interaction.onClick(onClickInteraction);
    interaction.attachTo(plot)
    
    chart.renderTo(frame);
    return plot
  }

  public plotScatter(data :LineDataArray, frame: HTMLElement | string) :Plots.Scatter<unknown, unknown> {
    const [ xScale, yScale ] = this.buildXYScale()

    var plot = new Plots.Scatter()
      .addDataset(new Dataset(data))
      .x(function(d) { return d.x; }, xScale)
      .y(function(d) { return d.y; }, yScale)
      .size(function() { return Math.random()*100})
      // this is for SVG Attributes
      .attr("fill-opacity", .4)
    const interaction = new Interactions.Click();
    interaction.onClick(function() {
      const color = ['red', 'green', 'blue', 'yellow', '#AAAAAA']
      plot.selections().attr('fill', color[Math.floor(Math.random() * color.length)])
    })
    interaction.attachTo(plot)
    
    plot.renderTo(frame);
    return plot
  }
  
  private buildXYScale() :[Scales.Linear, Scales.Linear]{
    return [
      new Scales.Linear(),
      new Scales.Linear(),
    ]
  }
  private buildXYAxis({xScale, yScale} :{xScale: Scales.Linear, yScale: Scales.Linear}) :[Axes.Numeric, Axes.Numeric] {
    return [
      new Axes.Numeric(xScale, "bottom"),
      new Axes.Numeric(yScale, "left"),
    ]
  }

  private buildCategoryScale(xDomain: string[], yDomain: string[]) :[Scales.Category, Scales.Category] {
    return [
      new Scales.Category().domain(xDomain),
      new Scales.Category().domain(yDomain),
    ]
  }

  private generateBox([xCat, yCat]:[Scales.Category, Scales.Category]) {
    return new Plots.Rectangle()
    .addDataset(new Dataset([{x:1, y:1, val:0}]))
    .x(d => d.x, xCat)
    .y(d => d.y, yCat)
    .attr('fill', '#888888')
  }

  public confusionMatrix(data :{
    tpr: number, 
    fnr: number, 
    fpr: number, 
    tnr: number
  }, frame:  HTMLElement | string) {
    const {tpr, fnr, fpr, tnr} = data;
    const PRED_TRUE = "Predicted True";
    const PRED_FALSE =  "Predicted False";
    const ACTUAL_TRUE = "Actual True";
    const ACTUAL_FALSE = "Actual False";
    const [xCat, yCat] = this.buildCategoryScale([PRED_TRUE, PRED_FALSE], [ACTUAL_TRUE, ACTUAL_FALSE]);
    const modifiedData :{x: string, y:string, val: number}[] = [
      { x: PRED_TRUE, y: ACTUAL_TRUE, val: tpr },
      { x: PRED_FALSE, y: ACTUAL_TRUE, val: fnr },
      { x: PRED_TRUE, y: ACTUAL_FALSE, val: fpr },
      { x: PRED_FALSE, y: ACTUAL_TRUE, val: tnr }
    ];
    const colorScale = new Scales.InterpolatedColor();
    colorScale.range(["#BDCEF0", "#5279C7"])
    
    const xAxis = new Axes.Category(xCat, "bottom")
    const yAxis = new Axes.Category(yCat, "left")
    const label1 = new Components.Label("ASU")
    const matrix = new Plots.Rectangle().addDataset(new Dataset(modifiedData))
    .x(d=> d.x, xCat)
    .y(d=> d.y, yCat)
    .attr("fill", d => d.val, colorScale)
    
    const masterChart = new Components.Table([
      [yAxis, matrix],
      [null, xAxis],
    ])
    masterChart.renderTo(frame);
    return masterChart
  }

  public confusionMatrixV2(data :{
    tpr: number, 
    fnr: number, 
    fpr: number, 
    tnr: number
  }, frame:  HTMLElement | string) {
    const {tpr, fnr, fpr, tnr} = data;
    const PRED_TRUE = "Predicted True";
    const PRED_FALSE =  "Predicted False";
    const ACTUAL_TRUE = "Actual True";
    const ACTUAL_FALSE = "Actual False";
    const xLabel = new Components.Label('PREDICTION').padding(30).addClass('textModColor')
    const yLabel = new Components.Label('ACTUAL', 90).padding(30)
    const yLabelAT = new Components.Label(ACTUAL_TRUE, 90)
    const yLabelAF = new Components.Label(ACTUAL_FALSE, 90)  

    const xLabelPT = new Components.Label(PRED_TRUE);
    const xLabelPF = new Components.Label(PRED_FALSE);
    
    const padding = 50;
    const tprLabel = new Components.Label(tpr.toString()).padding(padding).addClass('modLabel')
    const fnrLabel = new Components.Label(fnr.toString()).padding(padding).addClass('modLabel')
    const fprLabel = new Components.Label(fpr.toString()).padding(padding).addClass('modLabel')
    const tnrLabel = new Components.Label(tnr.toString()).padding(padding).addClass('modLabel')
    const group2 = new Components.Table([
      [yLabelAT, tprLabel, fprLabel],
      [yLabelAF, fnrLabel, tnrLabel],
      [null, xLabelPT, xLabelPF],
    ]).addClass('modTable')
    const masterTitle = new Components.TitleLabel("CONFUSION MATRIX")
    const masterChart = new Components.Table([
      [null, masterTitle],
      [yLabel, group2],
      [null, xLabel]
    ])
    masterChart.renderTo(frame);
    return masterChart
  }

  private generateRandomScatterData(dataSize: number) :{x: number, y: number, size: number}[] {
    const data = []
    for (let i=0; i<dataSize; i++) {
      data.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random()
      })
    }
    return data
  }

  public randomScatter(frame: HTMLElement | string) {
    let data = this.generateRandomScatterData(200)
    const [ xScale, yScale ] = this.buildXYScale()
    let dataset = new Dataset(data)
    const plot = new Plots.Scatter()
      .addDataset(dataset)
      .x(function(d) { return d.x; }, xScale)
      .y(function(d) { return d.y; }, yScale)
      .size(function(d) { return d.size*100})
      // this is for SVG Attributes
      .attr("fill-opacity", .4)

    const colorLabel = new Components.Label("Color")
    const randomizeLabel = new Components.Label("Random")
    const panel = new Components.Table([
      [colorLabel],
      [randomizeLabel]
    ])
    
    const interactionClick = new Interactions.Click();
    interactionClick.onClick(() => {
      plot.removeDataset(dataset)
      dataset = new Dataset(this.generateRandomScatterData(100))
      plot.addDataset(dataset)
    })
    interactionClick.attachTo(randomizeLabel)

    const interactionClick2 = new Interactions.Click();
    interactionClick2.onClick(() => {
      const color = ['#374025', '#D8D9C7', '#A6896F', '#8C594D', '#592B27'];
      plot.selections().attr('fill', color[Math.floor(Math.random() * color.length)])
    })
    interactionClick2.attachTo(colorLabel)

    const xAxis = new Axes.Numeric(xScale, "bottom");
    const yAxis = new Axes.Numeric(yScale, "left");
    const masterChart = new Components.Table([
      [yAxis, plot, panel],
      [null, xAxis, null]
    ])
    masterChart.renderTo(frame)
    return masterChart
  }

  private resizeData(data: {x: number, y: number}[], multiplier: number) {
    return data.map(d => {
      return {
        x: d.x * multiplier,
        y: d.y * multiplier
      }
    })
  }

  public animationScatter(frame: HTMLElement | string) {
    let data = this.generateRandomScatterData(200)
    const [ xScale, yScale ] = this.buildXYScale()
    let dataset = new Dataset(data)
    const plot = new Plots.Scatter()
      .addDataset(dataset)
      .x(function(d) { return d.x; }, xScale)
      .y(function(d) { return d.y; }, yScale)
      .size(function(d) { return d.size * 100; })
      .animated(true)
      .animator("test",new Animators.Easing().easingMode("bounce"));
    const [ xAxis, yAxis ] = this.buildXYAxis({xScale, yScale})
    
    const interactionClick = new Interactions.Click();
    interactionClick.onClick(() => {
      plot.removeDataset(dataset)
      dataset = new Dataset(this.generateRandomScatterData(100))
      plot.addDataset(dataset)
    })
    interactionClick.attachTo(plot)
    const masterChart = new Components.Table([
      [yAxis, plot],
      [null, xAxis]
    ])
    masterChart.renderTo(frame)
    return masterChart
  }

  public animateLinePlot(frame: HTMLElement | string) {
    const data_1 = [
      {
        x: 0,
        y: 0
      },
      {
        x: 4,
        y: 4
      }
    ];
    const data_2 = [
      {
        x: 0,
        y: 1
      },
      {
        x: 4,
        y: 3
      }
    ]
    const [ xScale, yScale ] = this.buildXYScale();
    let newDataset = new Dataset(data_1);
    let currentData = data_1;
    const plot = new Plots.Line()
      .addDataset(newDataset)
      .x(d => d.x, xScale)
      .y(d => d.y, yScale)
      .animated(true)
      .animator("lineAnim", new Animators.Easing().easingMode("bounce"))
    const plot2 = new Plots.Line()
      .addDataset(newDataset)
      .x(d => d.x, xScale)
      .y(d => d.y, yScale)
      .animated(true)
      .animator("lineAnim", new Animators.Easing().easingMode("bounce"))
    const [ xAxis, yAxis ] = this.buildXYAxis({xScale, yScale})
    const interactionClick = new Interactions.Click();
    interactionClick.onClick(() => {
      plot.removeDataset(newDataset)
      currentData = currentData == data_1 ? data_2 : data_1
      newDataset = new Dataset(currentData)
      plot.addDataset(newDataset)
    });

    interactionClick.attachTo(plot)
    const plotGroup = new Components.PlotGroup([plot, plot2])
    const masterChart = new Components.Table([
      [yAxis, plotGroup],
      [null, xAxis]
    ])
    masterChart.renderTo(frame)
    return masterChart
  }

  private createBarStairs(addition) {
    const result = [];
    for (let i=0; i< 10; i++) {
      result.push({
        x: i + addition,
        y: i+1 + addition
      })
    }
    return result
  }
  public plotBarAnimation(frame: HTMLElement | string) {
    const data_1 = this.createBarStairs(0)
    const data_2 = this.createBarStairs(3)
    const [ xScale, yScale ] = this.buildXYScale();
    let newDataset = new Dataset(data_1);
    let currentData = data_1;
    const plot = new Plots.Bar()
      .addDataset(newDataset)
      .x(d => d.x, xScale)
      .y(d => d.y, yScale)
      .animated(true)
      .animator("lineAnim", new Animators.Easing().easingMode("bounce"))
    const [ xAxis, yAxis ] = this.buildXYAxis({xScale, yScale})
    const interactionClick = new Interactions.Click();
    interactionClick.onClick(() => {
      plot.removeDataset(newDataset)
      currentData = currentData == data_1 ? data_2 : data_1
      newDataset = new Dataset(currentData)
      plot.addDataset(newDataset)
    });

    interactionClick.attachTo(plot)
    const masterChart = new Components.Table([
      [yAxis, plot],
      [null, xAxis]
    ])
    masterChart.renderTo(frame)
    return masterChart
  }
}