---
layout: post
title: Plotting 
category: Computational Science
tags: [Visualization, test]
description: Attempt to create a plot inside a markdown
---
This is an attempt to create a plot in a markdown page. While we succeed inserting math equation to post, we need to insert plot so we can
explain things much clearer

<div id="tester" style="width:600px;height:250px;"></div>
<script>
	TESTER = document.getElementById("tester");
	Plotly.plot(TESTER, [{
		x: [1, 2, 3, 4, 5],
		y: [1, 2, 4, 8, 16]
		}], { margin: { t:0 } } );
					
</script>

