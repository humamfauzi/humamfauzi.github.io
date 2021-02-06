---
main: web-app
layout: series
title: Introduction
page: 0
---

We explore how to make a web-app using Golang. The app comunicate using REST API. We use MVC approach when designing the app. MVC stands for Model, View and Controller. Model determine what stored in app and how to retrieve it. View concerns about the display of requester information. Controller decide what to do with incoming request and what to reply if there is an error. Most of app boiled down to this component thus understand how the parts do its job and interact with other parts are essentials when design an app.

In this example, we want to create a notification app. Similair like a bell notification in facebook. The basic idea is a user could send a message regarding a certain topic. In facebook, there are many topic such as friends birthday, her post, or her photos. When you follow or accept friend request, facebook think you as  a subcriber to your friends topic. Thus we also need to let other users follow your topic. So when you put something like photos, your friend get a notificiation.

We begin by asking several question that will be answered in each series page. 

- How we design storage system that could handle the app?
- How we deliver it to the front?
- Should we authenticate the user?
- What happen when the notification has been read?

<div>
	<div>
    {% assign series = site.series | sort: "order" %}
    {% for serie in series %}
      {% if serie.main == page.main %}
      {% if serie.page == 0 %}
        {% continue %}
      {% endif %}
        <a href="{{ site.baseurl }}/series/{{ serie.main }}/{{ serie.filename }}"><h5>{{ serie.page }}-{{ serie.filename }}</h5></a>
        <p>{{ serie.description | markdownify }}</p>
      {% endif %}
    {% endfor %}
	</div>
</div>