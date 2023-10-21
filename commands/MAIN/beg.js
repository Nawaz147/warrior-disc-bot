const Discord = require("discord.js");
const db = require("quick.db");

const begMessages = [
  "You asked for some coins and got",
  "Someone took pity on you and gave you",
  "You begged and received",
  "A generous soul gave you",
  "You successfully begged for",
  "You did a little dance, and someone rewarded you with",
  "You looked really sad, and it worked! You received",
  "Begging level over 9000! You received",
  // ... Add more custom beg messages here
  "A passing stranger handed you",
  "You found a lost wallet and got",
  "You recited a poem, and someone gave you",
  "You told a joke, and the laughter earned you",
  "With puppy eyes, you received",
  "You pretended to be a noble in need, and someone believed you, giving you",
  "You sang a sad song, and your performance earned you",
  "You claimed to be a wizard with a hunger spell, and someone gave you",
  "You pretended to be a long-lost royalty, and someone gave you",
  "You showed off your rare collection of imaginary coins, and someone rewarded you with",
  "You spoke in riddles, and someone rewarded you with",
  "You gave a dramatic monologue about the struggles of being coinless, and someone took pity on you, giving you",
  "You jingled an empty cup, and people filled it with",
  "You did a backflip, and someone rewarded your acrobatic skills with",
  "You claimed to be a time traveler, and someone gave you",
  "You spun an elaborate tale about a dragon stealing your gold, and someone gave you",
  "You wore a sign that said 'Will beg for coins,' and it surprisingly worked, earning you",
  "You performed a magic trick with an empty hat, and someone gave you",
  "You recited a Shakespearean sonnet about poverty, and someone gave you",
  "You did a cartwheel, and someone was impressed, giving you",
  "You juggled invisible coins, and someone thought it was entertaining, giving you",
  "You declared yourself the world's best beggar, and someone rewarded you with",
  "You stood on one leg for an hour, and someone rewarded your dedication with",
  "You claimed to be a coin magnet, and someone believed you, giving you",
  "You offered to be someone's lucky charm, and they rewarded you with",
  "You did the moonwalk, and someone rewarded your smooth moves with",
  "You claimed to be a ninja beggar, and someone gave you",
  "You recited a rap about being broke, and someone rewarded your rhyming skills with",
  "You pretended to be a pirate in search of treasure, and someone gave you",
  "You did a magic trick with an invisible coin, and someone believed it, giving you",
  "You offered to tell a joke for coins, and someone rewarded you with",
  "You claimed to be a beggar superhero, and someone gave you",
  "You performed a dramatic fainting act, and someone took pity on you, giving you",
  "You pretended to be a time-traveling beggar from the future, and someone gave you",
];

const richBegMessages = [
  "Imagine begging when you're a millionaire!",
  "What are you doing? You're richer than most people!",
  "Begging? You should be giving money to others!",
  "You're asking for coins? Look at your pockets!",
  "Did you forget you're rolling in gold?",
  "Begging with that bank balance? Really?",
  "You're practically swimming in gold, and you want more?",
  "Why are you begging? You're a financial wizard!",
  "Coins? You're surrounded by a mountain of wealth!",
  "You're asking for coins as if you're broke. Hilarious!",
];
const footerMessages = [
  "A humble beggar at your service",
  "May your pockets never be empty",
  "Begging is an art, and I'm the artist",
  "Coins for your thoughts?",
  "Begging journey: Level up!",
  "Your friendly neighborhood beggar",
  "Begging mode activated",
  "Is it raining gold yet?",
];
const richFooterMessages = [
  "Rolling in gold, yet here we are!",
  "Begging with a fortune? Curious choice!",
  "Begging? I should be asking you for coins!",
  "Even millionaires have their humble moments",
  "Begging from the lap of luxury!",
  "Begging in a golden suit, quite the sight!",
];

module.exports = {
  name: "beg",
  description: "Beg for some coins",
  usage: "beg",
  category: "Economy",
  run: async (client, message, args) => {
    const cooldowns = new Discord.Collection();
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);

    if (!tokenDB) {
      return message.channel.send(
        `${user}, you need to register your token first. Type \`Oyo token me\` to set your Oyo token.`
      );
    }
    if (cooldowns.has(user.id)) {
      const remainingCooldown = (cooldowns.get(user.id) - Date.now()) / 1000;
      return message.reply(
        `please wait ${remainingCooldown.toFixed(
          1
        )} more seconds before using the \`beg\` command.`
      );
    }
    const userBalance = db.fetch(`money_${tokenDB}.pocket`);
    const isRich = userBalance > 5000000;
    const amount = isRich
      ? richBegMessages[Math.floor(Math.random() * richBegMessages.length)]
      : Math.floor(Math.random() * 12501) + 2019;

    const footer = isRich
      ? richFooterMessages[
          Math.floor(Math.random() * richFooterMessages.length)
        ]
      : footerMessages[Math.floor(Math.random() * footerMessages.length)];

    const embed = new Discord.MessageEmbed()
      .setColor("#8B4513") // Brown color for a beggar theme
      .setDescription(
        isRich
          ? amount
          : `${
              begMessages[Math.floor(Math.random() * begMessages.length)]
            } **${addCommas(amount)}** gold coins.`
      )
      .setFooter(footer);

    if (!isRich) {
      await db.add(`money_${tokenDB}.pocket`, amount);
    }
    cooldowns.set(user.id, Date.now() + 30 * 1000); // 30 seconds cooldown
    setTimeout(() => {
      cooldowns.delete(user.id);
    }, 30 * 1000);
    message.channel.send(embed);
  },
};

// Function to add commas to a number for better formatting
function addCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
