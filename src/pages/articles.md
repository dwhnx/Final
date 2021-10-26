---
pageTitle: Articles
navTitle: Articles
---

## Articles from file system

{% for article in articles %}

<p>
<a href="/article/{{ article.title | slug }}/">
{{ article.title }}
</a>
</p>
{% endfor %}
