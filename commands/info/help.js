const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "help",
  aliases: ["hlp"],
  description: "To get more info",
  usage: "Help <Channel> <Message>",
  run: async (client, message, args) => {
    const update = db.fetch(`updateInProgress`);
    if (update == true) {
      message.channel.send(
        `You cannot use any commands right now! Bot is updating`
      );
    } else {
      const Embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Command List")
        .setDescription(
          `
        __**Economy**__  💰
        *token ,  balance , store , vi , event , vendor , character , sell , stats , shop , eggInv , equip , store , wepInfo , gw*
        
                  **REQUESTED BY : ${message.member}**
              `
        )
        .setThumbnail("https://i.redd.it/qq911bvdqwu51.gif")
        .setTimestamp();
      message.channel.send(Embed).catch((err) => {
        console.log(err);
      });
    }
  },
};
