const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "balance",
  aliases: ["bal", "balanc"],
  description: "To see balance",
  usage: "balance",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;
    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      bal = await db.fetch(`money_${tokenDB}.pocket`);
      // goldenTokens = db.fetch(`goldenTokens_${tokenDB}`);
      // if (goldenTokens === null) goldenTokens = "0";
      // if (goldenTokens === undefined) goldenTokens = "0";
      if (bal === null) bal = "0";
      if (bal === undefined) bal = "0";
      bal = bal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      platinum = await db.fetch(`platinum_${tokenDB}`);
      if (platinum === null) platinum = "0";
      if (platinum === undefined) platinum = "0";
      platinum = platinum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      keys = await db.fetch(`key_${tokenDB}`);
      if (keys === null) keys = "0";
      if (keys === undefined) keys = "0";
      keys = keys.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var channel = message.guild;

      //       if (vip === true) {
      //         moneyEmbed.setFooter("😎");
      //       }
      //       if (vip === null) {
      //         moneyEmbed.setFooter(" 😐");
      //       }
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let fullDate = `${day}.${month}.${year}.`;
      const displayName = user.username;

      // Calculate the font size for the username to fit it in the center
      const nameFontSize = Math.min(35, 400 / displayName.length);

      // Create the canvas
      let canvas = Canvas.createCanvas(400, 200);
      let ctx = canvas.getContext("2d");
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a background image
      ctx.globalAlpha = 0.5; // Adjust the opacity value here (e.g., 0.5 for 50% opacity)
      const background = await Canvas.loadImage(
        "https://i.ibb.co/d7160bY/galaxy.jpg"
      );

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1; // Adjust the opacity value here (e.g., 0.5 for 50% opacity)

      // Write text to canvas
      // At the top of canvas, write user name with the dynamically adjusted font size
      ctx.font = `${nameFontSize}px Impact`;
      ctx.fillStyle = "#99DF26";
      ctx.textAlign = "center"; // Center the text horizontally
      ctx.fillText(`${displayName}'s Balance`, canvas.width / 2, 40);

      // Set the font for other texts
      ctx.font = "23px Kelpt A1";
      ctx.fillStyle = "#E1B530";

      // Calculate the fixed position for each text
      const textYPositions = {
        goldCoins: 85,
        platinum: 125,
        keys: 160,
      };

      // Write the other texts in their fixed positions
      ctx.fillStyle = "#E1B530";
      ctx.fillText(`Gold coins :`, 55, textYPositions.goldCoins);
      ctx.fillStyle = "#E5E4E2";
      ctx.fillText(`Platinum :`, 50, textYPositions.platinum);
      ctx.fillStyle = "#FF0000";
      ctx.fillText(`Keys :`, 34, textYPositions.keys);

      // Continue writing the values at their appropriate locations
      ctx.fillStyle = "#E1B530";
      ctx.fillText(bal, 150, textYPositions.goldCoins); // Adjust the x-coordinate here
      ctx.fillStyle = "#E5E4E2";
      ctx.fillText(platinum, 150, textYPositions.platinum); // Adjust the x-coordinate here
      ctx.fillStyle = "#FF0000";
      ctx.fillText(keys, 150, textYPositions.keys); // Adjust the x-coordinate here

      // Continue writing the remaining text with regular font and original x-coordinate
      ctx.fillStyle = "#ffffff";
      ctx.font = "16px Montserrat";
      ctx.fillText(`Date: ${fullDate}`, canvas.width / 1.2, 190);

      // ... your existing code ...

      // Send the canvas
      message.channel.send(
        new Discord.MessageAttachment(
          canvas.toBuffer(),
          `${user.username}'s Balance.png`
        )
      );

      bal = db.fetch(`money_${tokenDB}.pocket`);
      platinum = db.fetch(`platinum_${tokenDB}`);
    }
  },
};
