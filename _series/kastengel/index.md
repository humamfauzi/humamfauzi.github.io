---
main: kastengel
layout: series
title: Kastengel
order: kastengel0
page: 0
---

This contain experimental series called kastengel

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