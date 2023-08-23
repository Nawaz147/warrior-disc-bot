const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");

module.exports = {
  name: "open",
  aliases: ["opn", "Open", "oPeN", "OpEn"],
  description: "To open an item",
  usage: "open",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);
    var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    var currentUser = message.author;
    var currentUserToken = db.fetch(`${currentUser.id}.valoriumToken`);
    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet , type +token me to set your Valorium token`
      );
    } else if (banned == true && !message.mentions.users.first()) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`Your account has been banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (banned == true && message.mentions.users.first()) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`That user's account has been banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (update == true && message.author.id !== "768747976767832084") {
      const updateInProgressEmbed = new Discord.MessageEmbed()
        .setTitle(`Temporary Command Suspension`)
        .setDescription(
          `
Sorry ${currentUser.username} , commands are disabled at the moment.
The bot is currently undergoing an update. Please be patient!          
`
        )
        .setColor("#3498db")
        .setTimestamp();
      message.channel.send(updateInProgressEmbed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (acceptedTOS == false && !message.mentions.users.first()) {
      const acceptTOSembed = new Discord.MessageEmbed()
        .setTitle(`Failed to proceed`)
        .setDescription(
          `
You need to accept the terms of service for using this discord bot!
Type **+tos** to check the terms of service.
Type **+tos accept** to accept the terms of service.
`
        )
        .setColor("#808080");
      message.channel.send(acceptTOSembed);
      db.add(`uselessUsageOfCommand_${currentUserToken}`, 1);
    } else if (acceptedTOS == false && message.mentions.users.first()) {
      const acceptTOSembed = new Discord.MessageEmbed()
        .setTitle(`Failed to proceed`)
        .setDescription(
          `
${user.username} has not yet accepted the terms of service
`
        )
        .setColor("#808080");
      message.channel.send(acceptTOSembed);
      db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
    } else {
      const unlockedCrateOfEnergy =
        db.fetch(`unlockedCrateOfEnergy_${tokenDB}`) || 0;
      if (args[0] == "unlockedCrateOfEnergy") {
        if (unlockedCrateOfEnergy < 1) {
          message.channel.send(
            `${user} you don't have any Unlocked crate of energy`
          );
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else if (!unlockedCrateOfEnergy) {
          message.channel.send(
            `${user} you don't have any Unlocked crate of energy`
          );
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else {
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
          const goldChance = 0.85; // 85% chance to get gold
          const platinumChance = 0.1; // 10% chance to get platinum
          const vanityChance = 0.035; // 3.5% chance to get vanity
          const weaponChance = 0.015; // 1.5% chance to get weaponsconst minPlatinum = 5;
          const maxPlatinum = 25;
          const minGold = 2000;
          const maxGold = 12000;
          db.subtract(`unlockedCrateOfEnergy_${tokenDB}`, 1);
          let reward = "";
          const rewardType = Math.random();

          if (rewardType < goldChance) {
            var goldAmount = Math.floor(
              Math.random() * (maxGold - minGold + 1) + minGold
            );
            // Add gold to the user's tokenDB
            db.add(`money_${tokenDB}.pocket`, goldAmount);
            goldAmount = goldAmount
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            reward = `${goldAmount} Gold Coins`;
          } else if (rewardType < goldChance + platinumChance) {
            const platinumAmount = Math.floor(
              Math.random() * (maxPlatinum - minPlatinum + 1) + minPlatinum
            );
            // Add platinum to the user's tokenDB
            db.add(`platinum_${tokenDB}`, platinumAmount);
            reward = `${platinumAmount} Platinum`;
          } else if (rewardType < goldChance + platinumChance + vanityChance) {
            const vanities = [
              "Medusa set",
              "Supreme magical set",
              "Intrepid set",
            ];
            const randomVanity =
              vanities[Math.floor(Math.random() * vanities.length)];
            if (randomVanity == "Medusa set") {
              db.add(`medusaSet_${tokenDB}`, 1);
            } else if (randomVanity == "Supreme magical set") {
              db.add(`supremeMagicalSet_${tokenDB}`, 1);
            } else if (randomVanity == "Intrepid set") {
              db.add(`intrepidSet_${tokenDB}`, 1);
            }
            reward = randomVanity;
          } else if (
            rewardType <
            goldChance + platinumChance + vanityChance + weaponChance
          ) {
            const weapons = [
              "Texarus the demonished staff",
              "Waetra the freezed bow",
              "Rasheta the furious axe",
              "Nature daggers of superpower",
              "Immortal gun of energy",
              "Dagger of death",
            ]; // Replace with actual weapon names
            const randomWeapon =
              weapons[Math.floor(Math.random() * weapons.length)];
            if (randomWeapon == "Texarus the demonished staff") {
              db.add(`texarus_${tokenDB}`, 1);
            } else if (randomWeapon == "Waetra the freezed bow") {
              db.add(`waetra_${tokenDB}`, 1);
            } else if (randomWeapon == "Rasheta the furious axe") {
              db.add(`rasheta_${tokenDB}`, 1);
            } else if (randomWeapon == "Nature daggers of superpower") {
              db.add(`natureDaggers_${tokenDB}`, 1);
            } else if (randomWeapon == "Immortal gun of energy") {
              db.add(`immortalGun_${tokenDB}`, 1);
            } else if (randomWeapon == "Dagger of death") {
              db.add(`daggerOfDeath_${tokenDB}`, 1);
            }
            reward = `+ ${randomWeapon} +`;
          }

          // Decrease the number of crate pieces by 1

          // Send a message to the user about the looted reward
          const rewardEmbed = new Discord.MessageEmbed()
            .setTitle(user.username)
            .setDescription(`You received: ${reward}`)
            .setColor("#228B22");
          message.channel.send(rewardEmbed);
        }
      }
      if (args[0]) {
        if (args[0] !== "unlockedCrateOfEnergy") {
          message.channel.send(
            `*Invalid item name [item named **${args[0]}** does not exist*]  , Usage eg : +open unlockedCrateOfEnergy`
          );
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        }
      }
    }
  },
};
