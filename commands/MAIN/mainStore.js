const Discord = require("discord.js");
const db = require("quick.db");
const colors = require("../../colors.json");
const ms = require("parse-ms");

module.exports = {
  name: "store",
  aliases: ["Store"],
  description: "To see store",
  usage: "store",
  category: "Economy",
  run: async (client, message, args) => {
    const user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const Platinum = db.fetch(`platinum_${tokenDB}`);
    const banned = db.fetch(`banned_${tokenDB}`);
    const banReason = db.fetch(`reasonForBan_${tokenDB}`);
    const banDate = db.fetch(`banDate_${tokenDB}`);
    const update = db.fetch(`updateInProgress`);
    var totalCratePieces = db.fetch(`totalCratePieces`) || 0;
    let cratePieces = db.fetch(`cratePieces`) || totalCratePieces;
    if (!tokenDB) {
      message.channel.send(
        `${user}, your Valorium token is not registered yet. Type +token me to set your Valorium token.`
      );
    } else if (banned) {
      const banEmbed = new Discord.MessageEmbed()
        .setTitle(user.username)
        .setDescription(`This account is banned`)
        .addField("Reason", `${banReason}`)
        .addField("Date", `${banDate}`)
        .setColor("#FFFF00");
      message.channel.send(banEmbed);
      return;
    } else if (update == true && message.author.id !== "768747976767832084") {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating.`
      );
    } else {
      // Store details
      const lockedCrates = 300; // Number of locked crates per batch
      const crateOpenInterval = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
      const goldChance = 0.85; // 85% chance to get gold
      const platinumChance = 0.1; // 10% chance to get platinum
      const vanityChance = 0.035; // 3.5% chance to get vanity
      const weaponChance = 0.015; // 1.5% chance to get weapons
      const minPlatinum = 5;
      const maxPlatinum = 25;
      const weapons = [
        "Texarus the demonished staff",
        "Waetra the freezed bow",
        "Rasheta the furious axe",
        "Nature daggers of superpower",
        "Immortal gun of energy",
        "Dagger of death",
      ]; // Replace with actual weapon names
      const minGold = 2000;
      const maxGold = 12000;
      const lockedCratePrice = 10; // Price of locked crate of energy in platinum

      // Check if the user wants to buy a locked crate
      if (args[0] === "buy" && args[1] === "lockedCrateOfEnergy") {
        timeout = 800;
        var cooldown = await db.fetch(`cooldown_${tokenDB}`);
        if (cooldown !== null && timeout - (Date.now() - cooldown) > 0) {
          let time = ms(timeout - (Date.now() - cooldown));

          let timeEmbed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setTitle(`Spamming isn't a good thing`)
            .setDescription(
              `You need to wait ${time.seconds}s ${time.milliseconds}ms `
            );
          message.channel.send(timeEmbed);
        } else {
          var currentTime = Date.now();
          var nextResetTime =
            db.fetch(`cratePiecesResetTime`) || currentTime + crateOpenInterval;
          var timeLeft = nextResetTime - currentTime;
          if (timeLeft < 0) {
            // If the time left is negative, it means the reset time has passed, so we set it to zero
            timeLeft = 0;
            // Update the next reset time
            nextResetTime = currentTime + crateOpenInterval;
            db.set(`cratePiecesResetTime`, nextResetTime);
            db.set(`cratePieces`, lockedCrates);
          } else if (cratePieces <= 0) {
            message.channel.send(
              `Sorry, ${user}, Locked crate of energy is not available in store now . You need to wait till it resets.`
            );
            return;
          } else {
            if (Platinum >= lockedCratePrice) {
              // Deduct the price from user's platinum
              db.subtract(`platinum_${tokenDB}`, lockedCratePrice);

              // Calculate the type of reward (gold, platinum, vanity, or weapon)
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
              } else if (
                rewardType <
                goldChance + platinumChance + vanityChance
              ) {
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
              cratePieces -= 1;
              db.set(`cratePieces`, cratePieces);

              // Send a message to the user about the looted reward
              const rewardEmbed = new Discord.MessageEmbed()
                .setTitle(user.username)
                .setDescription(`You received: ${reward}`)
                .setColor("#228B22");
              message.channel.send(rewardEmbed);
              db.set(`cratePiecesResetTime`, db.fetch(`cratePiecesResetTime`));
              const cooldownDuration = 800;
              db.set(`cooldown_${tokenDB}`, Date.now() + cooldownDuration);
            } else {
              message.channel.send(
                `${user}, you don't have enough platinum to buy the locked crate of energy.`
              );
            }
          }
        }
      } else {
        const currentTime = Date.now();
        let nextResetTime = db.fetch(`cratePiecesResetTime`);
        if (!nextResetTime || nextResetTime <= currentTime) {
          cratePieces = 300; // Reset cratePieces to 300
          nextResetTime = currentTime + crateOpenInterval; // Set the next reset time
          db.set(`cratePieces`, cratePieces);
          db.set(`cratePiecesResetTime`, nextResetTime);
        }

        // Calculate the time left until the next reset
        const timeLeft = nextResetTime - currentTime;

        // Convert milliseconds to hours, minutes, and seconds
        const hoursLeft = Math.floor(timeLeft / 3600000);
        const minutesLeft = Math.floor((timeLeft % 3600000) / 60000);
        const secondsLeft = Math.floor((timeLeft % 60000) / 1000);

        // Format the time left as a string
        const timeLeftString = `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;

        const storeEmbed = new Discord.MessageEmbed()
          .setTitle("Store")
          .setDescription(
            `
    **Locked crate of energy** - ${lockedCratePrice} Platinum [ID : lockedCrateOfEnergy] (${cratePieces} / 300 left)
    `
          )
          .setFooter(`Pieces reset in ${timeLeftString}`)
          .setColor("#00FF00");

        message.channel.send(storeEmbed);
      }
    }
  },
};
