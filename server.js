const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");
const db = require("quick.db");
// Serve static files from the "public" folder
app.use(express.static("/"));

// Handle the root URL and serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Listen for when the bot is ready
const port = "9500";
const listener = app.listen(port, "0.0.0.0", () => {
  console.log("Your app is listening on port " + listener.address().port);
  client.login(token);
  client.on("ready", () => {
    // Create an API endpoint to provide the server count
    app.get("/serverDetails", (req, res) => {
      // Retrieve the server count from your Discord bot's client
      const serverCount = client.guilds.cache.size;
      var botUpdateStatus = db.fetch(`updateInProgress`);
      if (botUpdateStatus == true) {
        botUpdateStatus = "true";
      }
      res.json({ serverCount, botUpdateStatus });
    });
    console.log(`Hi, ${client.user.username} is now online!`);
    console.log("In " + client.guilds.cache.size + " servers!");
    client.user
      .setActivity(`${prefix}`, {
        type: "LISTENING",
      })
      .catch(console.error);
    // app.post("/add-gold-coins", (req, res) => {
    //   const { discordId, token } = req.body; // Get the Discord ID and token from the request body
    //   const tokenDB = db.fetch(`${discordId}.${token}`);

    //   // Check if the provided token is valid (you might need to modify this based on your authentication logic)
    //   // Add 5000 gold coins to the user's balance
    //   db.add(`money_${tokenDB}.pocket`, 5000);

    //   // Send a response indicating success
    //   res.status(200).json({ message: "Gold coins added successfully." });
    //   // Send an error response if the token is not valid
    //   res.status(401).json({ error: "Invalid token." });
    // });
  });

  setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  }, 270000);
});

// Log in your bot with the token
