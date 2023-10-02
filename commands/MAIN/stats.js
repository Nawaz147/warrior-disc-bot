const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const startFunction = require("../../startCommandFunction.js");
const prices = require("../../prices.json");
const rashetaDamage = require("../../weaponStats/rashetaAxe.json");
const waetraDamage = require("../../weaponStats/waetraBow.json");
const texarus = require("../../weaponStats/texarusStaff.json");
const natureDaggerss = require("../../weaponStats/natureDaggers.json");
const ventorianBoww = require("../../weaponStats/ventorianBow.json");
const immortalGunn = require("../../weaponStats/immortalGun.json");
const daggerOfDeathh = require("../../weaponStats/daggerOfDeath.json");
const moonsShineOfMetalSwordd = require("../../weaponStats/moonsShineOfMetalSword.json");
// Create a Map to cache user balances

module.exports = {
  name: "stats",
  aliases: ["Stats"],
  description: "To see player stats",
  usage: "stats",
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
    db.set(`enshrinedAsAMysterionixLegend_${tokenDB}`, true);
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      const natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
      const natureDaggersEquipped = db.fetch(
        `equippedNatureDaggers_${tokenDB}`
      );
      const ventorianBow = db.fetch(`ventorianBow_${tokenDB}`);
      const ventorianBowEquipped = db.fetch(`equippedVentorianBow_${tokenDB}`);
      const texarus = db.fetch(`texarus_${tokenDB}`);
      const texarusEquipped = db.fetch(`equippedTexarus_${tokenDB}`);
      const waetra = db.fetch(`waetra_${tokenDB}`);
      const waetraEquipped = db.fetch(`equippedWaetra_${tokenDB}`);
      const rasheta = db.fetch(`rasheta_${tokenDB}`);
      const rashetaEquipped = db.fetch(`equippedRasheta_${tokenDB}`);
      const immortal = db.fetch(`immortalGun_${tokenDB}`);
      const immortalEquipped = db.fetch(`equippedImmortalGun_${tokenDB}`);
      const daggerOfDeath = db.fetch(`daggerOfDeath_${tokenDB}`);
      const daggerOfDeathEquipped = db.fetch(
        `equippedDaggerOfDeath_${tokenDB}`
      );
      const moonsShineOfMetalSword = db.fetch(
        `moonsShineOfMetalSword_${tokenDB}`
      );
      const moonsShineOfMetalSwordEquipped = db.fetch(
        `equippedMoonsShineOfMetalSword_${tokenDB}`
      );
      if (natureDaggersEquipped == "True") {
        var weaponDamage = natureDaggerss.Damage;
        db.set(`weaponDamage_${tokenDB}`, weaponDamage);
        var weaponEquipped = true;
      } else if (ventorianBowEquipped == "True") {
        var weaponDamage = ventorianBoww.Damage;
        db.set(`weaponDamage_${tokenDB}`, weaponDamage);
        var weaponEquipped = true;
      } else if (waetraEquipped == "True") {
        var weaponDamage = waetraDamage.Damage;
        db.set(`weaponDamage_${tokenDB}`, weaponDamage);
        var weaponEquipped = true;
      } else if (rashetaEquipped == "True") {
        var weaponDamage = rashetaDamage.Damage;
        db.set(`weaponDamage_${tokenDB}`, weaponDamage);
        var weaponEquipped = true;
      } else if (immortalEquipped == "True") {
        var weaponDamage = immortalGunn.Damage;
        db.set(`weaponDamage_${tokenDB}`, weaponDamage);
        var weaponEquipped = true;
      } else if (texarusEquipped == "True") {
        var weaponDamage = texarus.Damage;
        db.set(`weaponDamage_${tokenDB}`, weaponDamage);
        var weaponEquipped = true;
      } else if (daggerOfDeathEquipped == "True") {
        var daggerOfDeathLevel = db.fetch(`daggerOfDeathLevel_${tokenDB}`) || 1;
        if (daggerOfDeathLevel > 1) {
          var daggerOfDeathDamage = db.fetch(`daggerOfDeathDamage_${tokenDB}`);
          weaponDamage = daggerOfDeathDamage;
          db.set(`weaponDamage_${tokenDB}`, daggerOfDeathDamage);
          weaponEquipped = true;
        } else {
          weaponDamage = daggerOfDeathh.Damage;
          db.set(`weaponDamage_${tokenDB}`, weaponDamage);
          weaponEquipped = true;
        }
      } else if (moonsShineOfMetalSwordEquipped == "True") {
        var weaponDamage = moonsShineOfMetalSwordd.Damage;
        db.set(`weaponDamage_${tokenDB}`, weaponDamage);
        var weaponEquipped = true;
      }
      var weaponDamage = db.fetch(`weaponDamage_${tokenDB}`) || "No Damage";
      if (weaponDamage > 0) {
        weaponDamage = weaponDamage
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      var battlesLost = db.fetch(`battlesLost_${tokenDB}`) || 0;
      var battlesWon = db.fetch(`battlesWon_${tokenDB}`) || 0;
      var warPoints = db.fetch(`warPoints_${tokenDB}`) || 0;
      var soldiers = db.fetch(`soldiers_${tokenDB}`) || 0;
      var bullet = db.fetch(`bullet_${tokenDB}`) || 0;
      var goldLoot = db.fetch(`goldLoot_${tokenDB}`).toFixed(2) || 0;
      var militaryPower = db.fetch(`power.${tokenDB}`) || 0;
      const statsEmbed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s stats`)
        .addField(`Weapon Damage`, weaponDamage)
        .addField(`Gold loot`, `${goldLoot}x`)
        .addField(`Soldiers`, soldiers)
        .addField(`Bullet`, bullet)
        .addField(`Military power`, militaryPower)
        .addField(`Battles lost`, battlesLost)
        .addField(`Battles won`, battlesWon)
        .addField(`War points`, warPoints)
        .setColor(`#2B2D31`);
      message.channel.send(statsEmbed);
    }
  },
};
