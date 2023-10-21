const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");

const slotItems = [
  "🍇",
  "🍉",
  "🍊",
  "🍎",
  "🦥",
  "🍓",
  "🍒",
  "🍌",
  "🥝",
  "🍏",
  "🥭",
];

const winMessages = [
  "Congratulations!",
  "Wow, you're on fire!",
  "Jackpot! You're a winner!",
  "You struck gold! Amazing!",
  "Incredible luck! You won!",
];

const loseMessages = [
  "Better luck next time!",
  "Don't worry, you'll get it next time!",
  "Tough luck! Keep trying!",
  "No worries, it happens to the best of us!",
  "Unlucky this time, but the next one might be yours!",
];

module.exports = {
  name: "gamble",
  aliases: ["gamb"],
  description: "Take a chance and gamble your gold coins",
  usage: "gamble <amount>",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);

    if (!tokenDB) {
      return message.channel.send(
        `${user}, your token is not registered yet. Type \`Oyo token me\` to set your Oyo token.`
      );
    }

    let moneydb = await db.fetch(`money_${tokenDB}.pocket`);

    let money = parseInt(args[0]);

    let moneymore = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`❌ You are trying to bet more than you have`);

    let moneyhelp = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`❌ Specify an amount to gamble`);

    if (isNaN(money) || money <= 0) {
      return message.channel.send(moneyhelp);
    }

    if (money > moneydb) {
      return message.channel.send(moneymore);
    }

    let win = false;
    let number = [];

    for (let i = 0; i < 3; i++) {
      number[i] = Math.floor(Math.random() * slotItems.length);
    }

    if (number[0] == number[1] && number[1] == number[2]) {
      money *= 9;
      win = true;
    } else if (
      number[0] == number[1] ||
      number[0] == number[2] ||
      number[1] == number[2]
    ) {
      money *= 2;
      win = true;
    }

    const embed = new Discord.MessageEmbed()
      .setTitle("Slot Machine")
      .setDescription(
        `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
          slotItems[number[2]]
        }`
      )
      .setFooter(`${user.username}, you bet ${addCommas(money)} gold coins`);

    if (win) {
      const winMessage =
        winMessages[Math.floor(Math.random() * winMessages.length)];
      embed
        .setColor("#00FF00")
        .addField(winMessage, `You won ${addCommas(money)} gold coins! 🎉`);
      await db.add(`money_${tokenDB}.pocket`, money);
    } else {
      const loseMessage =
        loseMessages[Math.floor(Math.random() * loseMessages.length)];
      embed
        .setColor("#FF0000")
        .addField(loseMessage, `You lost ${addCommas(money)} gold coins. 😔`);
      await db.subtract(`money_${tokenDB}.pocket`, money);
    }

    message.channel.send(embed);
  },
};

// Function to add commas to a number for better formatting
function addCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
