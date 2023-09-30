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
          item == "auroraGaze" ||
          item == "orbOfElementalMastery" ||
          item == "shieldOfTheEarthshaker" ||
          item == "timekeepersChronometer" ||
          item == "eldritchFlameScroll" ||
          item == "infernothsWrathfulEye" ||
          item == "pyroclasmicGem" ||
          item == "magmaticTorch" ||
          item == "eternalFlameEssence" ||
          item == "blackOil" ||
          item == "hotWater" ||
          item == "transparentGlass" ||
          item == "salmon" ||
          item == "smellyFish" ||
          item == "burnedFish" ||
          item == "grumpyCatfish" ||
          item == "pancakeFish" ||
          item == "discoJellyfish" ||
          item == "sodaCanfish" ||
          item == "lavaLampEel" ||
          item == "rubberDuckyfish" ||
          item == "pirateParrotfish" ||
          item == "alienAnglerfish" ||
          item == "ninjaStarfish" ||
          item == "sarcasticFringehead" ||
          item == "boot" ||
          item == "bottle" ||
          item == "toiletSeatLid"
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
          var orbOfElementalMastery =
            db.fetch(`orbOfElementalMastery_${tokenDB}`) || 0;
          var orbOfElementalMasteryStoreAdd =
            db.fetch(`orbOfElementalMasteryStoreAdd`) || 0;
          var shieldOfTheEarthshaker =
            db.fetch(`shieldOfTheEarthshaker_${tokenDB}`) || 0;
          var shieldOfTheEarthshakerStoreAdd =
            db.fetch(`shieldOfTheEarthshakerStoreAdd`) || 0;
          var timekeepersChronometer =
            db.fetch(`timekeepersChronometer_${tokenDB}`) || 0;
          var timekeepersChronometerStoreAdd =
            db.fetch(`timekeepersChronometerStoreAdd`) || 0;
          var bullet = db.fetch(`bullet_${tokenDB}`) || 0;
          var bulletStoreAdd = db.fetch(`bulletStoreAdd`) || 0;
          var eldritchFlameScroll =
            db.fetch(`eldritchFlameScroll_${tokenDB}`) || 0;
          var eldritchFlameScrollStoreAdd =
            db.fetch(`eldritchFlameScrollStoreAdd`) || 0;
          var infernothsWrathfulEye =
            db.fetch(`infernothsWrathfulEye_${tokenDB}`) || 0;
          var infernothsWrathfulEyeStoreAdd =
            db.fetch(`infernothsWrathfulEyeStoreAdd`) || 0;
          var pyroclasmicGem = db.fetch(`pyroclasmicGem_${tokenDB}`) || 0;
          var pyroclasmicGemStoreAdd = db.fetch(`pyroclasmicGemStoreAdd`) || 0;
          var pyroclasmicEssence =
            db.fetch(`pyroclasmicEssence_${tokenDB}`) || 0;
          var pyroclasmicEssenceStoreAdd =
            db.fetch(`pyroclasmicEssenceStoreAdd`) || 0;
          var magmaticTorch = db.fetch(`magmaticTorch_${tokenDB}`) || 0;
          var magmaticTorchStoreAdd = db.fetch(`magmaticTorchStoreAdd`) || 0;
          var eternalFlameEssence =
            db.fetch(`eternalFlameEssence_${tokenDB}`) || 0;
          var eternalFlameEssenceStoreAdd =
            db.fetch(`eternalFlameEssenceStoreAdd`) || 0;
          var blackOil = db.fetch(`blackOil_${tokenDB}`) || 0;
          var blackOilStoreAdd = db.fetch(`blackOilStoreAdd`) || 0;
          var hotWater = db.fetch(`hotWater_${tokenDB}`) || 0;
          var hotWaterStoreAdd = db.fetch(`hotWaterStoreAdd`) || 0;
          var transparentGlass = db.fetch(`transparentGlass_${tokenDB}`) || 0;
          var transparentGlassStoreAdd =
            db.fetch(`transparentGlassStoreAdd`) || 0;
          var salmon = db.fetch(`salmon_${tokenDB}`) || 0;
          var salmonStoreAdd = db.fetch(`salmonStoreAdd`) || 0;
          var smellyFish = db.fetch(`smellyFish_${tokenDB}`) || 0;
          var smellyFishStoreAdd = db.fetch(`smellyFishStoreAdd`) || 0;
          var burnedFish = db.fetch(`burnedFish_${tokenDB}`) || 0;
          var burnedFishStoreAdd = db.fetch(`burnedFishStoreAdd`) || 0;
          var grumpyCatfish = db.fetch(`grumpyCatfish_${tokenDB}`) || 0;
          var grumpyCatfishStoreAdd = db.fetch(`grumpyCatfishStoreAdd`) || 0;
          var pancakeFish = db.fetch(`pancakeFish_${tokenDB}`) || 0;
          var pancakeFishStoreAdd = db.fetch(`pancakeFishStoreAdd`) || 0;
          var discoJellyfish = db.fetch(`discoJellyfish_${tokenDB}`) || 0;
          var discoJellyfishStoreAdd = db.fetch(`discoJellyfishStoreAdd`) || 0;
          var sodaCanfish = db.fetch(`sodaCanfish_${tokenDB}`) || 0;
          var sodaCanfishStoreAdd = db.fetch(`sodaCanfishStoreAdd`) || 0;
          var lavaLampEel = db.fetch(`lavaLampEel_${tokenDB}`) || 0;
          var lavaLampEelStoreAdd = db.fetch(`lavaLampEelStoreAdd`) || 0;
          var rubberDuckyfish = db.fetch(`rubberDuckyfish_${tokenDB}`) || 0;
          var rubberDuckyfishStoreAdd =
            db.fetch(`rubberDuckyfishStoreAdd`) || 0;
          var pirateParrotfish = db.fetch(`pirateParrotfish_${tokenDB}`) || 0;
          var pirateParrotfishStoreAdd =
            db.fetch(`pirateParrotfishStoreAdd`) || 0;
          var alienAnglerfish = db.fetch(`alienAnglerfish_${tokenDB}`) || 0;
          var alienAnglerfishStoreAdd =
            db.fetch(`alienAnglerfishStoreAdd`) || 0;
          var ninjaStarfish = db.fetch(`ninjaStarfish_${tokenDB}`) || 0;
          var ninjaStarfishStoreAdd = db.fetch(`ninjaStarfishStoreAdd`) || 0;
          var boot = db.fetch(`boot_${tokenDB}`) || 0;
          var bootStoreAdd = db.fetch(`bootStoreAdd`) || 0;
          var sarcasticFringehead =
            db.fetch(`sarcasticFringehead_${tokenDB}`) || 0;
          var sarcasticFringeheadStoreAdd =
            db.fetch(`sarcasticFringeheadStoreAdd`) || 0;
          var toiletSeatLid = db.fetch(`toiletSeatLid_${tokenDB}`) || 0;
          var toiletSeatLidStoreAdd = db.fetch(`toiletSeatLidStoreAdd`) || 0;
          var bottle = db.fetch(`bottle_${tokenDB}`) || 0;
          var bottleStoreAdd = db.fetch(`bottleStoreAdd`) || 0;
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
            itemInfoEmbed.addField(`Type`, `Economy`);
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
            itemInfoEmbed.addField(`Type`, `Military & collectible`);
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
          } else if (item == "orbOfElementalMastery") {
            itemInfoEmbed.setDescription(`
            The "Elemental Orb of Mastery" is a radiant sphere that shifts in color, representing mastery over elemental forces. Possessors can harness and manipulate fire, water, earth, and air, but must wield its power wisely.
            `);
            itemInfoEmbed.setTitle(`Orb of elemental mastery`);
            itemInfoEmbed.addField(`Buy cost`, `68,950,000`);
            itemInfoEmbed.addField(`Sell cost`, `34,475,000`);
            itemInfoEmbed.addField(`Rarity`, `Arcane`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${orbOfElementalMastery}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${orbOfElementalMasteryStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "orbOfElementalMastery");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/6NvpWHH/Orb-of-elemental-mastery.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "shieldOfTheEarthshaker") {
            itemInfoEmbed.setDescription(`
            The "Shield of the Earthshaker" is a formidable obsidian shield adorned with seismic patterns.
            `);
            itemInfoEmbed.setTitle(`Shield of the earthshaker`);
            itemInfoEmbed.addField(`Buy cost`, `25,058,006`);
            itemInfoEmbed.addField(`Sell cost`, `12,529,003`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${shieldOfTheEarthshaker}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${shieldOfTheEarthshakerStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "shieldOfTheEarthshaker");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/vqG8RMk/futuristic-glowing-low-polygonal-shield-with-green-leaf-isolated-dark-blue-67515-694-removebg-previe.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "timekeepersChronometer") {
            itemInfoEmbed.setDescription(`
            The "Timekeeper's Chronometer" is an exquisite vintage timepiece with intricate details. It possesses the ability to measure and manipulate time, allowing its wielder to slow or hasten events. A true marvel for those who seek control over the flow of time.
            `);
            itemInfoEmbed.setTitle(`Timekeeper's chronometer`);
            itemInfoEmbed.addField(`Buy cost`, `14,201,590`);
            itemInfoEmbed.addField(`Sell cost`, `7,100,795`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${timekeepersChronometer}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${timekeepersChronometerStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "timekeepersChronometer");
            itemInfoEmbed.setThumbnail(
              `"https://i.ibb.co/CBLMRkX/atmosphera-vintage-world-wall-clock-removebg-preview.png`
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
          } else if (item == "eldritchFlameScroll") {
            itemInfoEmbed.setDescription(`
            Within the cryptic confines of this weathered parchment, ancient and mystical power lies dormant, awaiting a skilled power's touch to awaken its infernal secrets. The Eldritch Flame Scroll is a relic of dark and enigmatic origins, a testament to the boundless depths of arcane mastery.
            `);
            itemInfoEmbed.setTitle(`Eldritch flame scroll`);
            itemInfoEmbed.addField(`Buy cost`, `78,950,000`);
            itemInfoEmbed.addField(`Sell cost`, `39,475,000`);
            itemInfoEmbed.addField(`Rarity`, `Arcane`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${eldritchFlameScroll}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${eldritchFlameScrollStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "eldritchFlameScroll");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/rkjzHFK/eldritch-flame-scroll.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "infernothsWrathfulEye") {
            itemInfoEmbed.setDescription(`
            In the annals of ancient mythology and whispered tales of fire-wreathed realms, there exists a relic of incalculable power—the Infernoth's Wrathful Eye. This mystic artifact is as much a symbol of vengeance as it is a harbinger of cataclysmic destruction, an eye-shaped gem pulsating with the very essence of wrathful infernos.
          `);
            itemInfoEmbed.setTitle(`Infernoth's wrathful eye`);
            itemInfoEmbed.addField(`Buy cost`, `41,250,000`);
            itemInfoEmbed.addField(`Sell cost`, `20,750,000`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${infernothsWrathfulEye}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${infernothsWrathfulEyeStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "infernothsWrathfulEye");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/zh8972B/infernoths-Wrathful-Eye.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "pyroclasmicGem") {
            itemInfoEmbed.setDescription(`
            A Pyroclasmic Gem is a rare and mesmerizing gemstone, forged in the fiery heart of the earth during cataclysmic volcanic eruptions. Its beauty is a stark contrast to its tumultuous origin, as it captures the essence of molten fire and raw elemental power within its crystalline structure.
          `);
            itemInfoEmbed.setTitle(`Pyroclasmic gem`);
            itemInfoEmbed.addField(`Buy cost`, `20,000,000`);
            itemInfoEmbed.addField(`Sell cost`, `10,000,000`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${pyroclasmicGem}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${pyroclasmicGemStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "pyroclasmicGem");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/CMsPT3t/pyroclasmic-Gem.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "pyroclasmicEssence") {
            itemInfoEmbed.setDescription(`
            Pyroclasmic Essence, in its green-hued form, is a remarkable and rare substance that defies the conventional expectations associated with fire. Born from the depths of volcanic eruptions, this enigmatic elixir captures the essence of fire in a verdant manifestation, challenging the boundaries of elemental magic.
          `);
            itemInfoEmbed.setTitle(`Pyroclasmic essence`);
            itemInfoEmbed.addField(`Buy cost`, `11,111,111`);
            itemInfoEmbed.addField(`Sell cost`, `11,111,111`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${pyroclasmicEssence}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${pyroclasmicEssenceStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "pyroclasmicEssence");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/FzL7dfJ/pyroclasmic-Essence.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "magmaticTorch") {
            itemInfoEmbed.setDescription(`
            The Magmatic Torch is a blazing wonder, a handheld inferno that defies the boundaries of mundane fire sources. Crafted by the skilled hands of pyromancers and alchemists, this torch is a testament to the fusion of artistry and elemental mastery.
          `);
            itemInfoEmbed.setTitle(`Magmatic torch`);
            itemInfoEmbed.addField(`Buy cost`, `5,210,000`);
            itemInfoEmbed.addField(`Sell cost`, `2,605,000`);
            itemInfoEmbed.addField(`Rarity`, `Mythic`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${magmaticTorch}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${magmaticTorchStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "magmaticTorch");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/hDjnJXj/magmatic-Torch.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "eternalFlameEssence") {
            itemInfoEmbed.setDescription(`
            The Eternal Flame Essence is a legendary item steeped in myth and mystery. Said to hold the very essence of unending fire, it possesses power and significance that transcends the ordinary.
          `);
            itemInfoEmbed.setTitle(`Eternal flame essence`);
            itemInfoEmbed.addField(`Buy cost`, `3,250,000`);
            itemInfoEmbed.addField(`Sell cost`, `1,625,000`);
            itemInfoEmbed.addField(`Rarity`, `Legendary`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${eternalFlameEssence}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${eternalFlameEssenceStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "eternalFlameEssence");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/g31RPY3/eternal-Flame-Essence.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "blackOil") {
            itemInfoEmbed.setDescription(`
            Black Oil, is a dark and heavy substance found in the wake of dormant volcanoes. This viscous fluid exudes an earthy, smoky scent, a somber reminder of the fiery forces that once roared beneath the earth's surface.
          `);
            itemInfoEmbed.setTitle(`Black oil`);
            itemInfoEmbed.addField(`Buy cost`, `456,120`);
            itemInfoEmbed.addField(`Sell cost`, `228,060`);
            itemInfoEmbed.addField(`Rarity`, `Rare`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${blackOil}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${blackOilStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "blackOil");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/gPgKkc7/blackOil.png`);
            message.channel.send(itemInfoEmbed);
          } else if (item == "hotWater") {
            itemInfoEmbed.setDescription(`
            Hot water, while far from valuable, serves as a ubiquitous comfort in everyday life. It's a simple, easily attainable commodity, often taken for granted, yet cherished for its soothing warmth and myriad practical uses.
          `);
            itemInfoEmbed.setTitle(`Hot water`);
            itemInfoEmbed.addField(`Buy cost`, `32,100`);
            itemInfoEmbed.addField(`Sell cost`, `16,050`);
            itemInfoEmbed.addField(`Rarity`, `Rare`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${hotWater}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${hotWaterStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "hotWater");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/C7J2nQG/hotWater.png`);
            message.channel.send(itemInfoEmbed);
          } else if (item == "transparentGlass") {
            itemInfoEmbed.setDescription(`
            Transparent glass is a mundane and unremarkable material, commonly discarded without a second thought. It is a clear, see-through substance that serves as a basic building block for more intricate creations but holds little inherent value on its own.
          `);
            itemInfoEmbed.setTitle(`Transparent glass`);
            itemInfoEmbed.addField(`Buy cost`, `18,230`);
            itemInfoEmbed.addField(`Sell cost`, `9,115`);
            itemInfoEmbed.addField(`Rarity`, `Rare`);
            itemInfoEmbed.addField(`Type`, `collectible`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${transparentGlass}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${transparentGlassStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "transparentGlass");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/kXYTJYq/transparent-Glass.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "salmon") {
            itemInfoEmbed.setDescription(`
            The salmon, a sleek and resilient swimmer, journeys upstream, embodying determination and adaptability in its quest for survival and reproduction.          `);
            itemInfoEmbed.setTitle(`Salmon`);
            itemInfoEmbed.addField(`Buy cost`, `26,201`);
            itemInfoEmbed.addField(`Sell cost`, `26,201`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${salmon}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${salmonStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "salmon");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/vZr2DZ5/salmon.png`);
            message.channel.send(itemInfoEmbed);
          } else if (item == "smellyFish") {
            itemInfoEmbed.setDescription(`
            The smelly fish, known for its distinctive aroma, adds a pungent essence to the aquatic realm, creating a unique olfactory experience for underwater denizens.          `);
            itemInfoEmbed.setTitle(`Smelly fish`);
            itemInfoEmbed.addField(`Buy cost`, `8,092`);
            itemInfoEmbed.addField(`Sell cost`, `8,092`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${smellyFish}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${smellyFishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "smellyFish");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/DDbxvrK/smelly-fish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "burnedFish") {
            itemInfoEmbed.setDescription(`
            The burned fish, once a victim of overzealous cooking attempts, now swims with a crispy exterior, bringing a unique charred flavor to the underwater world. It's a fish with a tale of culinary misadventure.          `);
            itemInfoEmbed.setTitle(`Burned fish`);
            itemInfoEmbed.addField(`Buy cost`, `12,790`);
            itemInfoEmbed.addField(`Sell cost`, `12,790`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${burnedFish}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${burnedFishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "burnedFish");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/cxCP7Yd/burned-fish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "grumpyCatfish") {
            itemInfoEmbed.setDescription(`
            The grumpy fish, with its perpetually scowling expression, swims disdainfully through the waters, seemingly unimpressed by the aquatic world around it. Its gruff demeanor adds a touch of humor to the serene depths of the ocean.`);
            itemInfoEmbed.setTitle(`Grumpy catfish`);
            itemInfoEmbed.addField(`Buy cost`, `52,150`);
            itemInfoEmbed.addField(`Sell cost`, `52,150`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${grumpyCatfish}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${grumpyCatfishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "grumpyCatfish");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/6v0DZkh/grumpy-catfish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "pancakeFish") {
            itemInfoEmbed.setDescription(`
            The pancake fish, with its flat and whimsical appearance, glides through the water resembling a delectable breakfast delight, adding a touch of playful charm to the aquatic environment.`);
            itemInfoEmbed.setTitle(`Pancake fish`);
            itemInfoEmbed.addField(`Buy cost`, `16,210`);
            itemInfoEmbed.addField(`Sell cost`, `16,210`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${pancakeFish}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${pancakeFishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "pancakeFish");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/y4MzMbC/pancake-fish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "discoJellyfish") {
            itemInfoEmbed.setDescription(`
            The disco jellyfish, adorned with vibrant bioluminescent lights, pulses rhythmically through the ocean, turning the underwater world into a mesmerizing dance floor of colors and patterns.`);
            itemInfoEmbed.setTitle(`Disco jellyfish`);
            itemInfoEmbed.addField(`Buy cost`, `23,191`);
            itemInfoEmbed.addField(`Sell cost`, `23,191`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${discoJellyfish}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${discoJellyfishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "discoJellyfish");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/R3Zd6Gp/disco-jellyfish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "sodaCanfish") {
            itemInfoEmbed.setDescription(`
            The soda canfish, a quirky creation of underwater whimsy, glides through the depths with a metallic sheen, repurposing discarded cans into a whimsical aquatic spectacle.`);
            itemInfoEmbed.setTitle(`Soda canfish`);
            itemInfoEmbed.addField(`Buy cost`, `41,092`);
            itemInfoEmbed.addField(`Sell cost`, `41,092`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${sodaCanfish}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${sodaCanfishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "sodaCanfish");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/7yj2FGw/soda-canfish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "lavaLampEel") {
            itemInfoEmbed.setDescription(`
            The lava lamp eel, with its undulating movements and vibrant colors, mimics the mesmerizing flow of a lava lamp, creating an otherworldly and captivating presence in the depths of the ocean.`);
            itemInfoEmbed.setTitle(`Lava lamp eel`);
            itemInfoEmbed.addField(`Buy cost`, `78,210`);
            itemInfoEmbed.addField(`Sell cost`, `78,210`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${lavaLampEel}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${lavaLampEelStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "lavaLampEel");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/nDrL7sH/lava-lamp-eel.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "rubberDuckyfish") {
            itemInfoEmbed.setDescription(`
            The rubber duckyfish, a delightful fusion of bath toy and aquatic charm, floats merrily through the water, bringing a playful and whimsical spirit to the underwater world.`);
            itemInfoEmbed.setTitle(`Rubber duckyfish`);
            itemInfoEmbed.addField(`Buy cost`, `9,108`);
            itemInfoEmbed.addField(`Sell cost`, `9,108`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${rubberDuckyfish}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${rubberDuckyfishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "rubberDuckyfish");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/NtddYkS/rubber-duckyfish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "sarcasticFringehead") {
            itemInfoEmbed.setDescription(`
            The sarcastic fringehead is a small, vibrant fish with a personality as bold as its colors, known for its comically exaggerated territorial displays and confrontational behavior.`);
            itemInfoEmbed.setTitle(`Sarcastic fringehead`);
            itemInfoEmbed.addField(`Buy cost`, `32,500`);
            itemInfoEmbed.addField(`Sell cost`, `32,500`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${sarcasticFringehead}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${sarcasticFringeheadStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "sarcasticFringehead");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/sqsxjbN/sarcastic-fringehead.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "toiletSeatLid") {
            itemInfoEmbed.setDescription(`
            The toilet seat lid: a humble yet essential accessory in the bathroom, diligently safeguarding against unexpected splashes and providing a temporary throne for contemplation.`);
            itemInfoEmbed.setTitle(`Sarcastic fringehead`);
            itemInfoEmbed.addField(`Buy cost`, `7,100`);
            itemInfoEmbed.addField(`Sell cost`, `7,100`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${toiletSeatLid}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${toiletSeatLidStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "toiletSeatLid");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/6WbJ4vy/toilet-seat-lid.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "pirateParrotfish") {
            itemInfoEmbed.setDescription(`
            The pirate parrotfish, with its vibrant plumage and mischievous demeanor, sails through the seas embodying a swashbuckling charm, adding a touch of seafaring adventure to the underwater realm.`);
            itemInfoEmbed.setTitle(`Pirate parrotfish`);
            itemInfoEmbed.addField(`Buy cost`, `18,029`);
            itemInfoEmbed.addField(`Sell cost`, `18,029`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(
              `Pieces owned by you`,
              `${pirateParrotfish}`
            );
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${pirateParrotfishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "pirateParrotfish");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/vY1rLpz/pirate-parrotfish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "alienAnglerfish") {
            itemInfoEmbed.setDescription(`
            The alien anglerfish, with its otherworldly appearance and luminescent lure, lurks in the depths like an extraterrestrial creature, casting an eerie glow in the mysterious abyss of the ocean.`);
            itemInfoEmbed.setTitle(`Alien anglerfish`);
            itemInfoEmbed.addField(`Buy cost`, `43,102`);
            itemInfoEmbed.addField(`Sell cost`, `43,102`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${alienAnglerfish}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${alienAnglerfishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "alienAnglerfish");
            itemInfoEmbed.setThumbnail(
              `"https://i.ibb.co/523Fg9D/alien-anglerfish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "ninjaStarfish") {
            itemInfoEmbed.setDescription(`
            The ninja starfish, swift and stealthy, navigates the ocean floor with the precision of a ninja, using its multiple arms like throwing stars to gracefully move through the underwater shadows.`);
            itemInfoEmbed.setTitle(`Ninja starfish`);
            itemInfoEmbed.addField(`Buy cost`, `80,500`);
            itemInfoEmbed.addField(`Sell cost`, `80,500`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${ninjaStarfish}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${ninjaStarfishStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "ninjaStarfish");
            itemInfoEmbed.setThumbnail(
              `https://i.ibb.co/D4MDvPQ/ninja-starfish.png`
            );
            message.channel.send(itemInfoEmbed);
          } else if (item == "boot") {
            itemInfoEmbed.setDescription(`
            The boot, discarded and submerged, rests on the ocean floor, transformed into an unexpected habitat for marine life, showcasing nature's ability to adapt and repurpose even the most unlikely objects.`);
            itemInfoEmbed.setTitle(`Boot`);
            itemInfoEmbed.addField(`Buy cost`, `12,072`);
            itemInfoEmbed.addField(`Sell cost`, `12,072`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${boot}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${bootStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "boot");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/fMpKnHz/boot.png`);
            message.channel.send(itemInfoEmbed);
          } else if (item == "bottle") {
            itemInfoEmbed.setDescription(`
            The bottle, drifting through the currents, carries the stories of distant shores and oceanic adventures, becoming a symbol of both human impact and the interconnectedness of the world's waters.`);
            itemInfoEmbed.setTitle(`Bottle`);
            itemInfoEmbed.addField(`Buy cost`, `2,321`);
            itemInfoEmbed.addField(`Sell cost`, `2,321`);
            itemInfoEmbed.addField(`Rarity`, `Common`);
            itemInfoEmbed.addField(`Type`, `Sellable`);
            itemInfoEmbed.addField(`Pieces owned by you`, `${bottle}`);
            itemInfoEmbed.addField(
              `Pieces available for sale`,
              `${bottleStoreAdd}`
            );
            itemInfoEmbed.addField(`ID`, "bottle");
            itemInfoEmbed.setThumbnail(`https://i.ibb.co/YDL6q3j/bottle.png`);
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
