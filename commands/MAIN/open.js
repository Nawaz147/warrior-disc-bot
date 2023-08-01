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
      var PlatinumVentorianEgg2022 = await db.fetch(
        `PlatinumVentorianEgg2022_${tokenDB}`
      );
      if (PlatinumVentorianEgg2022 === null) {
        var PlatinumVentorianEgg2022 = "0";
      }
      var goldenVentorianEgg2022 = await db.fetch(
        `goldenVentorianEgg2022_${tokenDB}`
      );
      if (goldenVentorianEgg2022 === null) {
        var goldenVentorianEgg2022 = "0";
      }
      var greenVentorianEgg2022 = await db.fetch(
        `greenVentorianEgg2022_${tokenDB}`
      );
      if (greenVentorianEgg2022 === null) {
        var greenVentorianEgg2022 = "0";
      }
      var blueVentorianEgg2022 = await db.fetch(
        `blueVentorianEgg2022_${tokenDB}`
      );
      if (blueVentorianEgg2022 === null) {
        var blueVentorianEgg2022 = "0";
      }
      var redVentorianEgg2022 = await db.fetch(
        `redVentorianEgg2022_${tokenDB}`
      );
      if (redVentorianEgg2022 === null) {
        var redVentorianEgg2022 = "0";
      }
      var keysSack = await db.fetch(`2850keys_${tokenDB}`);
      if (keysSack === null) {
        var keysSack = "0";
      }
      const PlatinumEggDrops = [
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "5",
        "10",
        "10",
        "10",
        "10",
        "10",
        "10",
        "10",
        "10",
        "15",
        "15",
        "15",
        "15",
        "15",
        "15",
        "15",
        "20",
        "20",
        "20",
        "20",
        "20",
        "20",
        "25",
        "30",
        "35",
        "40",
        "45",
        "50",
        "55",
        "60",
        "60",
        "65",
        "70",
        "75",
        "80",
        "85",
        "90",
        "95",
        "100",
      ];

      if (args[0] == "platinumEgg") {
        const amount = args[1];
        // if amount not a number
        if (isNaN(amount)) {
          message.channel.send(`${user} please enter a number to open an egg`);
        } else if (amount > PlatinumVentorianEgg2022) {
          message.channel.send(
            `${user} you don't have ${args[1]} Oron Ventorian Eggs`
          );
        } else if (!PlatinumVentorianEgg2022) {
          message.channel.send(`${user} you don't have any Platinum eggs`);
          //   db.add(`PlatinumVentorianEgg2022_${user}.${tokenDB}`, 100);
        } else {
          // give the user the item * amount , give items random from the array
          const random1 = Math.floor(Math.random() * PlatinumEggDrops.length);
          const randomPlatinum = PlatinumEggDrops[random1];
          db.subtract(`PlatinumVentorianEgg2022_${tokenDB}`, amount);
          db.fetch(`orons_${tokenDB}`);
          db.add(`orons_${tokenDB}`, randomPlatinum * amount);
          message.channel.send(
            "```arm\n['You received : " +
              randomPlatinum * amount +
              " Platinum from " +
              amount +
              " Platinum Ventorian Eggs ']```"
          );
        }
      } else if (args[0] == "goldenEgg") {
        const amount = args[1];
        // if amount not a number
        if (isNaN(amount)) {
          message.channel.send(`${user} please enter a number to open an egg`);
        } else if (amount > goldenVentorianEgg2022) {
          message.channel.send(
            `${user} you don't have ${args[1]} Golden Ventorian Eggs`
          );
        } else if (!goldenVentorianEgg2022) {
          message.channel.send(
            `${user} you don't have any Golden Ventorian Eggs`
          );
        } else {
          // give the user the item * amount , give items random from the array
          const randomGoldCoins = Math.floor(Math.random() * 300000) + 0;
          db.subtract(`goldenVentorianEgg2022_${tokenDB}`, amount);
          db.fetch(`money_${tokenDB}.pocket`);
          db.add(`money_${tokenDB}.pocket`, randomGoldCoins * amount);
          message.channel.send(
            "```arm\n['You received : " +
              randomGoldCoins * amount +
              " Gold Coins from " +
              amount +
              " Gold Ventorian Eggs ']```"
          );
        }
      } else if (args[0] == "greenEgg") {
        const amount = args[1];
        // if amount not a number
        if (isNaN(amount)) {
          message.channel.send(`${user} please enter a number to open an egg`);
        } else if (amount > greenVentorianEgg2022) {
          message.channel.send(
            `${user} you don't have ${args[1]} Green Ventorian Eggs`
          );
        } else if (!greenVentorianEgg2022) {
          message.channel.send(
            `${user} you don't have any Green Ventorian Eggs`
          );
        } else {
          // give the user the item * amount , give items random from the array
          const randomGoldCoins2 = Math.floor(Math.random() * 15000) + 0;
          db.subtract(`greenVentorianEgg2022_${tokenDB}`, amount);
          db.fetch(`money_${tokenDB}.pocket`);
          db.add(`money_${tokenDB}.pocket`, randomGoldCoins2 * amount);
          message.channel.send(
            "```arm\n['You received : " +
              randomGoldCoins2 * amount +
              " Gold Coins from " +
              amount +
              " Green Ventorian Eggs ']```"
          );
        }
      } else if (args[0] == "redEgg") {
        const amount = args[1];
        // if amount not a number
        if (isNaN(amount)) {
          message.channel.send(`${user} please enter a number to open an egg`);
        } else if (amount > redVentorianEgg2022) {
          message.channel.send(
            `${user} you don't have ${args[1]} Red Ventorian Eggs`
          );
        } else if (!redVentorianEgg2022) {
          message.channel.send(`${user} you don't have any Red Ventorian Eggs`);
        } else {
          // give the user the item * amount , give items random from the array
          const randomGoldCoins3 = Math.floor(Math.random() * 60000) + 0;
          db.subtract(`redVentorianEgg2022_${tokenDB}`, amount);
          db.fetch(`money_${tokenDB}.pocket`);
          db.add(`money_${tokenDB}.pocket`, randomGoldCoins3 * amount);
          message.channel.send(
            "```arm\n['You received : " +
              randomGoldCoins3 * amount +
              " Gold Coins from " +
              amount +
              " Red Ventorian Eggs ']```"
          );
        }
      } else if (args[0] == "blueEgg") {
        const amount = args[1];
        // if amount not a number
        if (isNaN(amount)) {
          message.channel.send(`${user} please enter a number to open an egg`);
        } else if (amount > blueVentorianEgg2022) {
          message.channel.send(
            `${user} you don't have ${args[1]} Blue Ventorian Eggs`
          );
        } else if (!blueVentorianEgg2022) {
          message.channel.send(
            `${user} you don't have any Blue Ventorian Eggs`
          );
        } else {
          // give the user the item * amount , give items random from the array
          const randomGoldCoins4 = Math.floor(Math.random() * 30000) + 0;
          db.subtract(`blueVentorianEgg2022_${tokenDB}`, amount);
          db.fetch(`money_${tokenDB}.pocket`);
          db.add(`money_${tokenDB}.pocket`, randomGoldCoins4 * amount);
          message.channel.send(
            "```arm\n['You received : " +
              randomGoldCoins4 * amount +
              " Gold Coins from " +
              amount +
              " Blue Ventorian Eggs ']```"
          );
        }
      } else if (args[0] == "keysSack") {
        const amount = args[1];
        // if amount not a number
        if (isNaN(amount)) {
          message.channel.send(
            `${user} please enter a number to open keys sack`
          );
        }
        if (amount > keysSack) {
          message.channel.send(`${user} you don't have ${args[1]} keys sack`);
          db.set(`2850keys_${tokenDB}`, 0);
        } else if (keysSack == 0) {
          message.channel.send(`${user} you don't have keys sack`);
          db.set(`2850keys_${tokenDB}`, 0);
        } else if (!keysSack) {
          message.channel.send(`${user} you don't have keys sack`);
          db.set(`2850keys_${tokenDB}`, 0);
        } else {
          // give the user the item * amount , give items random from the array
          db.add(`userKeys_${tokenDB}`, amount * 2850);
          message.channel.send(
            "```" +
              `You opened ${amount}x 2850 key sacks and u got ${
                amount * 2850
              } keys` +
              "```"
          );
          db.subtract(`2850keys_${tokenDB}`, amount * 2850);
        }
      } else if (args[0] == "warriorPack") {
        const amount = args[1];
        // if amount not a number
        const warriorPack = db.fetch(`warriorPack_${tokenDB}`);
        if (isNaN(amount)) {
          message.channel.send(
            `${user} please enter the amount of Warrior pack you want to open`
          );
        } else if (amount > warriorPack) {
          message.channel.send(
            `${user} you don't have ${args[1]} Warrior pack`
          );
        } else if (!warriorPack) {
          message.channel.send(`${user} you don't have any Warrior pack`);
        } else {
          // give the user the item * amount , give items random from the array
          randomGoldCoins5 = Math.floor(Math.random() * 25000000) + 10000000;
          randomPlatinum2 = Math.floor(Math.random() * 10000) + 5000;
          const weapons = [
            "Texarus the demonished staff",
            "Waetra the freezed bow",
            "Rasheta the furious axe",
            "Nature Daggers of superpower",
          ];
          const randomWeapon =
            weapons[Math.floor(Math.random() * weapons.length)];

          db.subtract(`warriorPack_${tokenDB}`, amount);
          db.fetch(`money_${tokenDB}.pocket`);
          db.add(`money_${tokenDB}.pocket`, randomGoldCoins5 * amount);
          db.add(`money_${tokenDB}.pocket`, randomGoldCoins5);
          db.add(`orons_${tokenDB}`, randomPlatinum2);
          randomGoldCoins5 =
            randomGoldCoins5 + String().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          randomPlatinum2 =
            randomPlatinum2 + String().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          var opening = await message.channel.send(
            `Opening Warrior pack <:warriorPack:1047775486610255872>`
          );
          setTimeout(function () {
            opening.edit(
              "```" +
                `
  You received : ${randomWeapon}
  You received : ${randomGoldCoins5} Gold Coins
  You received : ${randomPlatinum2} Platinum
` +
                "```"
            );
            if (randomWeapon == "Texarus the demonished staff") {
              db.add(`texarus_${tokenDB}`, 1);
            }
            if (randomWeapon == "Waetra the freezed bow") {
              db.add(`waetra_${tokenDB}`, 1);
            }
            if (randomWeapon == "Rasheta the furious axe") {
              db.add(`rasheta_${tokenDB}`, 1);
            }
            if (randomWeapon == "Nature Daggers of superpower") {
              db.add(`natureDaggers_${tokenDB}`, 1);
            }
          }, 3000);
        }
      }
      if (args[0]) {
        if (
          args[0] !== "greenEgg" &&
          args[0] !== "redEgg" &&
          args[0] !== "blueEgg" &&
          args[0] !== "PlatinumEgg" &&
          args[0] !== "goldenEgg" &&
          args[0] !== "warriorPack" &&
          args[0] !== "keysSack"
        ) {
          message.channel.send(
            `*Invalid item name [item named **${args[0]}** does not exist*]  , Usage eg : +open greenEgg`
          );
        }
      }
    }
  },
};
