const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");

module.exports = {
  name: "daily",
  aliases: ["daily"],
  description: "To claim daily",
  usage: "daily",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;

    let timeout = 86400000;
    const tokenDB = db.fetch(`${user.id}.oyOtoken`);
    if (!tokenDB) {
      message.channel.send(
        `${user} your token is not registered yet , type <Oyo token me to set your Oyo token`
      );
    } else {
      let daili = Math.floor(Math.random() * 8004) + 1;
      let multiplier = await db.fetch(`multiplier_${user.id}.${tokenDB}`);
      if (!multiplier) multiplier = 1;
      let dailies = daili * multiplier;

      let daily = await db.fetch(`daily_${user.id}.${tokenDB}`);
      let money = await db.fetch(`money_${user.id}.${tokenDB}.pocket`);

      if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let timeEmbed = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(
            `You've already collected your daily reward , You can collect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `
          );
        message.channel.send(timeEmbed);
      } else if (money > "999989999") {
        message.channel.send(
          `You can't collect your daily reward , it will exceed money cap`
        );
      } else {
        let moneyEmbed = new Discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setDescription(
            `You've collected your daily reward of ${dailies} __**oyons**__ <:Oyon:949194574344114196> `
          );

        await db.add(`money_${user.id}.${tokenDB}.pocket`, dailies);
        await db.set(`daily_${user.id}.${tokenDB}`, Date.now());

        message.channel.send(moneyEmbed);
      }
    }
  },
};
