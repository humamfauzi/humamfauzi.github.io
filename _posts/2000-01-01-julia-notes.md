---
layout: construction
title: Julia Notes and Reference 
category: CompSci
tags: [julia, reference]
description: Semi-complete and quick reference guide to Julia
---

This is a reference page for Julia

##### Filter an array
We have array of numbers `a` with zeros in it. We want to remove the zeros.
We use anonymous function `->` similar to javascript. If return true then we will keep
it else we will eliminate it.

```
a = [0.0 1.2 3.2 6.2 0.0 0.0 4.8];
filter!(elem -> elem != 0.0, a)
# a = [1.2 3.2 6.2 4.8];
```
