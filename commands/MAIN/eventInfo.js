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
      // const eventEmbed = new Discord.MessageEmbed()
      //   .setColor("#66FF33")
      //   .addField("Event Name : ", "Valorium event")
      //   .addField(
      //     `
      // **LOOT TABLE**
      // `,
      //     `1. <:valoriumsSoul:1147382331422810132> Valorium's eclipsian soul
      // 2. <:valoriumsTear:1147381630009364581> Valorium's tear
      // 3. <:vanityicon:1147071701633482773> Arcane sensei set
      // 4. <:vanityicon:1147071701633482773> Golden ghost knight set
      // 5. <:platinum:1147864790782464130> 500 platinum
      // 6. <:platinum:1147864790782464130> Random platinum (1 - 24)
      // 7. <:goldcoins:1147864245862678548> Random gold coins (12,508 - 24,939)
      // 8. 🗡 Soldier 🗡
      // `
      //   )
      //   .setTimestamp()
      //   .setColor("#E6E6FA");
      //       const eventEmbed = new Discord.MessageEmbed()
      //         .setColor("#66FF33")
      //         .addField("Event Name : ", "Epic Odyssey")
      //         .setDescription(
      //           `Brace yourself for an adventure of epic proportions! The realm is in turmoil, and only the bravest of warriors can seize the opportunity to wield unimaginable power. Embark on the 'Epic Odyssey' and become a legend!`
      //         )
      //         .addField(
      //           `Items possible to loot`,
      //           `
      // 1. <:orbOfElementalMastery:1151189114767540265> Orb of elemental mastery (Arcane)
      // 2. <:shieldOfTheEarthshaker:1151190097924980867> Shield of the earthshaker (Mythic)
      // 3. <:timekeepersChronometer:1151190901314551898> Timekeeper's chronometer (Mythic)
      // 4. Key
      // 5. Soldier
      // 6. Elite awakening gem
      // 7. Awakening gem
      // 8. random amount of gold (2,035 - 10.294)
      // `
      //         )
      //         .addField(`Boss name`, `Phoenix King Pyroclastor`)
      //         .setFooter(`Start date : 12 september 2023`)
      //         .setThumbnail(`https://i.ibb.co/QrK36pf/gif.gif`)
      //         .setColor("#191970");
      //       message.channel.send(eventEmbed);
      const eventEmbed = new Discord.MessageEmbed()
        .setTitle(`Ongoing event info`)
        .addField("Event Name : ", "Rise of the infernoth dragon")
        .setDescription(
          `Prepare yourselves for the most harrowing challenge yet, as the world trembles in the shadow of an ancient and malevolent force. The 'Rise of the Infernoth Dragon' is upon us. Legends speak of a time when the skies themselves will blaze with fury, and the earth will quake with fear as the Infernoth Dragon awakens from its slumber.
**Loot table**
1. <a:moonsShineOfMetalSword:1154071077954269245> Moon's shine of metal sword (Heroic) 
2. <:eldritchFlameScroll:1154411820283613275> Eldritch flame scroll (Arcane)
3. <:infernothsWrathfulEye:1154412305128378499> Infernoth's wrathful eye (Mythic)
4. <:pyroclasmicGem:1154412690870108261> Pyroclasmic Gem (Mythic)
5. <:pyroclasmicEssence:1154413077807255612> Pyroclasmic essence (Mythic)
6. <:magmaticTorch:1154413864386052146> Magmatic torch (Mythic)
7. <:eternalFlameEssence:1154414454155530371> Eternal flame essence (Legendary)
8. <:texarusthedemonishedstaff:1147083583899586661> Texarus the demonished staff (Legendary)
9. 🗡 Soldier
10. <:eliteawakeninggem:1147070929957027860> Elite awakening gem (Epic)
11. <:blackOil:1154415835998322718> Black Oil (Epic)
12. <:hotWater:1154416000360525924> Hot water (Rare)
13. <:transparentGlass:1154416282133876868> Transparent glass (Rare)
14. <:awakeninggem:1147071223042424902> Awakening gem (Common)
15. <:rustygears:1147072174264426606> Rusty gears (Common)
16. <:torncloth:1147103370637738035> Torn cloth (Common)
17. <:brokenstick:1147072664792485949> Broken stick (Common)
18. <:newspaper:1147073903068463114> Newspaper (Common)
19. <:usedtissue:1147072375305797692> Used tissue (Common)
20. <:dustbin:1147071977601908767> Dustbin (Common)
21. Gold coins (21,092 to 38,408)          
`
        )
        .addField(`Boss name`, `Infernoth, the emberwing`)
        .setFooter(`Start date : 21 september 2023`)
        .setThumbnail(`https://i.ibb.co/Hg5nsDC/infernoth-The-Emberwing.gif`)
        .setColor("#8B0000");
      message.channel.send(eventEmbed);
    }
  },
};
