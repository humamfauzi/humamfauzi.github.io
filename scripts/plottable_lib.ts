import { 
  Components,
  Axes,
  Scales, 
  Plots,
  Dataset,
  Interactions,
  Interaction
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
    
    plot.renderTo(frame);
    return plot
  }
  
  private buildXYScale() :[Scales.Linear, Scales.Linear]{
    return [
      new Scales.Linear(),
      new Scales.Linear(),
    ]
  }
}