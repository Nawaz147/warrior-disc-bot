const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db");
const Canvas = require("canvas");
const startFunction = require("../../startCommandFunction.js");
module.exports = {
  name: "eventInfo",
  aliases: ["event", "eventPrewiew", "eventDetails"],
  description: "To get current eventInfo",
  usage: "eventInfo",
  category: "Economy",
  run: async (client, message, args) => {
    let user = message.author;
    const tokenDB = db.fetch(`${user.id}.valoriumToken`);
    const update = db.fetch(`updateInProgress`);
    const acceptedTOS = db.fetch(`acceptedTOS_${tokenDB}`) || false;
    const banned = db.fetch(`banned_${tokenDB}`) || false;

    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      const eventEmbed = new Discord.MessageEmbed()
        .setColor("#66FF33")
        .addField("Event Name : ", "Valorium event")
        .addField(
          `
**LOOT TABLE**
`,
          `1. <:valoriumsSoul:1147382331422810132> Valorium's eclipsian soul
2. <:valoriumsTear:1147381630009364581> Valorium's tear
3. <:vanityicon:1147071701633482773> Arcane sensei set
4. <:vanityicon:1147071701633482773> Golden ghost knight set
5. <:platinum:1147864790782464130> 500 platinum
6. <:platinum:1147864790782464130> Random platinum (1 - 24)
7. <:goldcoins:1147864245862678548> Random gold coins (12,508 - 24,939)
8. 🗡 Soldier 🗡
`
        )

        .setTimestamp()
        .setColor("#E6E6FA");

      message.channel.send(eventEmbed);
    }
  },
};
