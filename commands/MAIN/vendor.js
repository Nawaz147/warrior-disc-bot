const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const halloweenEvent = require("./halloweenEvent");
const { log } = require("mathjs");

module.exports = {
  name: "vendor",
  aliases: ["Vendor"],
  description: "To see event vendor",
  usage: "vendor",
  category: "Economy",
  run: async (client, message, args) => {
    const user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    var vendorCode = args[0];
    var halloweenEventActive =
      db.fetch(`halloweenEventActive_${tokenDB}`) || false;
    if (vendorCode == "halo360" && halloweenEventActive == true) {
      console.log("Vendor to be added");
      return;
    } else {
      const invalidCode = new Discord.MessageEmbed()
        .setDescription(`Vendor not found`)
        .setColor(`#8B0000`);
      message.channel.send(invalidCode);
    }
  },
};
