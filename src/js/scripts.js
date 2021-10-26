var API =
  "https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=3lg0FxwWzSZqRU8YV1NlAjPo5WGQLqTB";


function getStories() {
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  console.log(" sample ", stories[0]);
  var looped = stories
    .map(
      (story) => `
      <div class="item">

      <picture>
      <img src="${story.multimedia
          ? story.multimedia[2].url
          : "http://placekitten.com/200/200"
        }" alt="" />
      <caption>${story.multimedia[2].caption}</caption>
      </picture>

        <h3>
        <a href="${story.url}"> ${story.title}</a>
        </h3>
        <p>${story.abstract}</p>
      </div>
    `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
}


if (document.querySelector(".home")) {
  getStories();
}

