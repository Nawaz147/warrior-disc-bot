const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
module.exports = {
  name: "equip",
  aliases: ["wear"],
  description: "To equip your items",
  usage: "equip",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);
    var acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;

    if (!tokenDB) {
      message.channel.send(
        `${user} your Valorium token is not registered yet , type +token me to set your Valorium token`
      );
    } else if (banned == true) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
    } else if (update == true && message.author.id !== "768747976767832084") {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else if (acceptedTOS == false) {
      message.channel.send(
        `
You need to accept the terms of service for using this discord bot!
Type **+tos** to check the terms of service 
Type **+tos accept** to accept the terms of service        
`
      );
    } else {
      if (args[0] == "bow") {
        if (args[1] == "waz") {
          var waz = db.fetch(`wazBow_${tokenDB}`);
          if (!waz) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`equippedWaz_${tokenDB}`, "True");
            db.set(`wepName_${tokenDB}`, "WazBow");
            db.set(`equippedWaetra_${tokenDB}`, "False");
            db.set(`equippedRasheta_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedVentorianBow_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            message.channel.send(`${user} you have equipped Waz the meed bow`);
          }
        } else if (args[1] == "waetra") {
          var waetra = db.fetch(`waetra_${tokenDB}`);
          if (!waetra) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`equippedWaetra_${tokenDB}`, "True");
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedRasheta_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedVentorianBow_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            db.set(`wepName_${tokenDB}`, "waetraBow");
            message.channel.send(
              `${user} you have equipped Waetra the freezed bow`
            );
          }
        } else if (args[1] == "ventorian") {
          var ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
          if (!ventorianBow) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`equippedVentorianBow_${tokenDB}`, "True");
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedRasheta_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedWaetra_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`wepName_${tokenDB}`, "ventorianBow");
            message.channel.send(
              `${user} you have equipped Ventorian the ventor bow`
            );
          }
        }
      } else if (args[0] == "axe") {
        if (args[1] == "rasheta") {
          var rasheta = db.fetch(`rasheta_${tokenDB}`);
          if (!rasheta) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`equippedRasheta_${tokenDB}`, "True");
            db.set(`equippedWaetra_${tokenDB}`, "False");
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedVentorianBow_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`wepName_${tokenDB}`, "rashetaAxe");
            message.channel.send(
              `${user} you have equipped Rasheta the furious axe`
            );
          }
        }
      } else if (args[0] == "gun") {
        var immortalGun = db.fetch(`immortalGun_${tokenDB}`);
        if (args[1] == "immortal") {
          if (!immortalGun) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`equippedRasheta_${tokenDB}`, "False");
            db.set(`equippedWaetra_${tokenDB}`, "False");
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedVentorianBow_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "True");
            db.set(`wepName_${tokenDB}`, "immortalGun");
            message.channel.send(
              `${user} you have equipped Immortal Gun of Energy`
            );
          }
        }
      } else if (args[0] == "vanity") {
        if (args[1] == "goldenGhostKnight") {
          var goldenGhostKnightSet = db.fetch(
            `goldenGhostKnightSet_${tokenDB}`
          );
          if (!goldenGhostKnightSet) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`goldenGhostKnightSetEquipped_${tokenDB}`, true);
            db.set(`intrepidSetEquipped_${tokenDB}`, false);
            db.set(`frozenSetEquipped_${tokenDB}`, false);
            db.set(`dawnfireSetEquipped_${tokenDB}`, false);
            db.set(`medusaSetEquipped_${tokenDB}`, false);
            db.set(`supremeMagicalSetEquipped_${tokenDB}`, false);
            db.set(`arcaneSenseiSetEquipped_${tokenDB}`, false);
            message.channel.send(`You equipped Golden Ghost knight set`);
          }
        }
        if (args[1] == "medusa") {
          var medusaSet = db.fetch(`medusaSet_${tokenDB}`);
          if (!medusaSet) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`medusaSetEquipped_${tokenDB}`, true);
            db.set(`goldenGhostKnightSetEquipped_${tokenDB}`, false);
            db.set(`intrepidSetEquipped_${tokenDB}`, false);
            db.set(`frozenSetEquipped_${tokenDB}`, false);
            db.set(`supremeMagicalSetEquipped_${tokenDB}`, false);
            db.set(`arcaneSenseiSetEquipped_${tokenDB}`, false);
            db.set(`dawnfireSetEquipped_${tokenDB}`, false);
            message.channel.send(`You equipped Medusa set`);
          }
        }
        if (args[1] == "intrepid") {
          var intrepidSet = db.fetch(`intrepidSet_${tokenDB}`);
          if (!intrepidSet) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`intrepidSetEquipped_${tokenDB}`, true);
            db.set(`arcaneSenseiSetEquipped_${tokenDB}`, false);
            db.set(`supremeMagicalSetEquipped_${tokenDB}`, false);
            db.set(`dawnfireSetEquipped_${tokenDB}`, false);
            db.set(`goldenGhostKnightSetEquipped_${tokenDB}`, false);
            db.set(`medusaSetEquipped_${tokenDB}`, false);
            db.set(`frozenSetEquipped_${tokenDB}`, false);
            message.channel.send(`You equipped Intrepid set`);
          }
        }
        if (args[1] == "arcaneSensei") {
          var arcaneSenseiSet = db.fetch(`arcaneSenseiSet_${tokenDB}`);
          if (!arcaneSenseiSet) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`arcaneSenseiSetEquipped_${tokenDB}`, true);
            db.set(`goldenGhostKnightSetEquipped_${tokenDB}`, false);
            db.set(`frozenSetEquipped_${tokenDB}`, false);
            db.set(`supremeMagicalSetEquipped_${tokenDB}`, false);
            db.set(`medusaSetEquipped_${tokenDB}`, false);
            db.set(`dawnfireSetEquipped_${tokenDB}`, false);
            db.set(`intrepidSetEquipped_${tokenDB}`, false);
            message.channel.send(`You equipped Arcane Sensei set`);
          }
        }
        if (args[1] == "frozen") {
          var frozenSet = db.fetch(`frozenSet_${tokenDB}`);
          if (!frozenSet) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`arcaneSenseiSetEquipped_${tokenDB}`, false);
            db.set(`frozenSetEquipped_${tokenDB}`, true);
            db.set(`dawnfireSetEquipped_${tokenDB}`, false);
            db.set(`goldenGhostKnightSetEquipped_${tokenDB}`, false);
            db.set(`supremeMagicalSetEquipped_${tokenDB}`, false);
            db.set(`medusaSetEquipped_${tokenDB}`, false);
            db.set(`intrepidSetEquipped_${tokenDB}`, false);
            message.channel.send(`You equipped Frozen set`);
          }
        }
        if (args[1] == "dawnfire") {
          var dawnfireSet = db.fetch(`dawnfireSet_${tokenDB}`);
          if (!dawnfireSet) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`arcaneSenseiSetEquipped_${tokenDB}`, false);
            db.set(`dawnfireSetEquipped_${tokenDB}`, true);
            db.set(`frozenSetEquipped_${tokenDB}`, false);
            db.set(`goldenGhostKnightSetEquipped_${tokenDB}`, false);
            db.set(`medusaSetEquipped_${tokenDB}`, false);
            db.set(`supremeMagicalSetEquipped_${tokenDB}`, false);
            db.set(`intrepidSetEquipped_${tokenDB}`, false);
            message.channel.send(`You equipped Dawnfire set`);
          }
        }
        if (args[1] == "supremeMagical") {
          var supremeMagicalSet = db.fetch(`supremeMagicalSet_${tokenDB}`);
          if (!supremeMagicalSet) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`arcaneSenseiSetEquipped_${tokenDB}`, false);
            db.set(`supremeMagicalSetEquipped_${tokenDB}`, true);
            db.set(`dawnfireSetEquipped_${tokenDB}`, false);
            db.set(`frozenSetEquipped_${tokenDB}`, false);
            db.set(`goldenGhostKnightSetEquipped_${tokenDB}`, false);
            db.set(`medusaSetEquipped_${tokenDB}`, false);
            db.set(`intrepidSetEquipped_${tokenDB}`, false);
            message.channel.send(`You equipped Supreme magical set`);
          }
        }
      } else if (args[0] == "daggers") {
        var natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
        if (args[1] == "nature") {
          if (!natureDaggers) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`equippedRasheta_${tokenDB}`, "False");
            db.set(`equippedWaetra_${tokenDB}`, "False");
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "True");
            db.set(`equippedVentorianBow_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`wepName_${tokenDB}`, "natureDaggers");
            message.channel.send(
              `${user} you have equipped Nature Daggers of Superpower`
            );
          }
        }
        if (args[1] == "death") {
          var daggerOfDeath = db.fetch(`daggerOfDeath_${tokenDB}`);
          if (!daggerOfDeath) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`equippedRasheta_${tokenDB}`, "False");
            db.set(`equippedWaetra_${tokenDB}`, "False");
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "True");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedVentorianBow_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`wepName_${tokenDB}`, "daggerOfDeath");
            message.channel.send(`${user} you have equipped Dagger of death`);
          }
        }
      } else if (args[0] == "staff") {
        var texarus = db.fetch(`texarus_${tokenDB}`);
        if (args[1] == "texarus") {
          if (!texarus) {
            message.channel.send("You dont have it !");
          } else {
            db.set(`equippedTexarus_${tokenDB}`, "True");
            db.set(`equippedRasheta_${tokenDB}`, "False");
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedWaetra_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            db.set(`equippedVentorianBow_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`wepName_${tokenDB}`, "texarusStaff");
            message.channel.send(
              `${user} you have equipped Texarus the demonished staff`
            );
          }
        }
      } else if (!args[0] && !args[1]) {
        message.channel.send(
          "***Invalid Command usage [mention weapon type and name] eg: +equip bow ventorian***"
        );
      }
    }
  },
};
