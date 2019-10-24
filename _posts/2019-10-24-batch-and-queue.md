---
layout: post
title:  Batch and Queue Pattern
category: Dev
tags: [Batch, Design Pattern, Go]
description: We look deeper in batch process and how we apply it as a program
---

Batch process is a discrete process -- means it is can be chunked to finite pieces -- that have three states, pre-condition, operation, and post-condition.
Queue is a simple process where any input won't be processed until current process is done. While there is a few queue that doesn't have same process,
this is what people think when they heard queue word. Most common type of batch and queue is in cashier in a shop. Cashier only process what in front of
his/her counter and won't process the next one until done.

To create a batch process, we need to chunk our feed -- or in programming we call it input -- to a acceptable size where acceptable size determined
by operations. Let's say we want to upload very large data. If we upload the whole data, we may encounter upload failure because many cases such as
connection failure and server error. So to make it more manageable, we chunked it to several pieces and upload it one by one. If there is an upload failure,
we don't need to re-upload the whole data; we just need to upload the failure chunk.

Now, we try to create a program that does a thing. Input for this program in finite piece of chunks. If program counter an error while doing operation in 
a certain chunk, the program will try again to opearate this chunk again. This process is repeated until all chunks has been operated. We also need to 
create limit of try-again operation so it won't run forever.

Let's pretend that we want to convert some long text to base64 counter part. We also pretend that converting string to base64 is long and risky process (
it is not). To simulate the failure, we create some random number that if it below certain value -- let's say -- 0.7, it will throw error for that chunk.

```golang
package main

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
)

const (
	PATH_TO_TEXT = "./example.txt"
)

func main() {
	importedString := ImportString(PATH_TO_TEXT)
	base64Result := ConvertToBase64(importedString)
	fmt.Println(base64Result)
}

func ImportString(path string) string {
	buffer, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}
	textFile := string(buffer)
	return textFile
}
func ConvertToBase64(text string) string {
	convertResult := base64.StdEncoding.EncodeToString([]byte(text))
	return convertResult
}
```

Here we have basic converter from a text to a base64. It consumens a text file which declared in `ImportString`. It convert string `importedString` to base 64 encoding.
After we succesfully convert it to a string of base64, we then print it to console. Our main focus is the function `ConvertToBase64`. Let's pretend that we can only
convert 100 byte at a time and there is probability that such process will return error. This is for simulating failure behaviour in batch process. Let's write the function

```golang

func ConvertToBase64(text string) string {
	chunks := Chunker(text, 100)
	randomSeed := rand.NewSource(time.Now().UnixNano());

	finalString := make([]string, (len(text)/100) + 1)
	for i, chunk := range chunks {
		var convertResult string
		if randomSeed.Float64() > 0.7 {
			convertResult = base64.StdEncoding.EncodeToString([]byte(chunk))
		} else {
			convertResult = "ERROR"
		}

		// -- NEED A VALIDATOR
		finalString[i] = convertResult
	}
	joinedString := JoinString(finalString)
	return joinedString
}


func Chunker(text string, chunkSize int) []string {
	chunksLength := (len(text)/chunkSize) + 1
	
	chunks := make([]string, chunksLength)
	
	for i := 0; i < chunksLength; i++ {
		start := i*chunkSize
		end := (i+1) * chunkSize
		
		if i == chunksLength -1 {
			end = len(text)
		}
		
		chunks[i] = text[start:end]
	}
	return chunks
}

func JoinString(arrString []string) string {
	var joinString string
	for _, v := range(arrString) {
		joinString += v
	}
	return joinString
}
```
In the function above, we introduce two new function, `Chunker` and `JoinString`. Chunker is the function which slice text to 100 byte chunks and JoinString is
a function that recombine all processed text. We also introduce new flow before converting our chunked text to base64. If random number generated is below 0.7, 
then it will return error text. From what we have, we need to insert some logic when conversion returns an error instead of base64 conversion. There are two ways
doing this. First, we can re-try that failed chunk until it succeed. Second, we can put the failed chunk to the last queue. Let's build the first one.

```golang
func ConvertToBase64(text string) string {
	chunks := Chunker(text, 100)
	randomSeed := rand.NewSource(time.Now().UnixNano());

	finalString := make([]string, (len(text)/100) + 1)
	for i, chunk := range chunks {
		convertResult := "ERROR"
		for convertResult == "ERROR" {
			if randomSeed.Float64() > 0.7 {
				convertResult = base64.StdEncoding.EncodeToString([]byte(chunk))
			} else {
				convertResult = "ERROR"
			}
		}
		finalString[i] = convertResult
	}
	joinedString := JoinString(finalString)
	return joinedString
}
```

Here we build second loop to make sure any `convertResult` will return as base64 conversion. For second example we use different kind of loop

```golang
func ConvertToBase64(text string) string {
	chunks := Chunker(text, 100)
	randomSeed := rand.NewSource(time.Now().UnixNano());

	finalString := []string{}
	for i := 0; i < len(chunks); i++ {
		var convertResult string
		if randomSeed.Float64() > 0.7 {
			convertResult = base64.StdEncoding.EncodeToString([]byte(chunk[i]))
		} else {
			convertResult = "ERROR"
		}

		if converResult == "ERROR" {
			chunks = append(chunks, chunk[i])
		} else {
			finalString = append(finalString, convertResult)
		}
	}
}
```
In above example, we use different kind of loop because there is append event. So if chunk cannot be translated to base64, it will append the failed chunk to
chunks array. This can be done because every time the loop starts, it evaluate `len(chunks)`. When there is an error, chunks size will increase thus increasing 
the loop limit's. The down side of this kind is it require more memory for appending failed chunks. We also don't get conversion sequentialy, unlike the first process.
We can chopp chunks array if chunk already converted thus failed chunk will fill chopped one. With that in mind, we will use the first example for our batch process.

As for queue, we already implement it. For loops are queue mechanism. We use First In First Out system because we try until it succeed so the order of chunks are guranteed
to be the same as order of feed in. The problem FIFO is if there is an error in chunks, it process stuck 
in that chunk forever. We can overcome this using a try limit for each chunk.

That's all for this post, hope you learn something new and have better arsenal when tackling your problem!
