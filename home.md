---
layout: page
title: Homepage
permalink: /
---

Welcome to my notes, while i work in no-longer-working burger button. Phone user could use this homepage to naviagate around site. There are six navigation. First is [category]({{ site.baseurl }}/category) which contain post that already grouped by its category. Second is Series which is a multiple post about something. I still work on that one. Third is [tags]({{ site.baseurl }}/tags) which similar like category but consist of multiple things. For example, a certain post could be about tech and math at the same time. Fourth, there is [archive]({{ site.baseurl }}/archive) where all post contained. Last but not least, is [about]({{ site.baseurl }}/about) which you can learn more about me. I have zero idea what RSS means anyway.

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