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
            "<:daggerofdeath:1147084241516105728> Dagger of death":
              db.fetch(`daggerOfDeath_${tokenDB}`) || 0,
            "<:immortalgun:1147084130807455814> Immortal gun of energy":
              db.fetch(`immortalGun_${tokenDB}`) || 0,
            "<:naturedaggers:1147084151686701068> Nature daggers of superpower":
              db.fetch(`natureDaggers_${tokenDB}`) || 0,
            "<:vortexorb:1147066784969666600> Vortex orb":
              db.fetch(`vortexOrb_${tokenDB}`) || 0,
            "<:verdantwhisperleaf:1147068073619226684> Verdant Whisper leaf":
              db.fetch(`verdantLeaf_${tokenDB}`) || 0,
            "<:celestialmoonstone:1147070214987583519> Celestial Moonstone":
              db.fetch(`celestialMoonStone_${tokenDB}`) || 0,
            "<:goldbar:1147101331534921758> Gold Bar":
              db.fetch(`goldBar_${tokenDB}`) || 0,
            "<:crystallinecorestone:1147068766983819275> Crystalline corestone":
              db.fetch(`crystallineCorestone_${tokenDB}`) || 0,
            "<:bullet:1147100873164603472> Bullet":
              db.fetch(`bullet_${tokenDB}`) || 0,
            "<:tomeofeverlastingwisdom:1147073417275773018> Tome of everlasting wisdom":
              db.fetch(`tomeOfEverlastingWisdom_${tokenDB}`) || 0,
            "<:rashetathefuriousaxe:1147085204779962408> Rasheta the furious axe":
              db.fetch(`rasheta_${tokenDB}`) || 0,
            "<:waetrathefreezedbow:1147084610279325706> Waetra the freezed bow":
              db.fetch(`waetra_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Arcane sensei set":
              db.fetch(`arcaneSenseiSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Super golem set":
              db.fetch(`superGolemSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Supreme magical set":
              db.fetch(`supremeMagicalSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Golden Ghost Knight Set":
              db.fetch(`goldenGhostKnightSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Medusa set":
              db.fetch(`medusaSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Intrepid set":
              db.fetch(`intrepidSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Frozen set":
              db.fetch(`frozenSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Dawnfire set":
              db.fetch(`dawnfireSet_${tokenDB}`) || 0,
            "<:texarusthedemonishedstaff:1147083583899586661> Texarus the demonished staff":
              db.fetch(`texarus_${tokenDB}`) || 0,
            "<:eliteawakeninggem:1147070929957027860> Elite awakening gem":
              db.fetch(`eliteAwakeningGem_${tokenDB}`) || 0,
            "<:unlockedCrateOfEnergy:1147102884585017355> Unlocked crate of energy":
              db.fetch(`unlockedCrateOfEnergy_${tokenDB}`) || 0,
            "<:awakeninggem:1147071223042424902> Awakening gem":
              db.fetch(`awakeningGem_${tokenDB}`) || 0,
            "<:ventorianbow:1147084109986930688> Ventorian bow of ventor":
              db.fetch(`ventorianBow_${tokenDB}`) || 0,
            "<:rustygears:1147072174264426606> Rusty gears":
              db.fetch(`rustyGears_${tokenDB}`) || 0,
            "<:torncloth:1147103370637738035> Torn cloth":
              db.fetch(`tornCloth_${tokenDB}`) || 0,
            "<:brokenstick:1147072664792485949> Broken stick":
              db.fetch(`brokenStick_${tokenDB}`) || 0,
            "<:dustbin:1147071977601908767> Dustbin":
              db.fetch(`dustbin_${tokenDB}`) || 0,
            "<:newspaper:1147073903068463114> Newspaper":
              db.fetch(`newspaper_${tokenDB}`) || 0,
            "<:usedtissue:1147072375305797692> Used tissue":
              db.fetch(`usedTissue_${tokenDB}`) || 0,
            "<:cotton:1147116559526015088>Cotton":
              db.fetch(`cotton_${tokenDB}`) || 0, // Common material
            "<:supergem:1147106342427955300> Super gem":
              db.fetch(`superGem_${tokenDB}`) || 0, // Mythic material
            "<:leather:1147104055701798933> Leather":
              db.fetch(`leather_${tokenDB}`) || 0, // Arcane material
            "<:arcaneshard:1147112213073629206> Arcane shard":
              db.fetch(`arcaneShard_${tokenDB}`) || 0, // Arcane material
            "<:icecube:1147112519878590514> Ice cube":
              db.fetch(`iceCube_${tokenDB}`) || 0, // Arcane material
            "<:greenrock:1147112816235515954> Green rock":
              db.fetch(`greenRock_${tokenDB}`) || 0, // Arcane material
            "<:silk:1147103793058693130> Silk":
              db.fetch(`silk_${tokenDB}`) || 0, // Arcane material
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
            "<:goldbar:1147101331534921758> Gold Bar": "Mythic",
            "<:daggerofdeath:1147084241516105728> Dagger of death": "Arcane",
            "<:bullet:1147100873164603472> Bullet": "Arcane",
            "<:awakeninggem:1147071223042424902> Awakening gem": "Common",
            "<:eliteawakeninggem:1147070929957027860> Elite awakening gem":
              "Epic",
            "<:ventorianbow:1147084109986930688> Ventorian bow of ventor":
              "Common",
            "<:texarusthedemonishedstaff:1147083583899586661> Texarus the demonished staff":
              "Legendary",
            "<:waetrathefreezedbow:1147084610279325706> Waetra the freezed bow":
              "Mythic",
            "<:rashetathefuriousaxe:1147085204779962408> Rasheta the furious axe":
              "Mythic",
            "<:naturedaggers:1147084151686701068> Nature daggers of superpower":
              "Arcane",
            "<:immortalgun:1147084130807455814> Immortal gun of energy":
              "Arcane",
            "<:vanityicon:1147071701633482773> Golden Ghost Knight Set":
              "Vanity",
            "<:vanityicon:1147071701633482773> Supreme magical set": "Vanity",
            "<:vanityicon:1147071701633482773> Frozen set": "Vanity",
            "<:vanityicon:1147071701633482773> Super golem set": "Vanity",
            "<:vanityicon:1147071701633482773> Dawnfire set": "Vanity",
            "<:vanityicon:1147071701633482773> Arcane sensei set": "Vanity",
            "<:vanityicon:1147071701633482773> Intrepid set": "Vanity",
            "<:vanityicon:1147071701633482773> Medusa set": "Vanity",
            "<:unlockedCrateOfEnergy:1147102884585017355> Unlocked crate of energy":
              "Rare",
            "<:vortexorb:1147066784969666600> Vortex orb": "Arcane",
            "<:verdantwhisperleaf:1147068073619226684> Verdant Whisper leaf":
              "Arcane",
            "<:celestialmoonstone:1147070214987583519> Celestial Moonstone":
              "Arcane",
            "<:crystallinecorestone:1147068766983819275> Crystalline corestone":
              "Mythic",
            "<:tomeofeverlastingwisdom:1147073417275773018> Tome of everlasting wisdom":
              "Mythic",
            "<:rustygears:1147072174264426606> Rusty gears": "common",
            "<:dustbin:1147071977601908767> Dustbin": "common",
            "<:newspaper:1147073903068463114> Newspaper": "common",
            "<:torncloth:1147103370637738035> Torn cloth": "common",
            "<:usedtissue:1147072375305797692> Used tissue": "common",
            "<:brokenstick:1147072664792485949> Broken stick": "common",
            "<:cotton:1147116559526015088>Cotton": "common",
            "<:supergem:1147106342427955300> Super gem": "Mythic",
            "<:leather:1147104055701798933> Leather": "Arcane",
            "<:arcaneshard:1147112213073629206> Arcane shard": "Arcane",
            "<:icecube:1147112519878590514> Ice cube": "Mythic",
            "<:greenrock:1147112816235515954> Green rock": "common",
            "<:silk:1147103793058693130> Silk": "common",
          };
          const itemsID = {
            "<:goldbar:1147101331534921758> Gold Bar": "goldBar",
            "<:daggerofdeath:1147084241516105728> Dagger of death":
              "daggerOfDeath",
            "<:bullet:1147100873164603472> Bullet": "bullet",
            "<:awakeninggem:1147071223042424902> Awakening gem": "awakeningGem",
            "<:eliteawakeninggem:1147070929957027860> Elite awakening gem":
              "eliteAwakeningGem",
            "<:ventorianbow:1147084109986930688> Ventorian bow of ventor":
              "ventorianBow",
            "<:texarusthedemonishedstaff:1147083583899586661> Texarus the demonished staff":
              "texarus",
            "<:waetrathefreezedbow:1147084610279325706> Waetra the freezed bow":
              "waetra",
            "<:rashetathefuriousaxe:1147085204779962408> Rasheta the furious axe":
              "rasheta",
            "<:naturedaggers:1147084151686701068> Nature daggers of superpower":
              "natureDaggers",
            "<:immortalgun:1147084130807455814> Immortal gun of energy":
              "immortalGun",
            "<:vanityicon:1147071701633482773> Golden Ghost Knight Set":
              "goldenGhostKnightSet",
            "<:vanityicon:1147071701633482773> Supreme magical set":
              "supremeMagicalSet",
            "<:vanityicon:1147071701633482773> Frozen set": "frozenSet",
            "<:vanityicon:1147071701633482773> Super golem set":
              "superGolemSet",
            "<:vanityicon:1147071701633482773> Dawnfire set": "dawnfireSet",
            "<:vanityicon:1147071701633482773> Arcane sensei set":
              "arcaneSenseiSet",
            "<:vanityicon:1147071701633482773> Intrepid set": "intrepidSet",
            "<:vanityicon:1147071701633482773> Medusa set": "medusaSet",
            "<:unlockedCrateOfEnergy:1147102884585017355> Unlocked crate of energy":
              "unlockedCrateOfEnergy",
            "<:vortexorb:1147066784969666600> Vortex orb": "vortexOrb",
            "<:verdantwhisperleaf:1147068073619226684> Verdant Whisper leaf":
              "verdantLeaf",
            "<:celestialmoonstone:1147070214987583519> Celestial Moonstone":
              "celestialMoonstone",
            "<:crystallinecorestone:1147068766983819275> Crystalline corestone":
              "crystallineCorestone",
            "<:tomeofeverlastingwisdom:1147073417275773018> Tome of everlasting wisdom":
              "tomeOfEverlastingWisdom",
            "<:rustygears:1147072174264426606> Rusty gears": "rustyGears",
            "<:dustbin:1147071977601908767> Dustbin": "dustbin",
            "<:newspaper:1147073903068463114> Newspaper": "newspaper",
            "<:torncloth:1147103370637738035> Torn cloth": "tornCloth",
            "<:usedtissue:1147072375305797692> Used tissue": "usedTissue",
            "<:brokenstick:1147072664792485949> Broken stick": "brokenStick",
            "<:cotton:1147116559526015088>Cotton": "cotton",
            "<:supergem:1147106342427955300> Super gem": "superGem",
            "<:leather:1147104055701798933> Leather": "leather",
            "<:arcaneshard:1147112213073629206> Arcane shard": "arcaneShard",
            "<:icecube:1147112519878590514> Ice cube": "iceCube",
            "<:greenrock:1147112816235515954> Green rock": "greenRock",
            "<:silk:1147103793058693130> Silk": "silk",
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
                `**${itemName}** : (${amount}) x pcs\n   Rarity: ${rarity}, ID: ${itemID}\n`
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
            await inventoryMessage.react("<:leftarrow:1147157614065627208>");
            await inventoryMessage.react("<:rightarrow:1147157581266165811>");

            const filter = (reaction, user) => {
              return (
                ["leftarrow", "rightarrow"].includes(reaction.emoji.name) &&
                user.id === message.author.id
              );
            };

            const collector = inventoryMessage.createReactionCollector(filter, {
              time: 90000,
              dispose: true,
            });

            collector.on("collect", (reaction) => {
              reaction.users.remove(message.author).catch(console.error);

              if (
                reaction.emoji.name === "rightarrow" &&
                currentPage < totalPages
              ) {
                currentPage++;
                inventoryMessage.edit(showCurrentPage());
              } else if (
                reaction.emoji.name === "leftarrow" &&
                currentPage > 1
              ) {
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
