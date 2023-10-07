const axios = require("axios");

async function fetchRandomJoke() {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");

    if (response.data.type === "twopart") {
      return response.data.setup + " " + response.data.delivery;
    } else {
      return response.data.joke;
    }
  } catch (error) {
    console.error("Error fetching joke:", error.message);
    return "Oops! I couldn't fetch a joke at the moment.";
  }
}

module.exports = {
  fetchRandomJoke,
};
