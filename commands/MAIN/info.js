const Discord = require("discord.js");
const db = require("quick.db");
const prices = require("../../prices.json");
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "info",
  aliases: ["Info"],
  description: "To check info",
  usage: "info",
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
      db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
      var bossesKilledTotal = db.fetch(`bossesKilledTotal_${tokenDB}`);
      if (bossesKilledTotal == null || bossesKilledTotal == undefined || NaN) {
        bossesKilledTotal = 0;
      }
      var achievementPoints = db.fetch(`achievementPoints_${tokenDB}`);
      if (achievementPoints == null || achievementPoints == undefined || NaN) {
        achievementPoints = 0;
      }
      var soldiers = db.fetch(`soldiers_${tokenDB}`);
      if (soldiers == null || soldiers == undefined || NaN) {
        soldiers = 0;
      }
      var battlesWon = db.fetch(`battlesWon_${tokenDB}`);
      if (battlesWon == null || battlesWon == undefined || NaN) {
        battlesWon = 0;
      }
      var battlesLost = db.fetch(`battlesLost_${tokenDB}`);
      if (battlesLost == null || battlesLost == undefined || NaN) {
        battlesLost = 0;
      }
      var warPoints = db.fetch(`warPoints_${tokenDB}`);
      if (warPoints == null || warPoints == undefined || NaN) {
        warPoints = 0;
      }
      var goldBar = db.fetch(`goldBar_${tokenDB}`);
      if (goldBar == null || goldBar == undefined || NaN) {
        goldBar = 0;
      }
      var texarus = db.fetch(`texarus_${tokenDB}`);
      if (texarus == null || texarus == undefined || NaN) {
        texarus = 0;
      }
      var waetra = db.fetch(`waetra_${tokenDB}`);
      if (waetra == null || waetra == undefined || NaN) {
        waetra = 0;
      }
      var rasheta = db.fetch(`rasheta_${tokenDB}`);
      if (rasheta == null || rasheta == undefined || NaN) {
        rasheta = 0;
      }
      var natureDaggers = db.fetch(`natureDaggers_${tokenDB}`);
      if (natureDaggers == null || natureDaggers == undefined || NaN) {
        natureDaggers = 0;
      }
      var immortalGun = db.fetch(`immortalGun_${tokenDB}`);
      if (immortalGun == null || immortalGun == undefined || NaN) {
        immortalGun = 0;
      }
      var daggerOfDeath = db.fetch(`daggerOfDeath_${tokenDB}`);
      if (daggerOfDeath == null || daggerOfDeath == undefined || NaN) {
        daggerOfDeath = 0;
      }
      var awakeningGem = db.fetch(`awakeningGem_${tokenDB}`);
      if (awakeningGem == null || awakeningGem == undefined || NaN) {
        awakeningGem = 0;
      }
      var eliteAwakeningGem = db.fetch(`eliteAwakeningGem_${tokenDB}`);
      if (eliteAwakeningGem == null || eliteAwakeningGem == undefined || NaN) {
        eliteAwakeningGem = 0;
      }
      var vortexOrb = db.fetch(`vortexOrb_${tokenDB}`);
      if (vortexOrb == null || vortexOrb == undefined || NaN) {
        vortexOrb = 0;
      }
      var verdantLeaf = db.fetch(`verdantLeaf_${tokenDB}`);
      if (verdantLeaf == null || verdantLeaf == undefined || NaN) {
        verdantLeaf = 0;
      }
      var celestialMoonstone = db.fetch(`celestialMoonstone_${tokenDB}`);
      if (
        celestialMoonstone == null ||
        celestialMoonstone == undefined ||
        NaN
      ) {
        celestialMoonstone = 0;
      }
      var crystallineCorestone = db.fetch(`crystallineCorestone_${tokenDB}`);
      if (
        crystallineCorestone == null ||
        crystallineCorestone == undefined ||
        NaN
      ) {
        crystallineCorestone = 0;
      }
      var tomeOfEverlastingWisdom = db.fetch(
        `tomeOfEverlastingWisdom_${tokenDB}`
      );
      if (
        tomeOfEverlastingWisdom == null ||
        tomeOfEverlastingWisdom == undefined ||
        tomeOfEverlastingWisdom == NaN
      ) {
        tomeOfEverlastingWisdom = 0;
      }
      var goldenGhostKnightSet = db.fetch(`goldenGhostKnightSet_${tokenDB}`);
      if (
        goldenGhostKnightSet == null ||
        goldenGhostKnightSet == undefined ||
        goldenGhostKnightSet === NaN
      ) {
        goldenGhostKnightSet = 0;
      }
      var supremeMagicalSet = db.fetch(`supremeMagicalSet_${tokenDB}`);
      if (
        supremeMagicalSet == null ||
        supremeMagicalSet == undefined ||
        supremeMagicalSet === NaN
      ) {
        supremeMagicalSet = 0;
      }
      var frozenSet = db.fetch(`frozenSet_${tokenDB}`);
      if (frozenSet == null || frozenSet == undefined || frozenSet === NaN) {
        frozenSet = 0;
      }
      var superGolemSet = db.fetch(`superGolemSet_${tokenDB}`);
      if (
        superGolemSet == null ||
        superGolemSet == undefined ||
        superGolemSet === NaN
      ) {
        superGolemSet = 0;
      }
      var arcaneSenseiSet = db.fetch(`arcaneSenseiSet_${tokenDB}`);
      if (
        arcaneSenseiSet == null ||
        arcaneSenseiSet == undefined ||
        arcaneSenseiSet === NaN
      ) {
        arcaneSenseiSet = 0;
      }
      var dawnfireSet = db.fetch(`dawnfireSet_${tokenDB}`);
      if (
        dawnfireSet == null ||
        dawnfireSet == undefined ||
        dawnfireSet === NaN
      ) {
        dawnfireSet = 0;
      }
      var intrepidSet = db.fetch(`intrepidSet_${tokenDB}`);
      if (
        intrepidSet == null ||
        intrepidSet == undefined ||
        intrepidSet === NaN
      ) {
        intrepidSet = 0;
      }
      var medusaSet = db.fetch(`medusaSet_${tokenDB}`);
      if (medusaSet == null || medusaSet == undefined || medusaSet === NaN) {
        medusaSet = 0;
      }
      var rustyGears = db.fetch(`rustyGears_${tokenDB}`);
      if (rustyGears == null || rustyGears == undefined || rustyGears === NaN) {
        rustyGears = 0;
      }
      var dustbin = db.fetch(`dustbin_${tokenDB}`);
      if (dustbin == null || dustbin == undefined || dustbin === NaN) {
        dustbin = 0;
      }
      var newspaper = db.fetch(`newspaper_${tokenDB}`);
      if (newspaper == null || newspaper == undefined || newspaper === NaN) {
        newspaper = 0;
      }
      var tornCloth = db.fetch(`tornCloth_${tokenDB}`);
      if (tornCloth == null || tornCloth == undefined || tornCloth === NaN) {
        tornCloth = 0;
      }
      var usedTissue = db.fetch(`usedTissue_${tokenDB}`);
      if (usedTissue == null || usedTissue == undefined || usedTissue === NaN) {
        usedTissue = 0;
      }
      var valoriumsTear = db.fetch(`valoriumsTear_${tokenDB}`);
      if (
        valoriumsTear == null ||
        valoriumsTear == undefined ||
        valoriumsTear === NaN
      ) {
        valoriumsTear = 0;
      }
      var valoriumsEclipsianSoul = db.fetch(
        `valoriumsEclipsianSoul_${tokenDB}`
      );
      if (
        valoriumsEclipsianSoul == null ||
        valoriumsEclipsianSoul == undefined ||
        valoriumsEclipsianSoul === NaN
      ) {
        valoriumsEclipsianSoul = 0;
      }
      var abyssalCrownOfDominance = db.fetch(
        `abyssalCrownOfDominance_${tokenDB}`
      );
      if (
        abyssalCrownOfDominance == null ||
        abyssalCrownOfDominance == undefined ||
        abyssalCrownOfDominance === NaN
      ) {
        abyssalCrownOfDominance = 0;
      }
      var abyssalStarcrystal = db.fetch(`abyssalStarcrystal_${tokenDB}`);
      if (
        abyssalStarcrystal == null ||
        abyssalStarcrystal == undefined ||
        abyssalStarcrystal === NaN
      ) {
        abyssalStarcrystal = 0;
      }
      var EldrazursGrimoireOfRuin = db.fetch(
        `EldrazursGrimoireOfRuin_${tokenDB}`
      );
      if (
        EldrazursGrimoireOfRuin == null ||
        EldrazursGrimoireOfRuin == undefined ||
        EldrazursGrimoireOfRuin === NaN
      ) {
        EldrazursGrimoireOfRuin = 0;
      }
      var abyssalScepterOfOblivion = db.fetch(
        `abyssalScepterOfOblivion_${tokenDB}`
      );
      if (
        abyssalScepterOfOblivion == null ||
        abyssalScepterOfOblivion == undefined ||
        abyssalScepterOfOblivion === NaN
      ) {
        abyssalScepterOfOblivion = 0;
      }
      var brokenStick = db.fetch(`brokenStick_${tokenDB}`);
      if (
        brokenStick == null ||
        brokenStick == undefined ||
        brokenStick === NaN
      ) {
        brokenStick = 0;
      }
      var bullet = db.fetch(`bullet_${tokenDB}`);
      if (bullet == null || bullet == undefined || bullet === NaN) {
        bullet = 0;
      }
      var mysticRuneOfResilience = db.fetch(
        `mysticRuneOfResilience_${tokenDB}`
      );
      if (
        mysticRuneOfResilience == null ||
        mysticRuneOfResilience == undefined ||
        mysticRuneOfResilience === NaN
      ) {
        mysticRuneOfResilience = 0;
      }
      var auroraGaze = db.fetch(`auroraGaze_${tokenDB}`);
      if (auroraGaze == null || auroraGaze == undefined || auroraGaze === NaN) {
        auroraGaze = 0;
      }
      var orbOfElementalMastery = db.fetch(`orbOfElementalMastery_${tokenDB}`);
      if (
        orbOfElementalMastery == null ||
        orbOfElementalMastery == undefined ||
        orbOfElementalMastery === NaN
      ) {
        orbOfElementalMastery = 0;
      }
      var shieldOfTheEarthshaker = db.fetch(
        `shieldOfTheEarthshaker_${tokenDB}`
      );
      if (
        shieldOfTheEarthshaker == null ||
        shieldOfTheEarthshaker == undefined ||
        shieldOfTheEarthshaker === NaN
      ) {
        shieldOfTheEarthshaker = 0;
      }
      var timekeepersChronometer = db.fetch(
        `timekeepersChronometer_${tokenDB}`
      );
      if (
        timekeepersChronometer == null ||
        timekeepersChronometer == undefined ||
        timekeepersChronometer === NaN
      ) {
        timekeepersChronometer = 0;
      }
      var eldritchFlameScroll = db.fetch(`eldritchFlameScroll_${tokenDB}`) || 0;
      var moonsShineOfMetalSword =
        db.fetch(`moonsShineOfMetalSword_${tokenDB}`) || 0;
      var infernothsWrathfulEye =
        db.fetch(`infernothsWrathfulEye_${tokenDB}`) || 0;
      var pyroclasmicGem = db.fetch(`pyroclasmicGem_${tokenDB}`) || 0;
      var pyroclasmicEssence = db.fetch(`pyroclasmicEssence_${tokenDB}`) || 0;
      var magmaticTorch = db.fetch(`magmaticTorch_${tokenDB}`) || 0;
      var eternalFlameEssence = db.fetch(`eternalFlameEssence_${tokenDB}`) || 0;
      var blackOil = db.fetch(`blackOil_${tokenDB}`) || 0;
      var hotWater = db.fetch(`hotWater_${tokenDB}`) || 0;
      var transparentGlass = db.fetch(`transparentGlass_${tokenDB}`) || 0;

      var power = db.fetch(`power.${tokenDB}`);
      if (power == null || power == undefined || power === NaN) {
        power = 0;
      }
      var title = db.fetch(`title_${tokenDB}`);
      if (title == null || title == undefined || title === NaN) {
        title = "None";
      }
      var balance = db.fetch(`money_${tokenDB}.pocket`);
      if (balance == null || balance == undefined || balance === NaN) {
        balance = 0;
      }
      // if (mysticRuneOfResilience > 0) {
      //   var power = power * 2;
      //   db.set(`power.${tokenDB}`, [power]);
      // }
      var netWorth =
        goldBar * prices.goldBar +
        texarus * prices.texarus +
        waetra * prices.waetra +
        rasheta * prices.rasheta +
        natureDaggers * prices.natureDaggers +
        immortalGun * prices.immortalGun +
        awakeningGem * prices.awakeningGem +
        eliteAwakeningGem * prices.eliteAwakeningGem +
        vortexOrb * prices.vortexOrb +
        verdantLeaf * prices.verdantLeaf +
        celestialMoonstone * prices.celestialMoonstone +
        crystallineCorestone * prices.crystallineCorestone +
        tomeOfEverlastingWisdom * prices.tomeOfEverlastingWisdom +
        goldenGhostKnightSet * prices.goldenGhostKnightSet +
        supremeMagicalSet * prices.supremeMagicalSet +
        frozenSet * prices.frozenSet +
        superGolemSet * prices.superGolemSet +
        arcaneSenseiSet * prices.arcaneSenseiSet +
        dawnfireSet * prices.dawnfireSet +
        intrepidSet * prices.intrepidSet +
        medusaSet * prices.medusaSet +
        rustyGears * prices.rustyGears +
        dustbin * prices.dustbin +
        newspaper * prices.newspaper +
        tornCloth * prices.tornCloth +
        usedTissue * prices.usedTissue +
        brokenStick * prices.brokenStick +
        bullet * prices.bullet +
        valoriumsTear * prices.valoriumsTear +
        valoriumsEclipsianSoul * prices.valoriumsEclipsianSoul +
        daggerOfDeath * prices.daggerOfDeath +
        abyssalCrownOfDominance * prices.abyssalCrownOfDominance +
        abyssalStarcrystal * prices.abyssalStarcrystal +
        EldrazursGrimoireOfRuin * prices.EldrazursGrimoireOfRuin +
        abyssalScepterOfOblivion * prices.AbyssalScepterOfOblivion +
        mysticRuneOfResilience * prices.mysticRuneOfResilience +
        auroraGaze * prices.auroraGaze +
        orbOfElementalMastery * prices.orbOfElementalMastery +
        shieldOfTheEarthshaker * prices.shieldOfTheEarthshaker +
        timekeepersChronometer * prices.timekeepersChronometer +
        moonsShineOfMetalSword * prices.moonsShineOfMetalSword +
        eldritchFlameScroll * prices.eldritchFlamescroll +
        infernothsWrathfulEye * prices.infernothsWrathfulEye +
        pyroclasmicGem * prices.pyroclasmicGem +
        pyroclasmicEssence * prices.pyroclasmicEssence +
        magmaticTorch * prices.magmaticTorch +
        eternalFlameEssence * prices.eternalFlameEssence +
        blackOil * prices.blackOil +
        hotWater * prices.hotWater +
        transparentGlass * prices.transparentGlass +
        balance;
      netWorth = netWorth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      db.set(`netWorth_${tokenDB}`, netWorth);
      db.set(`username_${tokenDB}`, { name: user.username });
      const tokenCreationDate = db.fetch(`${user.id}.tokenCreationDate`);
      const currentDate = new Date();
      const creationDateParts = tokenCreationDate.split(".");
      const creationDate = new Date(
        parseInt(creationDateParts[2]),
        parseInt(creationDateParts[1]) - 1,
        parseInt(creationDateParts[0])
      );

      const timeDifference = currentDate.getTime() - creationDate.getTime();
      var daysPlayed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      var monthsPlayed = Math.floor(daysPlayed / 30);
      daysPlayed = db.set(`daysPlayed_${tokenDB}`, daysPlayed);
      monthsPlayed = db.set(`monthsPlayed_${tokenDB}`, monthsPlayed);

      db.set(`power.${tokenDB}`, power);
      if (!tokenCreationDate) {
        message.channel.send("ERROR");
        db.add(`uselessUsageOfCommand_${tokenDB}`, 1);
      }
      const infoPairs = [
        { name: "User ID", value: user.id },
        { name: "User Tag", value: user.tag },
        { name: "Is Banned", value: banned ? "Yes" : "No" },
        { name: "Title", value: `${title}` },
        { name: "User Status", value: user.presence.status },
        { name: "Bosses Killed", value: bossesKilledTotal },
        { name: "Achievement Points (APS)", value: achievementPoints },
        { name: "Soldiers under Command", value: soldiers },
        { name: "Military power", value: power },
        { name: "Battles Won", value: battlesWon },
        { name: "Battles Lost", value: battlesLost },
        { name: "War Points", value: warPoints },
        {
          name: "Played Duration",
          value: `${monthsPlayed} months ${daysPlayed % 30} days`,
        },
      ];
      if (auroraGaze > 0) {
        thumbnailLink = "https://i.ibb.co/DMkpbNv/blue-gaze.gif";
      } else {
        thumbnailLink = "";
      }
      // Create an embed
      const embed = new Discord.MessageEmbed()
        .setColor("#6B4226")
        .setTitle(`${user.username}'s Info`)
        .setThumbnail(thumbnailLink);
      if (auroraGaze > 0) {
        // Modify the color of the embed after 5 seconds
        embed.setFooter(`👀`);
      }
      if (abyssalCrownOfDominance > 0) {
        embed.setTitle(
          `<a:abyssalCrownOfDominience:1149551849192575048> ${user.username}'s Info`
        );
      }
      // Add information pairs to the embed in groups of 2
      for (let i = 0; i < infoPairs.length; i += 2) {
        const pair1 = infoPairs[i];
        const pair2 = infoPairs[i + 1];

        // Add each pair to the embed
        embed.addField(pair1.name, pair1.value, true);

        // If there's a second pair, add it as well
        if (pair2) {
          embed.addField(pair2.name, pair2.value, true);
        }
      }

      // Send the embed
      message.channel.send(embed);
    }
  },
};
