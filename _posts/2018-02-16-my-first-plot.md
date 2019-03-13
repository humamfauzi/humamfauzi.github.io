---
layout: post
title: Plotting 
category: CompSci
tags: [Visualization, test, reference]
description: Semi-complete plotly reference for further use
---
This is an attempt to create a plot in a markdown page. While we succeed inserting math equation to post, we need to insert plot so we can
explain things much clearer


### Basic Plotting
Plain basic plotting X and Y value
<div id="tester001" style="width:600px;height:250px;"></div>
<script>
	TESTER = document.getElementById("tester001");
	Plotly.plot(TESTER, [{
		x: [1, 2, 3, 4, 5],
		y: [1, 2, 4, 8, 16]
		}], { margin: { t:0 } } );
					
</script>

--------
Basic plotting with two line each have their own respective X and Y value. Add title for the plot
<div id="tester002" style="width:600px;height:500px;"></div>
<script>
	var test002 = document.getElementById("tester002");
	var trace01 = {x:[3,9,8,10,4,5,6], y:[5,7,6,7,8,9,8], type:"scatter"};
	var trace02 = {x:[3,4,1,6,8,9,6], y:[4,2,5,2,1,7,3], type:"scatter"};
	var data = [trace01, trace02];
	var layout = { title: "Simple Graph"};

	Plotly.plot(test002, data, layout);
</script>

-------
Basic plot with responsive layout

<div id="tester003" style="width:600px;height:500px;"></div>
<script>
	var test003 = document.getElementById("tester003");
	var trace01 = {x:[3,9,8,10,4,5,6], y:[5,7,6,7,8,9,8], type:"scatter"};
	var trace02 = {x:[3,4,1,6,8,9,6], y:[4,2,5,2,1,7,3], type:"scatter"};
	var data = [trace01, trace02];
	var layout = { title: "Simple Graph Responsive"};

	Plotly.plot(test003, data, layout, {responsive: true});
</script>

------
Basic scatter plot

<div id="tester004" style="width:600px;height:500px;"></div>
<script>
	var test004 = document.getElementById("tester004");
	var trace01 = {x:[3,9,8,10,4,5,6], y:[5,7,6,7,8,9,8], type:"scatter", mode: "markers"};
	var trace02 = {x:[3,4,1,6,8,9,6], y:[4,2,5,2,1,7,3], type:"scatter", mode:"lines"};
	var data = [trace01, trace02];
	var layout = { title: "Markers and Line"};

	Plotly.plot(test004, data, layout);
</script>

-------
Scatter plot with data label on plot
<div id="tester005" style="width:600px;height:500px;"></div>
<script>
	var test005 = document.getElementById("tester005");
	var trace01 = {
		x:[1, 2, 3, 4, 5], 
		y:[1, 6, 3, 6, 1], 
		type:"scatter", 
		mode: "markers+text",
		name: "Team-A",
		text: ["A-1", "A-2", "A-3", "A-4", "A-5"],
		textposition: "top center",
		textfont: {
			family: "Raleway, sans-serif"
		},
		marker: { size: 12 }
	};

	var trace02 = {
		x:[1.5, 2.5, 3.5, 4.5, 5.5], 
		y:[4, 1, 7, 1, 4], 
		type:"scatter", 
		mode: "markers+text",
		name: "Team-B",
		text: ["B-1", "B-2", "B-3", "B-4", "B-5"],
		textposition: "bottom center",
		textfont: {
			family: "Times New Roman"
		},
		marker: { size: 12 }
	};

	var data = [trace01, trace02];

	var layout = { 
		xaxis: {
			range: [0.75, 5.25]
		},
		yaxis: {
			range: [0, 8]
		},
		legend: {
			y: 0.5,
			yref: 'paper',
			font: {
				family: 'Arial, sans-serif',
				size: 20,
				color: 'grey'
			}
		},
		title: "Data labels on Plot"
	};

	Plotly.plot(test005, data, layout);
</script>

--------
#### Bubble chart
Bubble coloring should be computer generated instead of inputed manually

<div id="tester006" style="width:600px;height:500px;"></div>
<script>
	var test006 = document.getElementById("tester006");
	var trace01 = {
		x:[1, 2, 3, 4], 
		y:[10, 11, 12, 13], 
		mode: "markers",
		text: ["A size: 40", "B size: 60", "C size: 80", "D size: 100"],
		marker: { 
			size: [40, 60, 80, 100],
			color: [
				'rgb(93, 164, 214)',
				'rgb(255, 144, 14)',
				'rgb(44, 160, 101)',
				'rgb(255, 65, 54)'
			]
		}
		
	};


	var data = [trace01];

	var layout = { 
		title: "Data labels on Plot",
		showlegend: false,
		width: 600,
		height: 500
	};
	Plotly.plot(test006, data, layout);
</script>

----------
#### Bar Chart
Standard Bar Chart
<div id="tester007" style="width:600px;height:500px;"></div>
<script>
	var test007 = document.getElementById("tester007");
	var trace1 = {
	  x: ['giraffes', 'orangutans', 'monkeys'],
	  y: [20, 14, 23],
	  name: 'SF Zoo',
	  type: 'bar'
	};

	var trace2 = {
	  x: ['giraffes', 'orangutans', 'monkeys'],
	  y: [12, 18, 29],
	  name: 'LA Zoo',
	  type: 'bar'
	};

	var data = [trace1, trace2];

	var layout = {barmode: 'group'};

	Plotly.newPlot(test007, data, layout);
</script>

Stylized Bar Chart
<div id="tester008" style="width:600px;height:500px;"></div>
<script>
	var test008 = document.getElementById("tester008");
	var trace1 = {
	  x: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
	  y: [219, 146, 112, 127, 124, 180, 236, 207, 236, 263, 350, 430, 474, 526, 488, 537, 500, 439],
	  name: 'Rest of world',
	  marker: {color: 'rgb(55, 83, 109)'},
	  type: 'bar'
	};

	var trace2 = {
	  x: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
	  y: [16, 13, 10, 11, 28, 37, 43, 55, 56, 88, 105, 156, 270, 299, 340, 403, 549, 499],
	  name: 'China',
	  marker: {color: 'rgb(26, 118, 255)'},
	  type: 'bar'
	};

	var data = [trace1, trace2];

	var layout = {
	  title: 'US Export of Plastic Scrap',
	  xaxis: {tickfont: {
	      size: 14,
	      color: 'rgb(107, 107, 107)'
	    }},
	  yaxis: {
	    title: 'USD (millions)',
	    titlefont: {
	      size: 16,
	      color: 'rgb(107, 107, 107)'
	    },
	    tickfont: {
	      size: 14,
	      color: 'rgb(107, 107, 107)'
	    }
	  },
	  legend: {
	    x: 0,
	    y: 1.0,
	    bgcolor: 'rgba(255, 255, 255, 0)',
	    bordercolor: 'rgba(255, 255, 255, 0)'
	  },
	  barmode: 'group',
	  bargap: 0.15,
	  bargroupgap: 0.1
	};

	Plotly.newPlot(test008, data, layout);
</script>

Modified Bar Chart
<div id="tester009" style="width:600px;height:500px;"></div>
<script>
	var test009 = document.getElementById("tester009")
	// Base

	var xData = ['Product<br>Revenue', 'Services<br>Revenue',
	  'Total<br>Revenue', 'Fixed<br>Costs',
	  'Variable<br>Costs', 'Total<br>Costs', 'Total'
	];

	var yData = [400, 660, 660, 590, 400, 400, 340];

	var textList = ['$430K', '$260K', '$690K', '$-120K', '$-200K', '$-320K', '$370K'];


	var trace1 = {
	  x: xData,
	  y: [0, 430, 0, 570, 370, 370, 0],
	  marker: {
	    color: 'rgba(1,1,1,0.0)'
	  },
	  type: 'bar'
	};

	//Revenue

	var trace2 = {
	  x: xData,
	  y: [430, 260, 690, 0, 0, 0, 0],
	  type: 'bar',
	  marker: {
	    color: 'rgba(55,128,191,0.7)',
	    line: {
	      color: 'rgba(55,128,191,1.0)',
	      width: 2
	    }
	  }
	};

	//Cost

	var trace3 = {
	  x: xData,
	  y: [0, 0, 0, 120, 200, 320, 0],
	  type: 'bar',
	  marker: {
	    color: 'rgba(219, 64, 82, 0.7)',
	    line: {
	      color: 'rgba(219, 64, 82, 1.0)',
	      width: 2
	    }
	  }
	};

	//Profit

	var trace4 = {
	  x: xData,
	  y: [0, 0, 0, 0, 0, 0, 370],
	  type: 'bar',
	  marker: {
	    color: 'rgba(50,171, 96, 0.7)',
	    line: {
	      color: 'rgba(50,171,96,1.0)',
	      width: 2
	    }
	  }
	};

	var data = [trace1, trace2, trace3, trace4];

	var layout = {
	  title: 'Annual Profit 2015',
	  barmode: 'stack',
	  paper_bgcolor: 'rgba(245,246,249,1)',
	  plot_bgcolor: 'rgba(245,246,249,1)',
	  width: 600,
	  height: 600,
	  showlegend: false,
	  annotations: []
	};

	for ( var i = 0 ; i < 7 ; i++ ) {
	  var result = {
	    x: xData[i],
	    y: yData[i],
	    text: textList[i],
	    font: {
	      family: 'Arial',
	      size: 14,
	      color: 'rgba(245,246,249,1)'
	    },
	    showarrow: false
	  };
	  layout.annotations.push(result);
	};
	Plotly.newPlot(test009, data, layout);
</script>


-------
### Statistical Chart

##### Error Bar

<div id="tester010" style="height:600px;width:600px"></div>
<script>
	var test010 = document.getElementById("tester010")
	var data = [
		{
			x: [0, 1, 2],
			y: [6, 10, 2],
			error_y: {
				type: 'data',
				array: [1,2,3],
				visible: true
			},
			type: 'scatter'
		}
	]
	Plotly.newPlot(test010, data)
</script>

##### Bar Chart with Error Bar
<div id="tester011" style="height:600px;width:600px"></div>
<script>
	var test011 = document.getElementById("tester011")
      var trace1 = {
	x: ['Trial 1', 'Trial 2', 'Trial 3'],
	y: [3, 6, 4],
	name: 'Control',
	error_y: {
	  type: 'data',
	  array: [1, 0.5, 1.5],
	  visible: true
	},
	type: 'bar'
      };
      var trace2 = {
	x: ['Trial 1', 'Trial 2', 'Trial 3'],
	y: [4, 7, 3],
	name: 'Experimental',
	error_y: {
	  type: 'data',
	  array: [0.5, 1, 2],
	  visible: true
	},
	type: 'bar'
      };
      var data = [trace1, trace2];
      var layout = {barmode: 'group'};
      Plotly.newPlot(test011, data, layout);	
</script>

##### Asymetetric Error Bar
<div id="tester012" style="height:600px;width:600px"></div>
<script>
	var test012 = document.getElementById("tester012")
	var data = [
	  {
	    x: [1, 2, 3, 4],
	    y: [2, 1, 3, 4],
	    error_y: {
	      type: 'data',
	      symmetric: false,
	      array: [0.1, 0.2, 0.1, 0.1],
	      arrayminus: [0.2, 0.4, 1, 0.2]
	    },
	    type: 'scatter'
	  }
	];
      Plotly.newPlot(test012, data);	
</script>

##### Continuous Error Bar
<div id="tester013" style="height:600px;width:600px"></div>
<script>
	var test013 = document.getElementById("tester013")
	var trace1 = {
	  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 
	  y: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 
	  fill: "tozerox", 
	  fillcolor: "rgba(0,100,80,0.2)", 
	  line: {color: "transparent"}, 
	  name: "Fair", 
	  showlegend: false, 
	  type: "scatter"
	};
	var trace2 = {
	  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 
	  y: [5.5, 3, 5.5, 8, 6, 3, 8, 5, 6, 5.5, 4.75, 5, 4, 7, 2, 4, 7, 4.4, 2, 4.5], 
	  fill: "tozerox", 
	  fillcolor: "rgba(0,176,246,0.2)", 
	  line: {color: "transparent"}, 
	  name: "Premium", 
	  showlegend: false, 
	  type: "scatter"
	};
	var trace3 = {
	  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 
	  y: [11, 9, 7, 5, 3, 1, 3, 5, 3, 1, -1, 1, 3, 1, -0.5, 1, 3, 5, 7, 9], 
	  fill: "tozerox", 
	  fillcolor: "rgba(231,107,243,0.2)", 
	  line: {color: "transparent"}, 
	  name: "Fair", 
	  showlegend: false, 
	  type: "scatter"
	};
	var trace4 = {
	  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
	  y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
	  line: {color: "rgb(0,100,80)"}, 
	  mode: "lines", 
	  name: "Fair", 
	  type: "scatter"
	};
	var trace5 = {
	  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
	  y: [5, 2.5, 5, 7.5, 5, 2.5, 7.5, 4.5, 5.5, 5], 
	  line: {color: "rgb(0,176,246)"}, 
	  mode: "lines", 
	  name: "Premium", 
	  type: "scatter"
	};
	var trace6 = {
	  x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
	  y: [10, 8, 6, 4, 2, 0, 2, 4, 2, 0], 
	  line: {color: "rgb(231,107,243)"}, 
	  mode: "lines", 
	  name: "Ideal", 
	  type: "scatter"
	};
	var data = [trace1, trace2, trace3, trace4, trace5, trace6];
	var layout = {
	  paper_bgcolor: "rgb(255,255,255)", 
	  plot_bgcolor: "rgb(229,229,229)", 
	  xaxis: {
	    gridcolor: "rgb(255,255,255)", 
	    range: [1, 10], 
	    showgrid: true, 
	    showline: false, 
	    showticklabels: true, 
	    tickcolor: "rgb(127,127,127)", 
	    ticks: "outside", 
	    zeroline: false
	  }, 
	  yaxis: {
	    gridcolor: "rgb(255,255,255)", 
	    showgrid: true, 
	    showline: false, 
	    showticklabels: true, 
	    tickcolor: "rgb(127,127,127)", 
	    ticks: "outside", 
	    zeroline: false
	  }
	};
	Plotly.plot(test013, data, layout);

</script>

##### Boxplot

<div id="tester014" style="height:600px;width:600px"></div>
<script>
	function linspace(start, end, cardinality) {
		let arr = [];
		let currVal = start;
		let step = ( end - start ) / ( cardinality - 1 );
		for (let i=0; i < cardinality; i++) {
			arr.push(currVal + (step * i))
		}
		return arr;
	}

	var test014 = document.getElementById("tester014")
	var boxNumber = 30;
	var boxColor = [];
	var allColors = linspace(0, 360, boxNumber);
	var data = [];
	var yValues = [];

	for( var i = 0; i < boxNumber;  i++ ){
	  var result = 'hsl('+ allColors[i] +',50%'+',50%)';
	  boxColor.push(result);
	}

	function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	};

	for( var i = 0; i < boxNumber;  i++ ){
	  var ySingleArray = [];
	    for( var j = 0; j < 10;  j++ ){
	      var randomNum = getRandomArbitrary(0, 1);
	      var yIndValue = 3.5*Math.sin(Math.PI * i/boxNumber) + i/boxNumber+(1.5+0.5*Math.cos(Math.PI*i/boxNumber))*randomNum;
	      ySingleArray.push(yIndValue);
	    }
	  yValues.push(ySingleArray);
	}

	for( var i = 0; i < boxNumber;  i++ ){
	  var result = {
	    y: yValues[i],
	    type:'box',
	    marker:{
	      color: boxColor[i]
	    }
	  };
	  data.push(result);
	};

	var layout = {
	  xaxis: {
	    showgrid: false,
	    zeroline: false,
	    tickangle: 60,
	    showticklabels: false
	  },
	  yaxis: {
	    zeroline: false,
	    gridcolor: 'white'
	  },
	  paper_bgcolor: 'rgb(233,233,233)',
	  plot_bgcolor: 'rgb(233,233,233)',
	  showlegend:false
	};
	Plotly.plot(test014, data, layout)
</script>

##### Horizontal Box Plot

<div id="tester015" style="height:600px;width:600px"></div>
<script>
	var test015 = document.getElementById("tester015")
	var y = ['day 1', 'day 1', 'day 1', 'day 1', 'day 1', 'day 1',
         'day 2', 'day 2', 'day 2', 'day 2', 'day 2', 'day 2']

	var trace1 = {
	  x: [0.2, 0.2, 0.6, 1.0, 0.5, 0.4, 0.2, 0.7, 0.9, 0.1, 0.5, 0.3],
	  y: y,
	  name: 'kale',
	  marker: {color: '#3D9970'},
	  type: 'box',
	  boxmean: false,
	  orientation: 'h'
	};

	var trace2 = {
	  x: [0.6, 0.7, 0.3, 0.6, 0.0, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.2],
	  y: y,
	  name: 'radishes',
	  marker: {color: '#FF4136'},
	  type: 'box',
	  boxmean: false,
	  orientation: 'h'
	};

	var trace3 = {
	  x: [0.1, 0.3, 0.1, 0.9, 0.6, 0.6, 0.9, 1.0, 0.3, 0.6, 0.8, 0.5],
	  y: y,
	  name: 'carrots',
	  marker: {color: '#FF851B'},
	  type: 'box',
	  boxmean: false,
	  orientation: 'h'
	};

	var data = [trace1, trace2, trace3];

	var layout = {
	  title: 'Grouped Horizontal Box Plot',
	  xaxis: {
	    title: 'normalized moisture',
	    zeroline: false
	  },
	  boxmode: 'group'
	};
	Plotly.plot(test015, data, layout)
</script>
