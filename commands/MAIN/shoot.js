const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;

module.exports = {
  name: "shoot",
  aliases: ["Shoot", "shoot"],
  description: "To shoot a user",
  usage: "shoot",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);
    const mentionedUser =
      message.mentions.users.first() || client.users.cache.get(args[0]);
    const mentionedUserTokenDB = db.fetch(`${mentionedUser.id}.valoriumToken`);
    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet, type +token me to set your Valorium token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else if (update == true) {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
      // Get the number of soldiers for the user and the mentioned user
      const userSoldiers = db.fetch(`soldiers_${tokenDB}`) || 0;
      const mentionedSoldiers =
        db.fetch(`soldiers_${mentionedUserTokenDB}`) || 0;

      // Check if the user has a bullet
      const bullet = db.fetch(`bullet_${tokenDB}`) || 0;

      if (bullet <= 0) {
        message.channel.send("You don't have any bullets to shoot!");
        return;
      } else if (userSoldiers <= 0) {
        message.channel.send("You cannot attack without any soldiers!");
        return;
      } else if (userSoldiers > mentionedSoldiers) {
        // Send a message to the mentioned user

        // Delete tokenDB of the mentioned user
        db.subtract(`bullet_${tokenDB}`, 1);
        message.channel.send({
          embed: {
            color: "#FF0000",
            title: `Victory`,
            description: `${user.username} You killed ${mentionedUser}`,
            thumbnail: {
              url: user.displayAvatarURL({ dynamic: true }),
            },
          },
        });
        db.delete(`${mentionedUser.id}.valoriumToken`);
        db.add(`battlesWon_${tokenDB}`, 1);
        const mentionedUserDM = await mentionedUser.createDM();
        mentionedUserDM.send({
          embed: {
            color: "#FF0000",
            title: "You were defeated!",
            description: `You were killed by the army of ${user.username}.`,
            thumbnail: {
              url: user.displayAvatarURL({ dynamic: true }),
            },
          },
        });
      } else {
        db.subtract(`bullet_${tokenDB}`, 1);
        const userDM = await user.createDM();

        mentionedUser.send({
          embed: {
            color: "#FF0000",
            title: "You were attacked!",
            description: `You were attacked by the army of ${user.username} . But you won!`,
            thumbnail: {
              url: user.displayAvatarURL({ dynamic: true }),
            },
          },
        });
        message.channel.send({
          embed: {
            color: "#FF0000",
            title: "You were defeated!",
            description: `${user.username} You were killed by the army of ${mentionedUser.username}.`,
            thumbnail: {
              url: mentionedUser.displayAvatarURL({ dynamic: true }),
            },
          },
        });
        // Delete tokenDB of the user
        db.delete(`${user.id}.valoriumToken`);
      }
    }
  },
};
