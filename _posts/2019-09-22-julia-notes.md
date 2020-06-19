---
layout: post
title: Julia Notes and Reference 
category: CompSci
tags: [julia, reference]
description: Semi-complete and quick reference guide to Julia
---

This is a reference and tips page for Julia 
Will update periodically

### Filter an array
We have array of numbers `a` with zeros in it. We want to remove the zeros.
We use anonymous function `->` similar to javascript. If return true then we will keep
it else we will eliminate it. It is work like javascript lodash library `_.filter`

```
a = [0.0 1.2 3.2 6.2 0.0 0.0 4.8];
filter!(elem -> elem != 0.0, a)
# a = [1.2 3.2 6.2 4.8];
```

### Create an array based on range value
We create range usuallny for enumerating array or appending values.
Sometimes we need a quick array, we can use collect

```
numbers = 1:15
array = collect(numbers)

numbers = range(0, 30, step=0.01
array = coolect(numbers)
```
