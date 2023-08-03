const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
const waetraDamage = require("../../weaponStats/waetraBow.json");
const texarusDamage = require("../../weaponStats/texarusStaff.json");
const natureDaggerss = require("../../weaponStats/natureDaggers.json");
const ventorianBoww = require("../../weaponStats/ventorianBow.json");

module.exports = {
  name: "inventory",
  aliases: ["Inventory", "Inv", "inv"],
  description: "To check inventory",
  usage: "inventory",
  category: "Economy",
  run: async (client, message, args) => {
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);

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
      if (!args[0]) {
        var items = {
          awakeningGem: db.fetch(`awakeningGem_${tokenDB}`) || 0,
          eliteAwakeningGem: db.fetch(`eliteAwakeningGem_${tokenDB}`) || 0,
          ventorianBow: db.fetch(`ventorianBow_${tokenDB}`) || 0,
          texarus: db.fetch(`texarus_${tokenDB}`) || 0,
          waetra: db.fetch(`waetra_${tokenDB}`) || 0,
          rasheta: db.fetch(`rasheta_${tokenDB}`) || 0,
          natureDaggers: db.fetch(`natureDaggers_${tokenDB}`) || 0,
          immortalGun: db.fetch(`immortalGun_${tokenDB}`) || 0,
          goldenGhostKnightSet:
            db.fetch(`goldenGhostKnightSet_${tokenDB}`) || 0,
          supremeMagicalSet: db.fetch(`supremeMagicalSet_${tokenDB}`) || 0,
          frozenSet: db.fetch(`frozenSet_${tokenDB}`) || 0,
          superGolemSet: db.fetch(`superGolemSet_${tokenDB}`) || 0,
          dawnfireSet: db.fetch(`dawnfireSet_${tokenDB}`) || 0,
          arcaneSenseiSet: db.fetch(`arcaneSenseiSet_${tokenDB}`) || 0,
          intrepidSet: db.fetch(`intrepidSet_${tokenDB}`) || 0,
          medusaSet: db.fetch(`medusaSet_${tokenDB}`) || 0,
        };

        // Create the inventory embed
        const inventoryEmbed = new Discord.MessageEmbed()
          .setTitle("Inventory")
          .setColor("#FFFF00");

        // Function to add item to inventory description
        function addItem(name, amount, rarity, id) {
          inventoryEmbed.setDescription(
            (inventoryEmbed.description || "") +
              `\n\n**${name}** : (${amount}) x pcs\nRarity: ${rarity} , ID: ${id}`
          );
        }

        // Check each item and add it to the inventory description if the user has it
        if (items.awakeningGem > 0) {
          addItem(
            "Awakening gem",
            items.awakeningGem,
            "Common",
            "awakeningGem"
          );
        }

        if (items.eliteAwakeningGem > 0) {
          addItem(
            "Elite Awakening gem",
            items.eliteAwakeningGem,
            "Epic",
            "eliteAwakeningGem"
          );
        }

        if (items.ventorianBow > 0) {
          addItem(
            "Ventorian Bow of Ventor",
            items.ventorianBow,
            "Common",
            "ventorianBow"
          );
        }

        if (items.texarus > 0) {
          addItem(
            "Texarus the demonished staff",
            items.texarus,
            "Legendary",
            "texarus"
          );
        }

        if (items.waetra > 0) {
          addItem("Waetra the freezed bow", items.waetra, "Mythic", "waetra");
        }

        if (items.rasheta > 0) {
          addItem(
            "Rasheta the furious axe",
            items.rasheta,
            "Mythic",
            "rasheta"
          );
        }

        if (items.natureDaggers > 0) {
          addItem(
            "Nature Daggers of Superpower",
            items.natureDaggers,
            "Arcane",
            "natureDaggers"
          );
        }

        if (items.immortalGun > 0) {
          addItem(
            "Immortal Gun of Energy",
            items.immortalGun,
            "Arcane",
            "immortalGun"
          );
        }
        if (items.goldenGhostKnightSet > 0) {
          addItem(
            "Golden Ghost Knight Set",
            items.immortalGun,
            "Vanity",
            "goldenGhostKnightSet"
          );
        }
        if (items.supremeMagicalSet > 0) {
          addItem(
            "Supreme Magical Set",
            items.immortalGun,
            "Vanity",
            "supremeMagicalSet"
          );
        }
        if (items.frozenSet > 0) {
          addItem("Frozen Set", items.frozenSet, "Vanity", "frozenSet");
        }
        if (items.dawnfireSet > 0) {
          addItem("Dawnfire Set", items.dawnfireSet, "Vanity", "dawnfireSet");
        }
        if (items.arcaneSenseiSet > 0) {
          addItem(
            "Arcane Sensei Set",
            items.arcaneSenseiSet,
            "Vanity",
            "arcaneSenseiSet"
          );
        }
        if (items.intrepidSet > 0) {
          addItem("Intrepid Set", items.intrepidSet, "Vanity", "intrepidSet");
        }
        if (items.medusaSet > 0) {
          addItem("Medusa Set", items.medusaSet, "Vanity", "medusaSet");
        }
        // Send the inventory embed
        message.channel.send(inventoryEmbed);
      } else if (args[0] == "craft") {
        // Check materials for crafting
        var materials = {
          cotton: db.fetch(`cotton_${tokenDB}`) || 0, // Common material
          superGem: db.fetch(`superGem_${tokenDB}`) || 0, // Mythic material
          leather: db.fetch(`leather_${tokenDB}`) || 0, // Arcane material
          arcaneShard: db.fetch(`arcaneShard_${tokenDB}`) || 0, // Arcane material
          iceCube: db.fetch(`iceCube_${tokenDB}`) || 0, // Arcane material
          greenRock: db.fetch(`greenRock_${tokenDB}`) || 0, // Arcane material
          silk: db.fetch(`silk_${tokenDB}`) || 0, // Arcane material
        };

        // Create the crafting inventory embed
        const craftingEmbed = new Discord.MessageEmbed()
          .setTitle("Crafting Inventory")
          .setColor("#00FF00");

        // Function to add material to crafting inventory description
        function addMaterial(name, amount, rarity, id) {
          craftingEmbed.setDescription(
            (craftingEmbed.description || "") +
              `\n\n**${name}** : (${amount}) x pcs\nRarity: ${rarity} , ID: ${id}`
          );
        }

        // Check each material and add it to the crafting inventory description if the user has it
        if (materials.cotton > 0) {
          addMaterial("Cotton", materials.cotton, "Common", "cotton");
        }

        if (materials.superGem > 0) {
          addMaterial("Super Gem", materials.superGem, "Mythic", "superGem");
        }

        if (materials.leather > 0) {
          addMaterial("Leather", materials.leather, "Arcane", "leather");
        }
        if (materials.greenRock > 0) {
          addMaterial("Green rock", materials.greenRock, "common", "greenRock");
        }
        if (materials.silk > 0) {
          addMaterial("Silk", materials.silk, "common", "silk");
        }
        if (materials.arcaneShard > 0) {
          addMaterial(
            "Arcane Shard",
            materials.arcaneShard,
            "Arcane",
            "arcaneShard"
          );
        }

        if (materials.iceCube > 0) {
          addMaterial("Ice Cube", materials.iceCube, "Arcane", "iceCube");
        }

        // Send the crafting inventory embed
        message.channel.send(craftingEmbed);
      }
    }
  },
};
