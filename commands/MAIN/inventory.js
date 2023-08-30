const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const startFunction = require("../../startCommandFunction.js");

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
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      const channel = message.channel; // Replace with the channel you want to check

      const botPermissions = channel.permissionsFor(client.user);
      if (
        botPermissions.has("ADD_REACTIONS") &&
        botPermissions.has("READ_MESSAGE_HISTORY") &&
        botPermissions.has("MANAGE_MESSAGES")
      ) {
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        if (!args[0] || args[0].toLowerCase() !== "craft") {
          const items = {
            "Dagger of death": db.fetch(`daggerOfDeath_${tokenDB}`) || 0,
            "Immortal gun of energy": db.fetch(`immortalGun_${tokenDB}`) || 0,
            "Nature daggers of superpower":
              db.fetch(`natureDaggers_${tokenDB}`) || 0,
            "Vortex orb": db.fetch(`vortexOrb_${tokenDB}`) || 0,
            "Verdant Whisper leaf": db.fetch(`verdantLeaf_${tokenDB}`) || 0,
            "Celestial Moonstone":
              db.fetch(`celestialMoonStone_${tokenDB}`) || 0,
            "Gold Bar": db.fetch(`goldBar_${tokenDB}`) || 0,
            "Crystalline corestone":
              db.fetch(`crystallineCorestone_${tokenDB}`) || 0,
            Bullet: db.fetch(`bullet_${tokenDB}`) || 0,
            "Tome of everlasting wisdom":
              db.fetch(`tomeOfEverlastingWisdom_${tokenDB}`) || 0,
            "Rasheta the furious axe": db.fetch(`rasheta_${tokenDB}`) || 0,
            "Waetra the freezed bow": db.fetch(`waetra_${tokenDB}`) || 0,
            "Arcane sensei set": db.fetch(`arcaneSenseiSet_${tokenDB}`) || 0,
            "Super golem set": db.fetch(`superGolemSet_${tokenDB}`) || 0,
            "Supreme magical set":
              db.fetch(`supremeMagicalSet_${tokenDB}`) || 0,
            "Golden Ghost Knight Set":
              db.fetch(`goldenGhostKnightSet_${tokenDB}`) || 0,
            "Medusa set": db.fetch(`medusaSet_${tokenDB}`) || 0,
            "Intrepid set": db.fetch(`intrepidSet_${tokenDB}`) || 0,
            "Frozen set": db.fetch(`frozenSet_${tokenDB}`) || 0,
            "Dawnfire set": db.fetch(`dawnfireSet_${tokenDB}`) || 0,
            "Texarus the demonished staff": db.fetch(`texarus_${tokenDB}`) || 0,
            "Elite awakening gem":
              db.fetch(`eliteAwakeningGem_${tokenDB}`) || 0,
            "Unlocked crate of energy":
              db.fetch(`unlockedCrateOfEnergy_${tokenDB}`) || 0,
            "Awakening gem": db.fetch(`awakeningGem_${tokenDB}`) || 0,
            "Ventorian bow of ventor": db.fetch(`ventorianBow_${tokenDB}`) || 0,
            "Rusty gears": db.fetch(`rustyGears_${tokenDB}`) || 0,
            "Torn cloth": db.fetch(`tornCloth_${tokenDB}`) || 0,
            "Broken stick": db.fetch(`brokenStick_${tokenDB}`) || 0,
            Dustbin: db.fetch(`dustbin_${tokenDB}`) || 0,
            Newspaper: db.fetch(`newspaper_${tokenDB}`) || 0,
            "Used tissue": db.fetch(`usedTissue_${tokenDB}`) || 0,
            Cotton: db.fetch(`cotton_${tokenDB}`) || 0, // Common material
            "Super gem": db.fetch(`superGem_${tokenDB}`) || 0, // Mythic material
            Leather: db.fetch(`leather_${tokenDB}`) || 0, // Arcane material
            "Arcane shard": db.fetch(`arcaneShard_${tokenDB}`) || 0, // Arcane material
            "Ice cube": db.fetch(`iceCube_${tokenDB}`) || 0, // Arcane material
            "Green rock": db.fetch(`greenRock_${tokenDB}`) || 0, // Arcane material
            Silk: db.fetch(`silk_${tokenDB}`) || 0, // Arcane material
          };

          // Function to get the rarity of an item

          // Create the inventory embed
          const inventoryEmbed = new Discord.MessageEmbed()
            .setTitle(`${user.username}'s Inventory`)
            .setColor("#FFFF00");

          // Check each item and add it to the inventory description if the user has it
          const itemNames = Object.keys(items);
          const itemsPerPage = 8;
          let currentPage = 1;
          const itemsRarity = {
            "Gold Bar": "Mythic",
            "Dagger of death": "Arcane",
            Bullet: "Arcane",
            "Awakening gem": "Common",
            "Elite awakening gem": "Epic",
            "Ventorian bow of ventor": "Common",
            "Texarus the demonished staff": "Legendary",
            "Waetra the freezed bow": "Mythic",
            "Rasheta the furious axe": "Mythic",
            "Nature daggers of superpower": "Arcane",
            "Immortal gun of energy": "Arcane",
            "Golden Ghost Knight Set": "Vanity",
            "Supreme magical set": "Vanity",
            "Frozen set": "Vanity",
            "Super golem set": "Vanity",
            "Dawnfire set": "Vanity",
            "Arcane sensei set": "Vanity",
            "Intrepid set": "Vanity",
            "Medusa set": "Vanity",
            "Unlocked crate of energy": "Rare",
            "Vortex orb": "Arcane",
            "Verdant Whisper leaf": "Arcane",
            "Celestial Moonstone": "Arcane",
            "Crystalline corestone": "Mythic",
            "Tome of everlasting wisdom": "Mythic",
            "Rusty gears": "common",
            Dustbin: "common",
            Newspaper: "common",
            "Torn cloth": "common",
            "Used tissue": "common",
            "Broken stick": "common",
            Cotton: "common",
            "Super gem": "Mythic",
            Leather: "Arcane",
            "Arcane shard": "Arcane",
            "Ice cube": "Mythic",
            "Green rock": "common",
            Silk: "common",
          };
          const itemsID = {
            "Gold Bar": "goldBar",
            "Dagger of death": "daggerOfDeath",
            Bullet: "bullet",
            "Awakening gem": "awakeningGem",
            "Elite awakening gem": "eliteAwakeningGem",
            "Ventorian bow of ventor": "ventorianBow",
            "Texarus the demonished staff": "texarus",
            "Waetra the freezed bow": "waetra",
            "Rasheta the furious axe": "rasheta",
            "Nature daggers of superpower": "natureDaggers",
            "Immortal gun of energy": "immortalGun",
            "Golden Ghost Knight Set": "goldenGhostKnightSet",
            "Supreme magical set": "supremeMagicalSet",
            "Frozen set": "frozenSet",
            "Super golem set": "superGolemSet",
            "Dawnfire set": "dawnfireSet",
            "Arcane sensei set": "arcaneSenseiSet",
            "Intrepid set": "intrepidSet",
            "Medusa set": "medusaSet",
            "Unlocked crate of energy": "unlockedCrateOfEnergy",
            "Vortex orb": "vortexOrb",
            "Verdant Whisper leaf": "verdantLeaf",
            "Celestial Moonstone": "celestialMoonstone",
            "Crystalline corestone": "crystallineCorestone",
            "Tome of everlasting wisdom": "tomeOfEverlastingWisdom",
            "Rusty gears": "rustyGears",
            Dustbin: "dustbin",
            Newspaper: "newspaper",
            "Torn cloth": "tornCloth",
            "Used tissue": "usedTissue",
            "Broken stick": "brokenStick",
            Cotton: "cotton",
            "Super gem": "superGem",
            Leather: "leather",
            "Arcane shard": "arcaneShard",
            "Ice cube": "iceCube",
            "Green rock": "greenRock",
            Silk: "silk",
          };
          function showCurrentPage() {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(
              startIndex + itemsPerPage,
              itemNamesWithQuantity.length
            );
            const pageItems = itemNamesWithQuantity.slice(startIndex, endIndex);
            const inventoryItems = [];

            for (const [itemName, amount] of pageItems) {
              const rarity = itemsRarity[itemName] || "ERROR";
              const itemID = itemsID[itemName] || "ERROR";
              inventoryItems.push(
                `**${itemName}** : (${amount}) x pcs\nRarity: ${rarity}, ID: ${itemID}\n`
              );
            }

            inventoryEmbed.setDescription(inventoryItems.join("\n"));
            inventoryEmbed.setFooter(`Page ${currentPage}/${totalPages}`);
            return inventoryEmbed;
          }
          const itemNamesWithQuantity = Object.entries(items).filter(
            ([itemName, quantity]) => quantity > 0
          );
          const totalPages = Math.ceil(
            itemNamesWithQuantity.length / itemsPerPage
          );
          const inventoryMessage = await message.channel.send(
            showCurrentPage()
          );

          if (totalPages > 1 && itemNamesWithQuantity.length > itemsPerPage) {
            await inventoryMessage.react("👈");
            await inventoryMessage.react("👉");

            const filter = (reaction, user) => {
              return (
                ["👈", "👉"].includes(reaction.emoji.name) &&
                user.id === message.author.id
              );
            };

            const collector = inventoryMessage.createReactionCollector(filter, {
              time: 60000,
              dispose: true,
            });

            collector.on("collect", (reaction) => {
              reaction.users.remove(message.author).catch(console.error);

              if (reaction.emoji.name === "👉" && currentPage < totalPages) {
                currentPage++;
                inventoryMessage.edit(showCurrentPage());
              } else if (reaction.emoji.name === "👈" && currentPage > 1) {
                currentPage--;
                inventoryMessage.edit(showCurrentPage());
              }
            });

            collector.on("end", () => {
              inventoryMessage.reactions.removeAll().catch(console.error);
            });
          } else {
            // If the user has 7 items or less, remove the reactions (if any) from the message
            inventoryMessage.reactions.removeAll().catch(console.error);
          }
        }
      } else {
        // The bot does not have the required permissions
        message.channel.send(
          "I don't have the necessary permissions to add reactions or edit messages with reactions in this channel."
        );
      }
    }
  },
};
