---
layout: post
title:  Exploring Eliptic Curve
category: CompSci
Tags: [Plot, Simulation]
description: Explaination of RESTful web API and JWT implementation
---

An eliptic curve can be described using math
$$ y^2 = x^3 + ax + b $$

There are few interesting part of this equation. If the right hand side is less than zero, then $y$ is imaginary number. In some $a$ and $b$, eliptic curve could have an 'island'. This island is caused by $x$ raised to the power of three.

Here we want to show the plot of $x$ and $y$ in certain $a$ and $b$. We can slide the $a$ and $b$ to show how the eliptic curve evolve.

<div id="experiment" style="width:600px;height:250px;"></div>
<script>
	let experiment = document.getElementById("experiement");
	let traces = [];

	let frames = [];
	let sliderStep = [];
	for() {
		let slider = {
			method: 'animate',
			label: 'A value',
			args: [traces[i]]
		}
	}
	

</script>
<div id="eliptic" style="width:600px;height:250px;"></div>
<script>
	// LOOKS LIKE IT IS HARDER THAN I EXPECTED; WE NOW TARGET TO ANIMATE A PARTICLE IN A CARTESIAN COORDINATE
	// SINCE WE DON'T GET THE IDEA THE CONNECTION BETWEEN FRAMES, SLIDES AND TRACES;
	// WE ONLY USER SINGLE PARAMETER ONLY 'A' FOR THIS EXAMPLE FOR NOW
	async function getJson(url) {
		let ans = await fetch(url);
		return res.json()
	}
	let jsonUrl = "https://raw.githubusercontent.com/humamfauzi/humamfauzi.github.io/master/assets/json/eliptic.json";
	let mainData = getJson(jsonUrl);

	let eliptic = document.getElementById("eliptic");
	
	// DATA TRACES
	let traces = [];
	for (let data of mainData) {
		let data = {
			x: [1, 2],
			y: [2, 3]
		}
		traces.push(data)
	}

	// FRAMES 
	let frames = [] 
	for () { let frame = {
			name: "a",
			data: mainData["a"] // ARRAY 
		}
		frames.push(frame)
	}

	// SLIDERS 
	let sliderStepsA = [];
	for(let slider of) {
		let slider = {
			method: 'animate',
			label: 'A value',
			args: [mainData['a']], {
				mode: 'immediate',
				transition: { duration: 300 },
				frame: { duration: 300, redraw: false },
			}]
		}
		sliderStepsA.push(slider)
	}
	/*
	let sliderStepsB = [];
	for() {
		let slider = {
			method: 'animate',
			label: 'SAME AS FRAME NAME',
			args: [['SAME AS FRAME SOURCE'], {
				mode: 'immediate',
				transition: { duration: 300 },
				frame: { duration: 300, redraw: false },
			}]
		}
		sliderStepsB.push(slider)
	}
*/	
	let layout = {
		xaxis: {
			title: "X value",
			range: [-2, 2]
		},
		yaxis: {
			title: "Y value",
			range: [-2, 2]
		},
		hovermode: 'closest',
		sliders: [
			{
				pad: {l: 130, t:55},
				currentValue: {
					visible: true,
					prefix: 'a value',
					xanchor: 'right',
					font: {size: 20, color: '#666'}
				},
				steps: sliderStepsA
			}/*,
			{
				pad: {l: 130, t: 70},
				currentValue: {
					visible: true,
					prefix: 'b value',
					xanchor: 'right',
					font: { size: 20, color: '#666'}
				},
				steps: sliderStepsB
			}*/
		]
	}

	let component = {
		data: traces,
		layout: layout,
		frames: frames
	}
	Plotly.plot(eliptic, component)
</script>
