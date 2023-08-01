const Discord = require("discord.js");
const ownerID = "916176454679674892";
module.exports = {
  name: "leaveServer",
  aliases: ["ls", "leaveS"],
  description: "To make bot leave server",
  usage: "leaveServer",
  category: "Owner",
  run: async (client, message, args) => {
    if (ownerID) {
      message.channel.send("The bot has left this server");
      setTimeout(() => {
        message.guild.leave();
        console.log(`The bot has left - ${message.guild.name}`);
      }, 1);
    }
  },
};
