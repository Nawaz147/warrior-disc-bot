const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const startFunction = require("../../startCommandFunction.js");
module.exports = {
  name: "item",
  aliases: ["ItemInfo", "ii", "II"],
  description: "To check info of an item",
  usage: "itemInfo",
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
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      var item = args[0];
      if (item) {
        if (
          item == "valoriumsEclipsianSoul" ||
          item == "valoriumsTear" ||
          item == "goldBar" ||
          item == "vortexOrb" ||
          item == "tomeOfEverlastingWisdom"
        ) {
          var valoriumsEclipsianSoul =
            db.fetch(`valoriumsEclipsianSoul_${tokenDB}`) || 0;
          var valoriumsEclipsianSoulStoreAdd =
            db.fetch(`valoriumsEclipsianSoulStoreAdd`) || 0;
          var valoriumsTear = db.fetch(`valoriumsTear_${tokenDB}`) || 0;
          var valoriumsTearStoreAdd = db.fetch(`valoriumsTearStoreAdd`) || 0;
          var goldBar = db.fetch(`goldBar_${tokenDB}`) || 0;
          var vortexOrb = db.fetch(`vortexOrb_${tokenDB}`) || 0;
          var vortexOrbStoreAdd = db.fetch(`vortexOrbStoreAdd`) || 0;
          var tomeOfEverlastingWisdom =
            db.fetch(`tomeOfEverlastingWisdom_${tokenDB}`) || 0;
          var tomeOfEverlastingWisdomStoreAdd =
            db.fetch(`tomeOfEverlastingWisdomStoreAdd`) || 0;
          const itemInfoEmbed = new Discord.MessageEmbed().setColor(`#ffe4e1`);
          if (item == "valoriumsEclipsianSoul") {
            itemInfoEmbed.setDescription(`
Legend has it that this shimmering, obsidian gem contains a fragment of the very essence of Valorium, the ancient and enigmatic boss who once ruled the shadows. The Eclipsian Soul radiates an eerie, otherworldly aura, and its surface seems to ripple with a faint, celestial glow.  `);
            itemInfoEmbed.setTitle(`Valorium's eclipsian soul`);
            itemInfoEmbed.addField(`Buy cost`, `50,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `25,000,000`);
            itemInfoEmbed.addField(`Rarity`, `Arcane`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${valoriumsEclipsianSoul}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${valoriumsEclipsianSoulStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "valoriumsEclipsianSoul");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/RgW8bYt/capture-2.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "valoriumsTear") {
            itemInfoEmbed.setDescription(`
          This crystalline teardrop, radiant with an ethereal, bluish glow, is believed to be a manifestation of Valorium's sorrow and regret. It shimmers like a fallen star, holding within it a piece of the boss's inner turmoil.`);
            itemInfoEmbed.setTitle(`Valorium's Tear`);
            itemInfoEmbed.addField(`Buy cost`, `12,750,000`);
            itemInfoEmbed.addField(`Sell cost`, `6,375,000`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${valoriumsTear}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${valoriumsTearStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "valoriumsTear");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/QXVjQ0y/Capture.png`);
            message.channel.send(itemInfoEmbed);
          } else if (item == "goldBar") {
            itemInfoEmbed.setDescription(`
            A gleaming, rectangular ingot of pure, radiant gold. Its surface is smooth and polished to perfection, reflecting the ambient light with a warm, lustrous glow. Embossed with intricate engravings of ancient symbols, the gold bar exudes an aura of opulence and wealth.
            `);
            itemInfoEmbed.setTitle(`Gold bar`);
            itemInfoEmbed.addField(`Buy cost`, `10,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `10,000,000`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `currency`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${goldBar}`);
            itemInfoEmbed.addField(`Pieces available for sale`, `Unlimited`);
            itemInfoEmbed.addField(
              `Function`,
              `The Gold Bar serves as a valuable investment for adventurers seeking to expand their wealth beyond the confines of a mere coin purse. Each of these bars has an intrinsic value of 10 million gold coins, making it a portable storehouse of immense riches. Owning a Gold Bar allows you to increase your gold cap, enabling you to hoard even more treasure and achieve unparalleled financial power within the realm.`
            );
            itemInfoEmbed.addField(`ID`, "goldBar");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/4YT7qzN/gold-bar.png`);
            message.channel.send(itemInfoEmbed);
          } else if (item == "vortexOrb") {
            itemInfoEmbed.setDescription(`
            The Vortex Orb is a mesmerizing, collectible item of arcane rarity, said to possess the very essence of the Archon Vortanax, a formidable and enigmatic boss within the world of RPG. This rare artifact is as elusive as it is powerful, sought after by adventurers and collectors alike for its mysterious properties.
            `);
            itemInfoEmbed.setTitle(`Vortex orb`);
            itemInfoEmbed.addField(`Buy cost`, `50,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `25,000,000`);
            itemInfoEmbed.addField(`Rarity`, `Arcane`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${vortexOrb}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${vortexOrbStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "vortexOrb");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/nrbZ3v3/vortex-orb.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "tomeOfEverlastingWisdom") {
            itemInfoEmbed.setDescription(`
            The Tome of Everlasting Wisdom is an extraordinary relic of unparalleled significance, whispered to be the ultimate source of knowledge and arcane power. This coveted treasure is only granted to those who have vanquished the formidable Archon Vortanax, an achievement held in awe by adventurers throughout your RPG Discord bot's world.
            `);
            itemInfoEmbed.setTitle(`Tome of everlasting wisdom`);
            itemInfoEmbed.addField(`Buy cost`, `20,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `10,000,000`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${tomeOfEverlastingWisdom}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${tomeOfEverlastingWisdomStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "tomeOfEverlastingWisdom");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/9tsrqwP/tome-of-everlasting-wisdom.png`
            );
            message.channel.send(itemInfoEmbed);
          }
        } else {
          var invalidItemName = new Discord.MessageEmbed()
            .setDescription("Invalid item name")
            .setColor(`#b10000`);
          message.channel.send(invalidItemName);
        }
      } else {
        var itemNameNotSpecifiedEmbed = new Discord.MessageEmbed()
          .setDescription("Please mention an item name")
          .setColor(`#b10000`);
        message.channel.send(itemNameNotSpecifiedEmbed);
      }
    }
  },
};
