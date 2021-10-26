---
pageTitle: Blog
date: 2021-10-24
navTitle: Blog
pageClass: blog
---

{% for post in collections.post %}

<h2>
<a href="{{ post.url }}">{{ post.data.pageTitle }}</a>
</h2>
<em>
{{ post.date | date: "%Y-%m-%d" }}
</em>
{% endfor %}

<!-- 
<section>
  {% for post in collections.posts %}
  <article>
    {{ post.templateContent }} {{ post.date | date: "%Y-%m-%d" }}
  </article>
  {% endfor %}
</section> -->