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
    const tokenDB = db.fetch(`${user.id}.oyOtoken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);

    if (!tokenDB) {
      message.channel.send(
        `${user} your Warrior Legends token is not registered yet , type +token me to set your Warrior Legends token`
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
      if (args[0] === "texarus") {
        var equippedTexarus = db.fetch(`equippedTexarus_${tokenDB}`);
        if (!equippedTexarus) {
          var equippedTexarus = "False";
        }

        const texarusEmbed = new Discord.MessageEmbed()
          .setColor("#D139F2")
          .setTitle(weaponNames + xarus)
          .setDescription(texarus.description)
          .addField("Damage", texarus.Damage)
          .addField("Type", "Staff")
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
        }
        const waetraEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.waetraBow)
          .setDescription(waetra.description)
          .addField("Damage", waetra.Damage)
          .addField("Type", "Bow")
          .addField("Equipped", equippedWaetra)
          .addField("Rarity", waetra.rarity)
          .setThumbnail("https://i.ibb.co/dmVmnwz/waetra-the-freezed-bow.webp");
        message.channel.send(waetraEmbed);
      }
      if (args[0] == "ventorianBow") {
        var equippedVentorianBow = db.fetch(`equippedVentorianBow_${tokenDB}`);
        if (!equippedVentorianBow) {
          var equippedVentorianBow = "False";
        }
        const ventorianBowEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.ventorianBow)
          .setDescription(ventorianBow.description)
          .addField("Damage", ventorianBow.Damage)
          .addField("Type", "Bow")
          .addField("Equipped", equippedVentorianBow)
          .addField("Rarity", ventorianBow.rarity)
          .setThumbnail("https://i.ibb.co/vs0DwDj/bow.png");
        message.channel.send(ventorianBowEmbed);
      }

      if (args[0] == "immortalGun") {
        var equippedImmortalGun = db.fetch(`equippedImmortalGun_${tokenDB}`);
        if (!equippedImmortalGun) {
          var equippedImmortalGun = "False";
        }
        const immortalGunEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.immortalGun)
          .setDescription(immortalGun.description)
          .addField("Damage", immortalGun.Damage)
          .addField("Type", "Gun")
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
        }
        const natureDaggersEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.natureDaggers)
          .setDescription(natureDaggers.description)
          .addField("Damage", natureDaggers.Damage)
          .addField("Type", "Daggers")
          .addField("Equipped", equippedNatureDaggers)
          .addField("Rarity", natureDaggers.rarity)
          .setThumbnail("https://i.ibb.co/pJkCgK2/daggers.png");
        message.channel.send(natureDaggersEmbed);
      }
      if (args[0] === "rasheta") {
        var equippedRasheta = db.fetch(`equippedRasheta_${tokenDB}`);
        if (!equippedRasheta) {
          var equippedRasheta = "False";
        }
        const rashetaEmbed = new Discord.MessageEmbed()
          .setColor("#A0EAEB")
          .setTitle(weaponNames.rasheta)
          .setDescription(rasheta.description)
          .addField("Damage", rasheta.Damage)
          .addField("Type", "Axe")
          .addField("Equipped", equippedRasheta)
          .addField("Rarity", rasheta.rarity)
          .setThumbnail("https://i.ibb.co/P1nw8MW/rasheta-the-furious-axe.png");
        message.channel.send(rashetaEmbed);
      }
      if (args[0] == "Rasheta the furious axe") {
        message.channel.send(`Did u mean to write : **+store sell rasheta**`);
      } else if (args[0] == "Rasheta The Furious Axe") {
        message.channel.send(`Did u mean to write : **+store sell rasheta**`);
      } else if (args[0] == "Rasheta The furious Axe") {
        message.channel.send(`Did u mean to write : **+store sell rasheta**`);
      } else if (args[0] == "rashet") {
        message.channel.send(`Did u mean to write : **+store sell rasheta**`);
      } else if (args[0] == "Rasheta") {
        message.channel.send(`Did u mean to write : **+store sell rasheta**`);
      } else if (args[0] == "Nature Daggers Of Superpower") {
        message.channel.send(
          `Did u mean to write : **+store sell natureDaggers**`
        );
      } else if (args[0] == "nature daggers of superpower") {
        message.channel.send(
          `Did u mean to write : **+store sell natureDaggers**`
        );
      } else if (args[0] == "Nature Daggers Of Superpower") {
        message.channel.send(
          `Did u mean to write : **+store sell natureDaggers**`
        );
      } else if (args[0] == "nature") {
        message.channel.send(
          `Did u mean to write : **+store sell natureDaggers**`
        );
      } else if (args[0] == "NatureDaggers") {
        message.channel.send(
          `Did u mean to write : **+store sell natureDaggers**`
        );
      } else if (args[0] == "Naturedaggers") {
        message.channel.send(
          `Did u mean to write : **+store sell natureDaggers**`
        );
      } else if (args[0] == "Waetra The Freezed Bow") {
        message.channel.send(`Did u mean to write : **+store sell waetra**`);
      } else if (args[0] == "waetra the freezed bow") {
        message.channel.send(`Did u mean to write : **+store sell waetra**`);
      } else if (args[0] == "Waetra The Freezed bow") {
        message.channel.send(`Did u mean to write : **+store sell waetra**`);
      } else if (args[0] == "waetraBow") {
        message.channel.send(`Did u mean to write : **+store sell waetra**`);
      } else if (args[0] == "Waetra") {
        message.channel.send(`Did u mean to write : **+store sell waetra**`);
      } else if (args[0] == "Texarus The Demonished Staff") {
        message.channel.send(`Did u mean to write : **+store sell texarus**`);
      } else if (args[0] == "texarus The demonished staff") {
        message.channel.send(`Did u mean to write : **+store sell texarus**`);
      } else if (args[0] == "texarus the demonished staff") {
        message.channel.send(`Did u mean to write : **+store sell texarus**`);
      } else if (args[0] == "Texarus the demonished staff") {
        message.channel.send(`Did u mean to write : **+store sell texarus**`);
      } else if (args[0] == "Texarus") {
        message.channel.send(`Did u mean to write : **+store sell texarus**`);
      } else if (args[0] == "TexarusStaff") {
        message.channel.send(`Did u mean to write : **+store sell texarus**`);
      } else if (args[0] == "ventorian") {
        message.channel.send(
          `Did u mean to write : **+store sell ventorianBow**`
        );
      } else if (args[0] == "Ventorian Bow of Ventor") {
        message.channel.send(
          `Did u mean to write : **+store sell ventorianBow**`
        );
      } else if (args[0] == "ventorian bow of ventor") {
        message.channel.send(
          `Did u mean to write : **+store sell ventorianBow**`
        );
      } else if (args[0] == "Ventorian Bow Of Ventor") {
        message.channel.send(
          `Did u mean to write : **+store sell ventorianBow**`
        );
      } else if (args[0] == "VentorianBow") {
        message.channel.send(
          `Did u mean to write : **+store sell ventorianBow**`
        );
      } else if (args[0] == "Ventorian bow of ventor") {
        message.channel.send(
          `Did u mean to write : **+store sell ventorianBow**`
        );
      } else if (args[0] == "VentorBow") {
        message.channel.send(
          `Did u mean to write : **+store sell ventorianBow**`
        );
      } else if (args[0]) {
        if (
          args[0] !== "ventorianBow" &&
          args[0] !== "texarusStaff" &&
          args[0] !== "waetraBow" &&
          args[0] !== "rashetaAxe" &&
          args[0] !== "natureDaggers" &&
          args[0] !== "immortalGun"
        ) {
          message.channel.send(
            `*Invalid Item name , Item named : **${args[0]}** does not exist , Usage eg : +wepInfo ventorianBow*`
          );
        }
      }
      if (!args[0]) {
        message.channel.send(
          `***Please enter a weapon name , eg: +wepInfo ventorianBow***`
        );
      }
    }
  },
};
