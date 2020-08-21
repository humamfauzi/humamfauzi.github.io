---
layout: post
title:  Puppeteer -- modul untuk mengendalikan browser dari NodeJS
categories: [id, Dev]
tags: [scraping, nodejs]
description: Artikel ini mejelaskan tentang puppeteer dan bagaimana cara menggunakanya untuk testing dan scraping.
---

Pupeteer adalah modul yang dapat mensimulasikan kegiatan browsing menggunakan [chromium](https://www.chromium.org).
Hal yang menarik dari puppeteer ini adalah menggunakan NodeJS yang berdasarkan javascript sehingga menggabungkan code Frontend dan Backend dalam satu bahasa.
Setidaknya ada dua hal yang membuat puppeteer berguna. 

Pertama adalah menggunkan puppeteer sebagai bentuk end-to-end testing yang dapat mengerjakan frontend maupun backend.
Contohnya adalah memverifikasi bahwa halaman login yang digunakan oleh user sudah berjalan dengan baik dan benar. 
Developer dalam menuliskan puppeteer untuk membuka browser, membuat tab baru, membuat tab tersebut mengakses halaman web, mengambil elemen dari halaman web tersebut dan menampilkanya pada log.
Kita dapat menggabungkannya dengan [mocha](https://mochajs.org) dan [chai](https://www.chaijs.com) sehingga kita memiliki satu test unit lengkap.

Kedua, kita juga dapat menggunakan pupeteer sebagai pembongkar (scrap) suatu halaman web.
Asumsilah kita ingin mengambil data tabel yang ada pada suatu halaman web.
Kita dapat mengakses [DOM](https://www.w3.org/TR/DOM-Level-2-Core/introduction.html) dan mengambil data seperti nama dan tanggal yang tercantum pada halaman.
Data yang sudah diambil dapat diolah lebih lanjut seperti disaring atau disimpan dalam database. Ini dapat dikerjakan karena berbasis NodeJS.
Apabila diintegrasikan dengan AWS Lambda atau layanan serverless lain, maka pekerjaan dapat diotomasi.

> Untuk AWS Lambda, puppeteer disarankan ditempatkan pada suatu fungsi khusus mengingat pupeteer mengambil banyak memori karena harus memuat chromium.

Terakhir, pupeteer dirawat oleh tim chrome dari google sehingga kecil kemungkinan akan ditelantarkan.

## Penggunaan
Pada bagian ini dijelaskan cara dasar menggunakan pupeteer.

```javascript
const puppeteer = require('puppeteer');

async initPuppeteer() {
	// Membuka pupeteer
	const browser = await puppeteer.launch();
	
	// Membuka tab kosong
	const page = await browser.newPage();

	// Pilih halaman web yang akan dituju
	await page.goto('http://example.com');
	
	const title = await page.evaluate(() => {
		// code javascript FE dapat digunakan disini
		return document.querySelector('h1').innerText
	})

	console.log("Title", title)
	
	// Setelah beres, browser harus ditutup kembali
	await browser.close()
}

initPuppeteer()

```
Pada cuplikan kode di atas, kita mengabil judul --asumsi bahwa judul selalu ada pada tag `h1`--dan ditampilkan pada terminal menggunakan `console.log`.

Yang penting dari cuplikan diatas adalah pupeteer harus ditutup. Apabila tidak ditutup maka program node akan menolak untuk beres sehingga harus diakhiri dengan `ctrl + c`. Ini akan lebih berbahaya apabila sudah ada pada AWS Lambda. Penagihan akan selalu maksimal pada setiap pemanggilan. 

Selanjutnya akan diperlihatkan bagaimana mengintegrasi mocha dengan pupeteer.

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

Sama seperti sebelumnya, disajikan fungsi yang mengambil tag `h1` pada suatu halaman web.

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

Pada cuplikan kode diatas, dibuat sebuah test sederhana untuk memastikan fungsi pada `main.js`. Pupeteer biasanya diinisiasi pada bagian `before`. Variabel yang mengandung pupeteer dideklarasi lebih dahulu agar setiap bagian memiliki akses ke pupeteer.

Pada test, fungsi `main.js` diuji untuk mengambil judul pada halaman web `https://example.com`. Apabila digunakan cara manual, tag `h1` akan menghasilkan *Example Domain*. Tentunya kita berharap bahwa fungsi `main.js` juga menghasilkan kata yang sama.

Bagian after harus mengandung `.close()` agar test bisa dianggap selesai oleh mocha.

Jika ingin menggunakan untuk beberapa halaman, kira-kira bentuk kode akan seperti cuplikan dibawah ini.

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
Ini hanya menjadi dasar dari penggunaan pupeteer baik untuk testing maupun untuk scraping. Banyak trik yang dapat diterapkan khususnya untuk halaman web yang lebih dinamis.

Demikian penjelasan dibuat. Semoga bermanfaat dan selamat bereksperimen.
