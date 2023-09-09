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
          item == "tomeOfEverlastingWisdom" ||
          item == "verdantLeaf" ||
          item == "abyssalCrownOfDominance" ||
          item == "abyssalStarcrystal" ||
          item == "eldrazursGrimoireOfRuin" ||
          item == "abyssalScepterOfOblivion" ||
          item == "bullet" ||
          item == "mysticRuneOfResilience" ||
          item == "auroraGaze"
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
          var verdantLeaf = db.fetch(`verdantLeaf_${tokenDB}`) || 0;
          var verdantLeafStoreAdd = db.fetch(`verdantLeafStoreAdd`) || 0;
          var abyssalCrownOfDominance =
            db.fetch(`abyssalCrownOfDominance_${tokenDB}`) || 0;
          var abyssalCrownOfDominanceStoreAdd =
            db.fetch(`abyssalCrownOfDominanceStoreAdd`) || 0;
          var abyssalStarcrystal =
            db.fetch(`abyssalStarcrystal_${tokenDB}`) || 0;
          var abyssalStarcrystalStoreAdd =
            db.fetch(`abyssalStarcrystalStoreAdd`) || 0;
          var eldrazursGrimoireOfRuin =
            db.fetch(`eldrazursGrimoireOfRuin_${tokenDB}`) || 0;
          var eldrazursGrimoireOfRuinStoreAdd =
            db.fetch(`eldrazursGrimoireOfRuinStoreAdd`) || 0;
          var abyssalScepterOfOblivion =
            db.fetch(`abyssalScepterOfOblivion_${tokenDB}`) || 0;
          var abyssalScepterOfOblivionStoreAdd =
            db.fetch(`abyssalScepterOfOblivionStoreAdd`) || 0;
          var mysticRuneOfResilience =
            db.fetch(`mysticRuneOfResilience_${tokenDB}`) || 0;
          var mysticRuneOfResilienceStoreAdd =
            db.fetch(`mysticRuneOfResilienceStoreAdd`) || 0;
          var auroraGaze = db.fetch(`auroraGaze_${tokenDB}`) || 0;
          var auroraGazeStoreAdd = db.fetch(`auroraGazeStoreAdd`) || 0;
          var bullet = db.fetch(`bullet_${tokenDB}`) || 0;
          var bulletStoreAdd = db.fetch(`bulletStoreAdd`) || 0;
          db.set(`bulletStoreAdd`, "Unlimited");
          const itemInfoEmbed = new Discord.MessageEmbed().setColor(`#4169E1`);
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
          } else if (item == "verdantLeaf") {
            itemInfoEmbed.setDescription(`
            The Verdant Whisper Leaf is a rare and enigmatic treasure, often whispered about in hushed tones among adventurers and scholars. It is a coveted prize, said to be a gift from the mystical realm of nature itself. This arcane foliage is not merely an item; it is a living, breathing entity deeply connected to the natural world.
            `);
            itemInfoEmbed.setTitle(`Verdant whisper leaf`);
            itemInfoEmbed.addField(`Buy cost`, `45,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `22,500,000`);
            itemInfoEmbed.addField(`Rarity`, `Arcane`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${verdantLeaf}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${verdantLeafStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "verdantLeaf");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/42Gf5db/verdant-whisper-leaf.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "abyssalCrownOfDominance") {
            itemInfoEmbed.setDescription(`
            Forged in the heart of chaos and bathed in the essence of eternal night, this regal crown is a testament to the ultimate triumph over the abyss. Its dark, ornate design is a masterpiece of malevolent craftsmanship, crowned with an abyssal gemstone that pulses with unholy power. When placed upon one's brow, it bestows dominion over the very fabric of the abyss itself.
            `);
            itemInfoEmbed.setTitle(`Abyssal crown of Dominance`);
            itemInfoEmbed.addField(`Buy cost`, `225,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `112,500,000`);
            itemInfoEmbed.addField(`Rarity`, `Heroic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${abyssalCrownOfDominance}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${abyssalCrownOfDominanceStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "abyssalCrownOfDominance");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/mBcqtqH/abyssal-Crown-Of-Dominance.gif`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "abyssalStarcrystal") {
            itemInfoEmbed.setDescription(`
            This rare and mesmerizing gem is a celestial anomaly, hailing from the darkest corners of the cosmos. Its core shimmers with a haunting, ever-changing radiance, reminiscent of distant stars in a bottomless void. Encased within the crystal, an enigmatic energy dances, echoing the whispers of ancient cosmic forces.
            `);
            itemInfoEmbed.setTitle(`Abyssal starcrystal`);
            itemInfoEmbed.addField(`Buy cost`, `185,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `92,500,000`);
            itemInfoEmbed.addField(`Rarity`, `Arcane`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${abyssalStarcrystal}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${abyssalStarcrystalStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "abyssalStarcrystal");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/FhRXV2Q/crystal.png`);
            message.channel.send(itemInfoEmbed);
          } else if (item == "eldrazursGrimoireOfRuin") {
            itemInfoEmbed.setDescription(`
            Eldra'zur's Grimoire of Ruin is a testament to the unfathomable power of the abyss. Its dark pages hold the key to cataclysmic destruction and ultimate dominion over the arcane. Yet, with great power comes great peril, as those who dare to wield it risk becoming lost within the ever-hungry maw of Eldra'zur's malevolence.
            `);
            itemInfoEmbed.setTitle(`Eldra'zur's Grimoire of ruin`);
            itemInfoEmbed.addField(`Buy cost`, `160,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `80,000,000`);
            itemInfoEmbed.addField(`Rarity`, `Arcane`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${eldrazursGrimoireOfRuin}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${eldrazursGrimoireOfRuinStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "eldrazursGrimoireOfRuin");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/YNWQXbs/book.png`);
            message.channel.send(itemInfoEmbed);
          } else if (item == "mysticRuneOfResilience") {
            itemInfoEmbed.setDescription(`
            The Mystic Rune of Resilience is a coveted artifact, shrouded in mystic energies and whispered legends. This ornate runic emblem, etched with ancient symbols, radiates an aura of unwavering strength and indomitable willpower. When wielded by a warrior, its true power is unveiled.
            `);
            itemInfoEmbed.setTitle(`Mystic rune of resilience`);
            itemInfoEmbed.addField(`Buy cost`, `380,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `190,000,000`);
            itemInfoEmbed.addField(`Rarity`, `Heroic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Ability`,
              `The Mystic Rune of Resilience endows its bearer with an exceptional augmentation, effectively doubling their military potency. It's important to note that this ability does not accumulate or stack.`
            );
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${mysticRuneOfResilience}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${mysticRuneOfResilienceStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "mysticRuneOfResilience");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/LkbBsmH/ezgif-com-resize-1.gif`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "auroraGaze") {
            itemInfoEmbed.setDescription(`
            Aurora Gaze" is a mystical incantation that conjures the breathtaking beauty of the Northern Lights onto the battlefield. When activated, the caster's eyes shimmer with celestial energy, releasing a radiant aura that bathes the surroundings in a captivating, iridescent glow.
            `);
            itemInfoEmbed.setTitle(`Aurora gaze`);
            itemInfoEmbed.addField(`Buy cost`, `325,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `162,500,000`);
            itemInfoEmbed.addField(`Rarity`, `Heroic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Ability`,
              `The Aurora Gaze ability is a captivating and mystical spectacle that can be accessed using the "+info" command. When invoked, it presents a mesmerizing visual display resembling the enchanting Northern Lights, evoking a sense of wonder and fascination.`
            );
            itemInfoEmbed.addField(`Pieces owned by you`, `${auroraGaze}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${auroraGazeStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "auroraGaze");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/DMkpbNv/blue-gaze.gif`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "abyssalScepterOfOblivion") {
            itemInfoEmbed.setDescription(`
            The Abyssal Scepter of Oblivion is a harbinger of cosmic destruction and an emblem of your dominion over the infinite. It beckons with the allure of unparalleled power, yet the echoes of the abyss that resonate within its core serve as a stark reminder of the eternal struggle between mastery and madness.
            `);
            itemInfoEmbed.setTitle(`Abyssal scepter of oblivion`);
            itemInfoEmbed.addField(`Buy cost`, `185,700,000`);
            itemInfoEmbed.addField(`Sell cost`, `92,850,000`);
            itemInfoEmbed.addField(`Rarity`, `Heroic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${abyssalScepterOfOblivion}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${abyssalScepterOfOblivionStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "abyssalScepterOfOblivion");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/ypRBHBH/abyssal-Scepter-Of-Oblivion.gif`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "bullet") {
            itemInfoEmbed.setDescription(`
            Watch as the Bullet streaks through the pixelated battleground, a flash of brilliance in the night, before it collides with your opponent, shattering their soldiers and sending them reeling. It's not just a simple attack; it's a statement of power. A symbol of your RPG prowess. With the Bullet in your arsenal, you hold the fate of your enemies in your hands. Will they dodge? Will they survive? Or will they fall victim to your strategic mastery? The choice is yours, and the battlefield awaits your command!
            `);
            itemInfoEmbed.setTitle(`Bullet`);
            itemInfoEmbed.addField(`Buy cost`, `35,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `17,500,000`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `military`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${bullet}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${bulletStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "bullet");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/qFHR95G/bullet.png`);
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
