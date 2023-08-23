const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const rasheta = require("../../weaponStats/rashetaAxe.json");
const waetra = require("../../weaponStats/waetraBow.json");
const texarus = require("../../weaponStats/texarusStaff.json");
const natureDaggers = require("../../weaponStats/natureDaggers.json");
const ventorianBow = require("../../weaponStats/ventorianBow.json");
const immortalGun = require("../../weaponStats/immortalGun.json");
const daggerOfDeath = require("../../weaponStats/daggerOfDeath.json");
const weaponNames = require("../../weapons.json");
module.exports = {
  name: "weaponInfo",
  aliases: [
    "WepInfo",
    "wepinfo",
    "weaponinfo",
    "weaponInfo",
    "wepInfo",
    "weapInfo",
    "weapinfo",
  ],
  description: "To check info of weapons",
  usage: "wepInfo",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);
    const daggerOfDeathXP = db.fetch(`daggerOfDeathXP_${tokenDB}`) || 0;
    const daggerOfDeathLevel = db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;
    if (daggerOfDeathLevel > 0) {
      var daggerOfDeathDamage = db.fetch(`daggerOfDeathDamage_${tokenDB}`);
    } else {
      daggerOfDeathDamage = daggerOfDeath.Damage;
    }
    const xpLevels = [
      { threshold: 35, level: 2 },
      { threshold: 70, level: 3 },
      { threshold: 156, level: 4 },
      { threshold: 360, level: 5 },
      { threshold: 700, level: 6 },
      { threshold: 1280, level: 7 },
      { threshold: 1940, level: 8 },
      { threshold: 2642, level: 9 },
    ];
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
      if (args[0] === "texarus") {
        var equippedTexarus = db.fetch(`equippedTexarus_${tokenDB}`);
        if (!equippedTexarus) {
          var equippedTexarus = "False";
        }
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);

        const texarusEmbed = new Discord.MessageEmbed()
          .setColor("#D139F2")
          .setTitle(weaponNames.texarus)
          .setDescription(texarus.description)
          .addField("Damage", texarus.Damage)
          .addField("Type", texarus.type)
          .addField("Equipped", equippedTexarus)
          .addField("Rarity", texarus.rarity)
          .setThumbnail(
            "https://i.ibb.co/3v9n6Bx/Texarus-the-demonished-staff.png"
          );
        message.channel.send(texarusEmbed);
      }

      if (args[0] === "waetra") {
        var equippedWaetra = db.fetch(`equippedWaetra_${tokenDB}`);
        if (!equippedWaetra) {
          var equippedWaetra = "False";
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        }
        const waetraEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.waetraBow)
          .setDescription(waetra.description)
          .addField("Damage", waetra.Damage)
          .addField("Type", waetra.type)
          .addField("Equipped", equippedWaetra)
          .addField("Rarity", waetra.rarity)
          .setThumbnail("https://i.ibb.co/dmVmnwz/waetra-the-freezed-bow.webp");
        message.channel.send(waetraEmbed);
      }
      if (args[0] == "ventorianBow") {
        var equippedVentorianBow = db.fetch(`equippedVentorianBow_${tokenDB}`);
        if (!equippedVentorianBow) {
          var equippedVentorianBow = "False";
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        }
        const ventorianBowEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.ventorianBow)
          .setDescription(ventorianBow.description)
          .addField("Damage", ventorianBow.Damage)
          .addField("Type", ventorianBow.type)
          .addField("Equipped", equippedVentorianBow)
          .addField("Rarity", ventorianBow.rarity)
          .setThumbnail("https://i.ibb.co/vs0DwDj/bow.png");
        message.channel.send(ventorianBowEmbed);
      }

      if (args[0] == "immortalGun") {
        var equippedImmortalGun = db.fetch(`equippedImmortalGun_${tokenDB}`);
        if (!equippedImmortalGun) {
          var equippedImmortalGun = "False";
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        }
        const immortalGunEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.immortalGun)
          .setDescription(immortalGun.description)
          .addField("Damage", immortalGun.Damage)
          .addField("Type", immortalGun.type)
          .addField("Equipped", equippedImmortalGun)
          .addField("Rarity", immortalGun.rarity)
          .setThumbnail("https://i.ibb.co/crzLQYB/gun.png");
        message.channel.send(immortalGunEmbed);
      }

      if (args[0] === "natureDaggers") {
        // const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
        var equippedNatureDaggers = db.fetch(
          `equippedNatureDaggers_${tokenDB}`
        );
        if (!equippedNatureDaggers) {
          var equippedNatureDaggers = "False";
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        }
        const natureDaggersEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.natureDaggers)
          .setDescription(natureDaggers.description)
          .addField("Damage", natureDaggers.Damage)
          .addField("Type", natureDaggers.type)
          .addField("Equipped", equippedNatureDaggers)
          .addField("Rarity", natureDaggers.rarity)
          .setThumbnail("https://i.ibb.co/pJkCgK2/daggers.png");
        message.channel.send(natureDaggersEmbed);
      }
      if (args[0] === "rasheta") {
        var equippedRasheta = db.fetch(`equippedRasheta_${tokenDB}`);
        if (!equippedRasheta) {
          var equippedRasheta = "False";
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        }
        const rashetaEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.rasheta)
          .setDescription(rasheta.description)
          .addField("Damage", rasheta.Damage)
          .addField("Type", rasheta.type)
          .addField("Equipped", equippedRasheta)
          .addField("Rarity", rasheta.rarity)
          .setThumbnail("https://i.ibb.co/P1nw8MW/rasheta-the-furious-axe.png");
        message.channel.send(rashetaEmbed);
      }
      if (args[0] === "daggerOfDeath") {
        function calculateRequiredXP(level) {
          if (level >= 9) {
            return "Max";
          }

          const nextLevel = level + 1;
          const nextLevelInfo = xpLevels.find(
            (entry) => entry.level === nextLevel
          );

          if (nextLevelInfo) {
            return nextLevelInfo.threshold;
          }

          // Return the last threshold if the next level is not found
          const lastLevelInfo = xpLevels[xpLevels.length - 1];
          return lastLevelInfo.threshold;
        }
        var equippedDaggerOfDeath = db.fetch(
          `equippedDaggerOfDeath_${tokenDB}`
        );
        if (!equippedDaggerOfDeath) {
          var equippedDaggerOfDeath = "False";
        }
        const requiredXP = calculateRequiredXP(daggerOfDeathLevel);

        let xpDisplay;
        if (daggerOfDeathLevel === 9 && daggerOfDeathXP >= 0) {
          xpDisplay = "Max";
        } else {
          xpDisplay = `${daggerOfDeathXP} / ${requiredXP}`;
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        }
        const daggerOfDeathEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.daggerOfDeath)
          .setDescription(daggerOfDeath.description)
          .addField("Damage", daggerOfDeathDamage)
          .addField("Type", daggerOfDeath.type)
          .addField("Equipped", equippedDaggerOfDeath)
          .addField("Rarity", daggerOfDeath.rarity)
          .addField("Level", daggerOfDeathLevel)
          .addField("XP", xpDisplay)
          .setThumbnail("https://i.ibb.co/7pxp53P/dagger-of-death.png");
        message.channel.send(daggerOfDeathEmbed);
      } else if (args[0]) {
        if (
          args[0] !== "ventorianBow" &&
          args[0] !== "texarusStaff" &&
          args[0] !== "waetraBow" &&
          args[0] !== "rashetaAxe" &&
          args[0] !== "natureDaggers" &&
          args[0] !== "immortalGun" &&
          args[0] !== "daggerOfDeath"
        ) {
          message.channel.send(
            `*Invalid Item name , Item named : **${args[0]}** does not exist , Usage eg : +wepInfo ventorianBow*`
          );
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        }
      }
      if (!args[0]) {
        message.channel.send(
          `***Please enter a weapon name , eg: +wepInfo ventorianBow***`
        );
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      }
    }
  },
};
