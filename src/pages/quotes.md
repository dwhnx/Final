---
pageTitle: Quote
navTitle: Quote
pageClass: Quote
---

{% for quotes in collections.quotes %}

<h2>
<a href="{{ quotes.url }}">{{ quotes.data.pageTitle }}</a>
</h2>
<em>
{{ quotes.date | date: "%Y-%m-%d" }}
</em>
{% endfor %}


[Home](/)
