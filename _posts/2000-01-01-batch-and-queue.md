---
layout: construction
title:  Batch and Queue Pattern
category: Dev
tags: [Batch, Design Pattern, Go]
description: We look deeper in batch process and how we apply it as a program
---

1. Batch is a process a task by a computer and store the result. Once the process is done, computer fetch another task and repeat the process until there is no task to fetch
1.1 Batch analogies in real life
1.1.1 Baking a cake process
	Prepare the ingridients
	Preparing environement
	Acknowledge the environment capabilites
	Estimate process time
	Baking
	Evaluating baking result
	Continue the process until all ingredient has run out
	Turning off environment
	Cleaning environment

1.1.2 Movie Theatre process
	Prepare the movie 
	Prearing the environment
	Acknowledge the environemnt capabilities
	Let people with ticket in
	Movie playing
	Cleaning the theathre
	Repeat until the movie is no longer in the theatre

1.2 Similar computation process that need batch process
1.1.1 Computational Phsysics
	Prepare array of variables we need
	Prepare compute environment
	Prepare module needed for computation
	Firing up compute environment
	Load variable to environment
	Let environment churning out data
	Cleaning environment
	Pick next variable in array

1.1.2 Machine Learning
	Prepare the datas
	Prepare what we want to with data
	Prepare compute environment
	Load data to environment
	Let environment optimizing with data
	Clean data
	Load next data to environement and repeat until there is no data anymore

2. Batch and Queue have connection. Since we assume we only have a computer to process task, we need to implement queue system for the task
2.1 Queue systems and why we need it
2.1.1 Not all process can be paralled

2.2 Queue in real life and computational process
2.2.1 Cashier Process
2.2.2 Computational Physics

3. Connecting between batch and queue process, we need to implement Publisher/Subscriber pattern where the publisher is the batch and the subscriber is queue.
3.1 Publisher and Subscriber quick re introduction
3.1.1 Introduction of Publisher, Subscriber and Topics

3.2 Connecting both batch and queue with Pub/Sub pattern
3.2.1 Batch as a publisher and queue as a subscriber

3.3 Implementation in Go
>> Look in batch and queue dev

