---
layout: page
title: Homepage
permalink: /
---

The phone display still on construction, i still learning how to adapt the layout and other stuffs in
mobile devices but i already try several stuffs.

I finally build series mechanism. Hopefully will write series soon.

Below you can navigate to three most recent post i made

<div class="post-list">
    {% for post in site.posts limit:3 %}
    <article class="post_card post">
      <header class="post_header">
        <h5 class="post_title"><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title}}</a></h5>
        <time class="post_date">{{ post.date | date: "%d %B %Y, %A" }}</time>
        {% for category in post.categories %}
	<small>
        <a href="{{"/category/#" | append: category | prepend: site.baseurl }}">
          <data data-icon="ei-paperclip"></data>
          {{category}}</a>
	</small>
        {% endfor %}
      </header>
      <div class="post_excerpt">
        <p>
          {% if post.description %}
          {{ post.description}}
          {% else %}
          {{ post.excerpt }}
          {% endif %} 
          <a class="read-more" href="{{ post.url | prepend: site.baseurl }}"> »  </a>
        </p> 
      </div>
    </article>
    {% endfor %}
  </div>