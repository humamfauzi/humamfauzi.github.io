---
layout: post
title: Plotting 
category: CompSci
tags: [Visualization, test, reference]
description: Attempt to create a plot inside a markdown
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
