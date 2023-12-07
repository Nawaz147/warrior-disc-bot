const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();
const { suffix, token } = require("./config.json");
const db = require("quick.db");

app.use(express.static("/"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/", "index.html"));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

client.on("message", async (message) => {
  if (
    message.content.toLowerCase() === "!restart" &&
    message.author.id === "768747976767832084"
  ) {
    try {
      message.channel.send("Restarting...");
      await client.destroy();
      await client.login(token);
    } catch (error) {
      console.error("Error during restart:", error);
    }
  }
});

const port = "9500";
const server = app.listen(port, "0.0.0.0", () => {
  client.login(token);
  console.log(`Server is running on port ${port}`);
  console.log(`Bot is logged in as ${client.user.tag}`);
});

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 270000);
