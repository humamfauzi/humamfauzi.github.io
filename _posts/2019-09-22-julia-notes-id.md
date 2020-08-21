---
layout: post
title: Referensi dan Catatan Tentang Julia 
categories: [id, CompSci]
tags: [julia, reference]
description: Referensi dalam menggunakan bahasa pemograma julia 
---

Halaman ini adalah referensi dan tips singkat dalam menggunakan bahasa pemograman julia
akan diperbaharui secara berkala apabila sedang berkenan. Versi bahasa inggris dapat ditemukan [disini]({% post_url 2019-09-22-julia-notes-en %})

#### Mensortir array
Diketahui array `a` memiliki nilai 0. Nilai 0 harus diambil dari array tersebut.
Julia memiliki notasi fungsi anonim `->` yang mirip dengan javascript. Fungsi `filter!` memiliki dua buah masukan. Pertama adalah fungsi penyortir. Fungsi penyortir harus mengembalikan nilai `true` apabila tidak ingin dieliminasi dari array. Kedua adalah array yang ingin disortir. Cara kerjanya mirip dengan fungsi lodash `_.filter` pada javascript hanya saja posisi input terbalik.

```
a = [0.0 1.2 3.2 6.2 0.0 0.0 4.8];
filter!(elem -> elem != 0.0, a)
# a = [1.2 3.2 6.2 4.8];
```


#### Membagun sebuah array dari range
Untuk menciptakan sebuah array, digunakan fungsi `collect` yang memiliki input sebuah range angka. Ini hampir sama dengan `range` dalam Python. Hanya saja dalam python dibutuhkan `list` untuk menjadikannya array sedangkan pada julia dibutuhkan `collect`

```
numbers = 1:15
array = collect(numbers)

numbers = range(0, 30, step=0.01)
array = collect(numbers)
```
