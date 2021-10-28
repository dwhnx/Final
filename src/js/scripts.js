const key = "3lg0FxwWzSZqRU8YV1NlAjPo5WGQLqTB";
const API = `https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=${key}`;
const storagePrefix = "nyt-autosave";
const halfDay = 1000 * 60 * 60 * 12;


function getStories() {
  const value = getWithExpiry(storagePrefix);
  if (!value) {
    console.log(" expired - fetching again ");
    fetch(API)
      .then((response) => response.json())
      .then((data) => showData(data.results));
  } else {
    document.querySelector(".stories").innerHTML = value;
  }
}


function showData(stories) {
  const looped = stories
    .map(
      (story) => `
      <div class="item">
      <img src="${story.multimedia ? story.multimedia[2].url
          : ""}" alt="${story.multimedia ? story.multimedia[2]?.caption
            : ""}"/>
      <figcaption>${story.multimedia ? story.multimedia[2]?.caption
          : ""}</figcaption>
        <h3>
        <a href="${story.url}"> ${story.title}</a>
        </h3>
        <p>${story.abstract}</p>
      </div>
    `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
  setWithExpiry(storagePrefix, looped, halfDay);
}


if (document.querySelector(".news")) {
  getStories();
}


document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  if (event.target.matches("#pull")) {
    showMenu(event);
    event.preventDefault();
  }
  if (event.target.matches(".content-video a")) {
    videoSwitch(event);
    event.preventDefault();
  }
  if (event.target.matches(".image-tn img")) {
    runCarousel(event);
    event.preventDefault();
  }
}

function showMenu() {
  document.querySelector("body").classList.toggle("show-nav");
}

function videoSwitch(event) {
  const iFrame = document.querySelector("iframe");
  const videoLinks = document.querySelectorAll(".content-video a");
  videoLinks.forEach((videoLink) => videoLink.classList.remove("active"));
  event.target.classList.add("active");
  const videoToPlay = event.target.getAttribute("href");
  iFrame.setAttribute("src", videoToPlay);
}


function runCarousel(event) {
  const imageHref = event.target.parentNode.getAttribute("href");
  const titleText = event.target.title;
  document.querySelector("figure img").src = imageHref;
  document.querySelector("figcaption").innerHTML = titleText;
}


function setWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    console.log("no item string");
    return null;
  }
  console.log("item string found!");
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}