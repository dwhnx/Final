const fetch = require("node-fetch");

API =
"https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=3lg0FxwWzSZqRU8YV1NlAjPo5WGQLqTB";

module.exports = function () {
  return new Promise((resolve, reject) => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => resolve(data.results))
      .catch((e) => reject(e));
  });
};
