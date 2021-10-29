const key = "onWAI4yAW75oZYDp6dmolPsHlQSZFozG";
const API = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${key}`;

const localPrefix = "nyt-local";
const halfDay = 1000 * 60 * 60 * 12;

// Fetch from nyu movie review if local storage not found
function getReviews() {
  const value = getExpiry(localPrefix);
  if (!value) {
    console.log(" expired after 12 hours - fetching again ");
    fetch(API)
      .then((response) => response.json())
      .then((data) => showData(data.results));
  } else {
    document.querySelector(".reviews").innerHTML = value;
  }
}


function showData(reviews) {
  const looped = reviews
    .map(
      (review) => `
      <div class="item">   
      <img src="${review.multimedia.src}"/>
      <figcaption>${review.byline}</figcaption>    
      <h3>
      <a href="${review.link.url}">${review.headline}</a>
      </h3>
        <p>${review.summary_short}</p>
      </div>
    `
    )
    .join("");

  document.querySelector(".reviews").innerHTML = looped;
  setExpiry(localPrefix, looped, halfDay);
}


if (document.querySelector(".reviews")) {
  getReviews();
}


document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  if (event.target.matches("#pull")) {
    showMenu(event);
    event.preventDefault();
  }
  if (event.target.matches(".content-video a")) {
    openVideo(event);
    event.preventDefault();
  }
  if (event.target.matches(".image-tn img")) {
    runPanel(event);
    event.preventDefault();
  }
}

function showMenu() {
  document.querySelector("body").classList.toggle("show-nav");
}

function openVideo(event) {
  const iFrame = document.querySelector("iframe");
  const videoLinks = document.querySelectorAll(".content-video a");
  videoLinks.forEach((videoLink) => videoLink.classList.remove("active"));
  event.target.classList.add("active");
  const videoToPlay = event.target.getAttribute("href");
  iFrame.setAttribute("src", videoToPlay);
}


function runPanel(event) {
  const imageHref = event.target.parentNode.getAttribute("href");
  const titleText = event.target.title;
  document.querySelector("figure img").src = imageHref;
  document.querySelector("figcaption").innerHTML = titleText;
}


function setExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    console.log("local storage not found");
    return null;
  }
  console.log("local storage found!");
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}