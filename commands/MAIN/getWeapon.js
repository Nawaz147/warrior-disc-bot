const Discord = require("discord.js");
const db = require("quick.db");
const colors = require("../../colors.json");
const startFunction = require("../../startCommandFunction.js");
const token = require("./token");
module.exports = {
  name: "getWeapon",
  aliases: ["GW", "gw", "Gw", "gW"],
  description: "To get free weapon",
  usage: "getWeapon",
  category: "Economy",
  run: async (client, message, args) => {
    const user = message.author;
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
      if (db.fetch(`ventorianBow_${tokenDB}`)) {
        const alreadyHaveEmbed = new Discord.MessageEmbed()
          .setDescription(
            `
You already have it.
  `
          )
          .setColor("#b10000");
        message.channel.send(alreadyHaveEmbed);
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      } else {
        // db.set(`enshrinedAsAMysterionixLegend_${tokenDB}`, true);
        // db.set(`firstBlood_${tokenDB}`, true);
        // db.set(`decadeOfAnnihilation_${tokenDB}`, true);
        // db.set(`halfCenturyOfDestruction_${tokenDB}`, true);
        // db.set(`centuryOfSlaughter_${tokenDB}`, true);
        // db.set(`acquiredAHeftySumOf100k_${tokenDB}`, true);
        // db.set(`amassedAnImpressiveHaulOf500k_${tokenDB}`, true);
        // db.set(`reachedAmillionInRiches_${tokenDB}`, true);
        // db.set(`glorious10mPlunder_${tokenDB}`, true);
        // db.set(`wealthConqueror_${tokenDB}`, true);
        // db.set(`emergingAwareness_${tokenDB}`, true);
        // db.set(`tenthEnlightenment_${tokenDB}`, true);
        // db.set(`ascendedFifty_${tokenDB}`, true);
        // db.set(`centennialEpiphany_${tokenDB}`, true);
        // db.set(`lootedGold_${tokenDB}`, 100000000) || 0;
        // db.add(`achievementPoints_${tokenDB}`, 8390);

        // db.set(`totalAwakenings_${tokenDB}`, 100);
        db.set(`ventorianBow_${tokenDB}`, 1);
        const ventorianBowEmbed = new Discord.MessageEmbed()
          .setTitle("Your free weapon")
          .setDescription("You received : Ventorian bow of ventor !")
          .setColor("#00FF00");
        message.channel.send(ventorianBowEmbed);
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        setTimeout(() => {
          const guide3Embed = new Discord.MessageEmbed()
            .setTitle("Last guide")
            .setDescription(
              `
Type equip ventorianBow.x,
Type play hit.x to play event,
example : react down of the embed to hit boss after typing play hit.x
Every hit boss life decreases as per your weapon damage,
For commands list and promocodes go to our website : https://mysterionix6.web.app
`
            )
            .setFooter(`Good luck`)
            .setColor(`#0000FF`);
          message.channel.send(guide3Embed);
        }, 1500);
      }
    }
  },
};
