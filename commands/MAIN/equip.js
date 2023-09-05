const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "equip",
  aliases: ["wear"],
  description: "To equip your items",
  usage: "equip",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      if (args[0] == "waetra") {
        var waetra = db.fetch(`waetra_${tokenDB}`);
        var equippedWaetra = db.fetch(`equippedWaetra_${tokenDB}`) || "False";
        if (!waetra) {
          const dontHaveItEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
You dont have it.
`
            )
            .setColor(`#b10000`);
          message.channel.send(dontHaveItEmbed);
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else {
          if (equippedWaetra == "True") {
            const alreadyEquippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
You have already equipped it
`
              )
              .setColor(`#b10000`);
            message.channel.send(alreadyEquippedEmbed);
          } else {
            db.set(`equippedWaetra_${tokenDB}`, "True");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedRasheta_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedVentorianBow_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            db.set(`wepName_${tokenDB}`, "waetraBow");
            const equippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
${user.username}, you equipped Waetra the freezed bow ✔         
`
              )
              .setColor(`#00FF00`);
            message.channel.send(equippedEmbed);
          }
        }
      } else if (args[0] == "ventorianBow") {
        var ventorianBow = db.fetch(`ventorianBow_${tokenDB}`) || "False";
        var equippedVentorianBow = db.fetch(`equippedVentorianBow_${tokenDB}`);
        if (!ventorianBow) {
          const dontHaveItEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
You dont have it.
`
            )
            .setFooter(`Type +gw to get it for free`)
            .setColor(`#b10000`);
          message.channel.send(dontHaveItEmbed);
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else {
          if (equippedVentorianBow == "True") {
            const alreadyEquippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
You have already equipped it
`
              )
              .setColor(`#b10000`);
            message.channel.send(alreadyEquippedEmbed);
          } else {
            db.set(`equippedVentorianBow_${tokenDB}`, "True");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedRasheta_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedWaetra_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`wepName_${tokenDB}`, "ventorianBow");
            const equippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
${user.username}, you equipped Ventorian bow of ventor ✔       
`
              )
              .setColor(`#00FF00`);
            message.channel.send(equippedEmbed);
          }
        }
      } else if (args[0] == "rasheta") {
        var rasheta = db.fetch(`rasheta_${tokenDB}`) || 0;
        if (!rasheta) {
          const dontHaveItEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
  You dont have it.
  `
            )
            .setColor(`#b10000`);
          message.channel.send(dontHaveItEmbed);
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else {
          var equippedRasheta =
            db.fetch(`equippedRasheta_${tokenDB}`) || "False";
          if (equippedRasheta == "True") {
            const alreadyEquippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
You have already equipped it
`
              )
              .setColor(`#b10000`);
            message.channel.send(alreadyEquippedEmbed);
          } else {
            db.set(`equippedRasheta_${tokenDB}`, "True");
            db.set(`equippedWaetra_${tokenDB}`, "False");
            db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
            db.set(`equippedWaz_${tokenDB}`, "False");
            db.set(`equippedTexarus_${tokenDB}`, "False");
            db.set(`equippedNatureDaggers_${tokenDB}`, "False");
            db.set(`equippedVentorianBow_${tokenDB}`, "False");
            db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
            db.set(`equippedImmortalGun_${tokenDB}`, "False");
            db.set(`wepName_${tokenDB}`, "rashetaAxe");
            const equippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
${user.username}, you equipped Rasheta the furious axe ✔       
`
              )
              .setColor(`#00FF00`);
            message.channel.send(equippedEmbed);
          }
        }
      } else if (args[0] == "immortalGun") {
        var immortalGun = db.fetch(`immortalGun_${tokenDB}`);
        var equippedImmortalGun =
          db.fetch(`equippedImmortalGun_${tokenDB}`) || "False";
        if (equippedImmortalGun == "True") {
          const alreadyEquippedEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
You have already equipped it
`
            )
            .setColor(`#b10000`);
          message.channel.send(alreadyEquippedEmbed);
        } else if (!immortalGun) {
          const dontHaveItEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
  You dont have it.
  `
            )
            .setColor(`#b10000`);
          message.channel.send(dontHaveItEmbed);
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else {
          db.set(`equippedRasheta_${tokenDB}`, "False");
          db.set(`equippedWaetra_${tokenDB}`, "False");
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
          db.set(`equippedWaz_${tokenDB}`, "False");
          db.set(`equippedTexarus_${tokenDB}`, "False");
          db.set(`equippedNatureDaggers_${tokenDB}`, "False");
          db.set(`equippedVentorianBow_${tokenDB}`, "False");
          db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
          db.set(`equippedImmortalGun_${tokenDB}`, "True");
          db.set(`wepName_${tokenDB}`, "immortalGun");
          const equippedEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
${user.username}, you equipped Immortal gun of energy ✔       
`
            )
            .setColor(`#00FF00`);
          message.channel.send(equippedEmbed);
        }
      } else if (args[0] == "title") {
        if (args[1] == "monarchSlayer") {
          var monarchSlayer = db.fetch(`monarchSlayer_${tokenDB}`);
          var monarchSlayerTitleOpened =
            db.fetch(`monarchSlayerTitleOpened_${tokenDB}`) || false;
          var equippedmonarchSlayer =
            db.fetch(`equippedmonarchSlayer_${tokenDB}`) || false;
          if (equippedmonarchSlayer == "True") {
            const alreadyEquippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
You have already equipped it
`
              )
              .setColor(`#b10000`);
            message.channel.send(alreadyEquippedEmbed);
          } else if (!monarchSlayer) {
            const dontHaveItEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
You dont have it.
`
              )
              .setColor(`#b10000`);
            message.channel.send(dontHaveItEmbed);
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
          } else if (monarchSlayerTitleOpened == false) {
            const notOpenedTitleEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
You need to open the title to equip it
`
              )
              .setColor(`#b10000`);
            message.channel.send(notOpenedTitleEmbed);
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
          } else {
            db.set(`equippedMonarchSlayerTitle_${tokenDB}`, true);
            db.set(`title_${tokenDB}`, "Monarch slayer");
            const equippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
${user.username}, you equipped the title 'Monarch slayer'    
`
              )
              .setColor(`#00FF00`);
            message.channel.send(equippedEmbed);
          }
        }
      } else if (args[0] == "vanity") {
        if (args[1] == "goldenGhostKnightSet") {
          var goldenGhostKnightSet = db.fetch(
            `goldenGhostKnightSet_${tokenDB}`
          );
          if (!goldenGhostKnightSet) {
            message.channel.send("You dont have it !");
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
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
        if (args[1] == "medusaSet") {
          var medusaSet = db.fetch(`medusaSet_${tokenDB}`);
          if (!medusaSet) {
            message.channel.send("You dont have it !");
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
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
        if (args[1] == "intrepidSet") {
          var intrepidSet = db.fetch(`intrepidSet_${tokenDB}`);
          if (!intrepidSet) {
            message.channel.send("You dont have it !");
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
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
        if (args[1] == "arcaneSenseiSet") {
          var arcaneSenseiSet = db.fetch(`arcaneSenseiSet_${tokenDB}`);
          if (!arcaneSenseiSet) {
            message.channel.send("You dont have it !");
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
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
        if (args[1] == "frozenSet") {
          var frozenSet = db.fetch(`frozenSet_${tokenDB}`);
          if (!frozenSet) {
            message.channel.send("You dont have it !");
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
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
        if (args[1] == "dawnfireSet") {
          var dawnfireSet = db.fetch(`dawnfireSet_${tokenDB}`);
          if (!dawnfireSet) {
            message.channel.send("You dont have it !");
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
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
        if (args[1] == "supremeMagicalSet") {
          var supremeMagicalSet = db.fetch(`supremeMagicalSet_${tokenDB}`);
          var equippedSupremeMagicalSet =
            db.fetch(`equippedSupremeMagicalSet_${tokenDB}`) || false;
          if (!supremeMagicalSet) {
            const dontHaveItEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
You dont have it.
`
              )
              .setColor(`#b10000`);
            message.channel.send(dontHaveItEmbed);
            db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
          } else if (equippedSupremeMagicalSet == false) {
            const alreadyEquippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
You have already equipped it
`
              )
              .setColor(`#b10000`);
            message.channel.send(alreadyEquippedEmbed);
          } else {
            db.set(`arcaneSenseiSetEquipped_${tokenDB}`, false);
            db.set(`supremeMagicalSetEquipped_${tokenDB}`, true);
            db.set(`dawnfireSetEquipped_${tokenDB}`, false);
            db.set(`frozenSetEquipped_${tokenDB}`, false);
            db.set(`goldenGhostKnightSetEquipped_${tokenDB}`, false);
            db.set(`medusaSetEquipped_${tokenDB}`, false);
            db.set(`intrepidSetEquipped_${tokenDB}`, false);
            const equippedEmbed = new Discord.MessageEmbed()
              .setDescription(
                `
${user.username}, you equipped Supreme Magical set ✔       
`
              )
              .setColor(`#00FF00`);
            message.channel.send(equippedEmbed);
          }
        }
      } else if (args[0] == "natureDaggers") {
        var natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
        var equippedNatureDaggers =
          db.fetch(`equippedNatureDaggers_${tokenDB}`) || false;
        if (!natureDaggers) {
          const dontHaveItEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
You dont have it.
`
            )
            .setColor(`#b10000`);
          message.channel.send(dontHaveItEmbed);
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else if (equippedNatureDaggers == false) {
          const alreadyEquippedEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
You have already equipped it
`
            )
            .setColor(`#b10000`);
          message.channel.send(alreadyEquippedEmbed);
        } else {
          db.set(`equippedRasheta_${tokenDB}`, "False");
          db.set(`equippedWaetra_${tokenDB}`, "False");
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
          db.set(`equippedWaz_${tokenDB}`, "False");
          db.set(`equippedTexarus_${tokenDB}`, "False");
          db.set(`equippedNatureDaggers_${tokenDB}`, "True");
          db.set(`equippedVentorianBow_${tokenDB}`, "False");
          db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
          db.set(`equippedImmortalGun_${tokenDB}`, "False");
          db.set(`wepName_${tokenDB}`, "natureDaggers");

          const equippedEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
${user.username}, you equipped Nature daggers of superpower ✔       
`
            )
            .setColor(`#00FF00`);
          message.channel.send(equippedEmbed);
        }
      }
      if (args[0] == "daggerOfDeath") {
        var daggerOfDeath = db.fetch(`daggerOfDeath_${tokenDB}`);
        var equippedDaggerOfDeath =
          db.fetch(`equippedDaggerOfDeath_${tokenDB}`) || "False";
        if (!daggerOfDeath) {
          const dontHaveItEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
  You dont have it.
  `
            )
            .setColor(`#b10000`);
          message.channel.send(dontHaveItEmbed);
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else if (equippedDaggerOfDeath == "True") {
          const alreadyEquippedEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
You have already equipped it
`
            )
            .setColor(`#b10000`);
          message.channel.send(alreadyEquippedEmbed);
        } else {
          db.set(`equippedRasheta_${tokenDB}`, "False");
          db.set(`equippedWaetra_${tokenDB}`, "False");
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
          db.set(`equippedWaz_${tokenDB}`, "False");
          db.set(`equippedTexarus_${tokenDB}`, "False");
          db.set(`equippedDaggerOfDeath_${tokenDB}`, "True");
          db.set(`equippedNatureDaggers_${tokenDB}`, "False");
          db.set(`equippedVentorianBow_${tokenDB}`, "False");
          db.set(`equippedImmortalGun_${tokenDB}`, "False");
          db.set(`wepName_${tokenDB}`, "daggerOfDeath");
          const equippedEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
${user.username}, you equipped Dagger of death ✔       
`
            )
            .setColor(`#00FF00`);
          message.channel.send(equippedEmbed);
        }
      } else if (args[0] == "texarus") {
        var texarus = db.fetch(`texarus_${tokenDB}`);
        var equippedtexarus = db.fetch(`equippedtexarus_${tokenDB}`) || "False";
        if (!texarus) {
          const dontHaveItEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
You dont have it.
`
            )
            .setColor(`#b10000`);
          message.channel.send(dontHaveItEmbed);
          db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
        } else if (equippedtexarus == "True") {
          const alreadyEquippedEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
You have already equipped it
`
            )
            .setColor(`#b10000`);
          message.channel.send(alreadyEquippedEmbed);
        } else {
          db.set(`equippedTexarus_${tokenDB}`, "True");
          db.set(`equippedRasheta_${tokenDB}`, "False");
          db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
          db.set(`equippedWaz_${tokenDB}`, "False");
          db.set(`equippedWaetra_${tokenDB}`, "False");
          db.set(`equippedNatureDaggers_${tokenDB}`, "False");
          db.set(`equippedDaggerOfDeath_${tokenDB}`, "False");
          db.set(`equippedVentorianBow_${tokenDB}`, "False");
          db.set(`equippedImmortalGun_${tokenDB}`, "False");
          db.set(`wepName_${tokenDB}`, "texarusStaff");

          const equippedEmbed = new Discord.MessageEmbed()
            .setDescription(
              `
${user.username}, you equipped Texarus the demonished staff ✔       
`
            )
            .setColor(`#00FF00`);
          message.channel.send(equippedEmbed);
        }
      } else if (!args[0] && !args[1]) {
        message.channel.send(
          "***Invalid Command usage [mention weapon type and name] eg: +equip bow ventorian***"
        );
      }
    }
  },
};
