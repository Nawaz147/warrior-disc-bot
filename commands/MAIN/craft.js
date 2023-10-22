const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const wazBow = require("../../weaponStats/wazbow.json");
const moneyCap = config.moneyCap;
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "craft",
  aliases: ["craftItem", "Craft"],
  description: "To craft vanity",
  usage: "craft",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const now = Date.now();
    const craftCooldown = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;
    const isPoisoned = db.fetch(`isPoisoned_${tokenDB}`) || false;
    if (startFunction) {
      await startFunction(message, args, client);
    }
    if (
      tokenDB &&
      acceptedTOS == true &&
      update == false &&
      banned == false &&
      isPoisoned == false
    ) {
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      if (!args[0]) {
        const craftEmbed = new Discord.MessageEmbed()
          .setTitle(`Craft`)
          .setDescription(
            `
Super Golem set : (craft superGolem.v)
Frozen set : (craft frozen.v)
Dawnfire set : (craft dawnfire.v)
`
          )
          .setColor(`#ffffff`);
        message.channel.send(craftEmbed);
      } else {
        var arcaneShard = db.fetch(`arcaneShard_${tokenDB}`);
        if (arcaneShard == null || arcaneShard == undefined) {
          arcaneShard = 0;
        }
        var superGem = db.fetch(`superGem_${tokenDB}`);
        if (superGem == null || superGem == undefined) {
          superGem = 0;
        }
        var greenRock = db.fetch(`greenRock_${tokenDB}`);
        if (greenRock == null || greenRock == undefined) {
          greenRock = 0;
        }
        var iceCube = db.fetch(`iceCube_${tokenDB}`);
        if (iceCube == null || iceCube == undefined) {
          iceCube = 0;
        }
        var money = db.fetch(`money_${tokenDB}.pocket`);
        if (money == null || money == undefined) {
          money = 0;
        }

        if (args[0] == "frozen") {
          if (iceCube >= 3) {
            if (money < 2250000) {
              const moneyNeeded = numberWithCommas(2250000 - money);
              message.channel.send(`You need more ${moneyNeeded} Gold coins`);
            } else {
              const now = Date.now();
              const craftingTime = now + craftCooldown;
              db.subtract(`iceCube_${tokenDB}`, 3);
              db.subtract(`money_${tokenDB}.pocket`, 2250000);
              db.set(`crafting_${tokenDB}`, craftingTime);
              db.set(`craftingItem_${tokenDB}`, "frozen");
              message.channel.send(
                `You have started crafting the Frozen set. It will take 3 days to complete.`
              );
              setTimeout(async () => {
                const craftingTimeStored = db.get(`crafting_${tokenDB}`);
                if (craftingTimeStored && now >= craftingTimeStored) {
                  db.delete(`crafting_${tokenDB}`);
                  db.delete(`craftingItem_${tokenDB}`);
                  db.add(`frozenSet_${tokenDB}`, 1);
                  const userDM = client.users.cache.get(user.id);
                  if (userDM) {
                    userDM.send(
                      "Your crafting is complete! You can now use the Frozen set."
                    );
                  }
                }
              }, craftCooldown);
            }
          } else {
            money = numberWithCommas(money);
            const iceCubeNeeded = 3 - iceCube;
            const craftingEmbed = new Discord.MessageEmbed()
              .setTitle(`Crafting Requirements - Frozen Set`)
              .setDescription(
                `You don't have sufficient crafting items. Here are the requirements to craft the Frozen Set:\n`
              )
              .addField(
                "Ice Cubes",
                `${iceCube}/${3} (Needed: ${iceCubeNeeded})`,
                true
              )
              .addField(
                "Gold Coins",
                `${money}/${numberWithCommas(2250000)}`,
                true
              )
              .setColor("#ffffff");
            message.channel.send(craftingEmbed);
          }
        } else if (args[0] == "dawnfire") {
          money = numberWithCommas(money);
          if (arcaneShard >= 1) {
            if (money < 2250000) {
              const moneyNeeded = numberWithCommas(2250000 - money);
              message.channel.send(`You need more ${moneyNeeded} Gold coins`);
            } else {
              const now = Date.now();
              const craftingTime = now + craftCooldown;
              db.subtract(`arcaneShard_${tokenDB}`, 1);
              db.subtract(`money_${tokenDB}.pocket`, 2250000);
              db.set(`crafting_${tokenDB}`, craftingTime);
              db.set(`craftingItem_${tokenDB}`, "dawnfire");
              message.channel.send(
                `You have started crafting the Dawnfire set. It will take 3 days to complete.`
              );
              setTimeout(async () => {
                const craftingTimeStored = db.get(`crafting_${tokenDB}`);
                if (craftingTimeStored && now >= craftingTimeStored) {
                  db.delete(`crafting_${tokenDB}`);
                  db.delete(`craftingItem_${tokenDB}`);
                  db.add(`dawnfireSet_${tokenDB}`, 1);
                  const userDM = client.users.cache.get(user.id);
                  if (userDM) {
                    userDM.send(
                      "Your crafting is complete! You can now use the Dawnfire set."
                    );
                  }
                }
              }, craftCooldown);
            }
          } else {
            const arcaneShardNeeded = 1 - arcaneShard;
            const craftingEmbed = new Discord.MessageEmbed()
              .setTitle(`Crafting Requirements - Dawnfire Set`)
              .setDescription(
                `You don't have sufficient crafting items. Here are the requirements to craft the Dawnfire Set:\n`
              )
              .addField(
                "Arcane Shards",
                `${arcaneShard}/${1} (Needed: ${arcaneShardNeeded})`,
                true
              )
              .addField(
                "Gold Coins",
                `${money}/${numberWithCommas(2250000)}`,
                true
              )
              .setColor("#ffffff");
            message.channel.send(craftingEmbed);
          }
        } else if (args[0] == "superGolem") {
          money = numberWithCommas(money);
          if (arcaneShard >= 3 && superGem >= 3 && greenRock >= 35) {
            if (money < 5000000) {
              const moneyNeeded = numberWithCommas(5000000 - money);
              message.channel.send(`You need more ${moneyNeeded} Gold coins`);
            } else {
              const now = Date.now();
              const craftingTime = now + craftCooldown;
              db.subtract(`arcaneShard_${tokenDB}`, 3);
              db.subtract(`superGem_${tokenDB}`, 3);
              db.subtract(`greenRock_${tokenDB}`, 35);
              db.subtract(`money_${tokenDB}.pocket`, 5000000);
              db.set(`crafting_${tokenDB}`, craftingTime);
              db.set(`craftingItem_${tokenDB}`, "superGolem");
              message.channel.send(
                `You have started crafting the Super Golem set. It will take 3 days to complete.`
              );
              setTimeout(async () => {
                const craftingTimeStored = db.get(`crafting_${tokenDB}`);
                if (craftingTimeStored && now >= craftingTimeStored) {
                  db.delete(`crafting_${tokenDB}`);
                  db.delete(`craftingItem_${tokenDB}`);
                  db.add(`superGolemSet_${tokenDB}`, 1);
                  const userDM = client.users.cache.get(user.id);
                  if (userDM) {
                    userDM.send(
                      "Your crafting is complete! You can now use the Super Golem set."
                    );
                  }
                }
              }, craftCooldown);
            }
          } else {
            const arcaneShardNeeded = 3 - arcaneShard;
            const superGemNeeded = 3 - superGem;
            const greenRockNeeded = 35 - greenRock;
            const craftingEmbed = new Discord.MessageEmbed()
              .setTitle(`Crafting Requirements - Super Golem Set`)
              .setDescription(
                `You don't have sufficient crafting items. Here are the requirements to craft the Super Golem Set:\n`
              )
              .addField(
                "Arcane Shards",
                `${arcaneShard}/${3} (Needed: ${arcaneShardNeeded})`,
                true
              )
              .addField(
                "Super Gems",
                `${superGem}/${3} (Needed: ${superGemNeeded})`,
                true
              )
              .addField(
                "Green Rocks",
                `${greenRock}/${35} (Needed: ${greenRockNeeded})`,
                true
              )
              .addField(
                "Gold Coins",
                `${money}/${numberWithCommas(5000000)}`,
                true
              )
              .setColor("#ffffff");
            message.channel.send(craftingEmbed);
          }
        }
      }
    }
  },
};

// Function to add commas to numbers for better readability
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
