---
layout: construction
title:  Batch and Queue Pattern
category: Dev
tags: [Design Pattern, Go]
description: Simple is a beautiful but functional jekyll theme. The font-type setting looks really good when writers use CJK mixed with English.
---

1. Batch is a process a task by a computer and store the result. Once the process is done, computer fetch another task and repeat the process until there is no task to fetch
2. Batch and Queue have connection. Since we assume we only have a computer to process task, we need to implement queue system for the task
3. Connecting between batch and queue process, we need to implement Publisher/Subscriber pattern where the publisher is the batch and the subscriber is queue.

