---
layout: post
title:  Puppeteer -- Controlled browser environment using NodeJS
category: Dev
tags: [scraping, nodejs]
description: How to use controlled browser environment and how to create test unit based on it
---

What is puppeteer? Pupeteer is a module for emulating browsing experince using [chromium](https://www.chromium.org).
Best thing about pupeteer is it use nodejs for operation so it could combine frontend and backend logic using same language which is javascript.
There are at least two cases why puppeteer is useful. First, it can be used for end to end testing and verify business logic from backend and frontend.
For example, we want to verify that our login page works as we intended to. 
We could tell puppeteer to openup a chromium browser, create new tab, go to our login page URL, fill the username and password, and verify if it is works properly.
We can integrate it with [mocha](https://mochajs.org) and [chai](https://www.chaijs.com) so we have a proper test unit for our login page.
Second, we could utilize puppeteer to scrap from a website.
Let's say we want to fetch the table displayed in a certain website.
We can access the DOM[link to what is DOM is] and get the data such as name and date.
Since it use nodejs, we can user other nodejs module such as MySQL module so we can store our data in a database.
Integrate it with AWS Lambda and we have automatic scrapper. 
Last but not least, it maintained by Google Chrome team so it -- maybe -- won't be abandoned like other similar project.

Here we want to explain the basic usage of puppeteer module.

```javascript
const puppeteer = require('puppeteer');

async initPuppeteer() {
	// Open up the browser
	const browser = await puppeteer.launch();
	
	// Open a tab 
	const page = await browser.newPage();

	// go to page
	await page.goto('http://example.com');
	
	const title = await page.evaluate(() => {
		// insert your front end javascript code here
		return document.querySelector('h1').innerText
	})

	console.log("Title", title)
	
	// Don't forget to close the browser once we done
	await browser.close()
}

initPuppeteer()

```
In code snippet above, we fetch title -- which we assume is inside `h1` tag -- and print it to console. We explain every thing in the comment.
The important part of using puppeter is we need to close the browser once we done with it. If we forget to close it, nodejs will not be terminated.
This is importent when you use puppeteer with AWS Lambda because the billing is based on operation time; measured from start to termination.

So this is basic use of puppeteer. There is a lot of options that we can tweak here and there but for now, let's see how we integrate puppeteer with
mocha test suite


```javascript
// main.js
const puppeteer = require('puppeteer');

const libs = {}

libs.getTitle = async function(page, pageUrl) {
	await page.goto(pageUrl)

	const title = await page.evaluate(() => {
		return document.querySelector('h1').innerText
	})

	return title
}

module.exports = libs
```

We simplify our first snippet and generalize it for every URL and return the title. 

```javascript
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const libs = require('./main')

describe('libs/puppeteer', function() {
	let browser, page;

	before(async function() {
		browser = await puppeteer.launch()
		page = await browser.newPage()
	})

	after(async function() {
		await browser.close();
	})

	it('should fetch title from example.com', function() {
		const pageUrl = 'http://example.com';
		return libs.getTitle(page, pageUrl)
		.then(function(result) {
			expect(result).to.shallowDeepEqual("Example Domain")
		})
	})
})
```

In code snippet above, we create simple test unit to verify `main.js` logic. We have standard mocha testing which consist of `before` and `after`.
We initiate the browser inside `before` so it will ready when we want to use it in each unit testing.
In unit testing, we verify that when `https://example.com` will return title of Example Domain. After we use browser in unit test, we should close it
so the testing sequence ended. Remember, node won't be terminated unless the browser is closed. In a unit test, it will cause in a timeout error.

If we want to test multiple scenario, we can add more page and each page will test different scenario. Roughly it will looks like this

```javascript
const puppeteer = require('puppeteer');
const { expect } = require('chai');
const libs = require('./main')

describe('libs/puppeteer', function() {
	let browser, page1, page2;

	before(async function() {
		browser = await puppeteer.launch();
		([
			page1,
			page2
		] = await Promise.all([
			browser.newPage()
			browser.newPage()
		])
	})

	after(async function() {
		await browser.close();
	})

	it('should fetch title from example.com', function() {
		const pageUrl = 'http://example.com';
		return libs.getTitle(page1, pageUrl)
		.then(function(result) {
			expect(result).to.shallowDeepEqual("Example Domain")
		})
	})

	it('should fetch title from w3c.com', function() {
		const pageUrl = 'https://w3c.org'
		return libs.getTitle(page2, pageUrl)
		.then(function(result) {
			expect(result).to.shallowDeepEqual('W3C')
		})
	})
})
```

This is only scratch the surface of what we could do in a controlled browser environemt. Hope this helps!
