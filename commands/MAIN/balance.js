const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const config = require("../../config.json");
const startFunction = require("../../startCommandFunction.js");
const prices = require("../../prices.json");

// Create a Map to cache user balances

module.exports = {
  name: "balance",
  aliases: ["bal", "balanc"],
  description: "To see balance",
  usage: "balance",
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
      let bal = await db.fetch(`money_${tokenDB}.pocket`);
      let ruix = await db.fetch(`ruix_${tokenDB}`);
      let keys = await db.fetch(`key_${tokenDB}`);
      if (bal === null) bal = "0";
      if (bal === undefined) bal = "0";
      if (ruix === null) ruix = "0";
      if (ruix === undefined) ruix = "0";
      ruix = ruix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (keys === null) keys = "0";
      if (keys === undefined) keys = "0";
      keys = keys.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

      var netWorthInv =
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
        transparentGlass * prices.transparentGlass;
      netWorthInv = netWorthInv
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      var netWorthTotal =
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
        bal;
      netWorthTotal = netWorthTotal
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      bal = bal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      const balanceEmbed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s balance`)
        .addField(`Gold coins`, `<:goldCoin:1156621221761388676> ${bal}`, true)
        .addField(`Ruix`, `<a:ruix:1153892039742726246> ${ruix}`, true)
        .addField(`Keys`, `${keys}`, true)
        .addField(
          `Inventory net`,
          `<:goldCoin:1156621221761388676> ${netWorthInv}`,
          true
        )
        .addField(
          `Total net`,
          `<:goldCoin:1156621221761388676> ${netWorthTotal}`,
          true
        )
        .setTimestamp();
      if (netWorthTotal >= 100000000) {
        balanceEmbed.setFooter(`😎`);
      }
      balanceEmbed.setColor(`#2B2D31`);
      message.channel.send(balanceEmbed);
      // var channel = message.guild;
      // const displayName = user.username;

      // const nameFontSize = Math.min(35, 400 / displayName.length);

      // let canvas = Canvas.createCanvas(400, 200);
      // let ctx = canvas.getContext("2d");
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ctx.globalAlpha = 0.5;
      // const background = await Canvas.loadImage(
      //   "https://i.ibb.co/NnD4KZk/517194.jpg"
      // );

      // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      // ctx.globalAlpha = 1;

      // ctx.font = `${nameFontSize}px Impact`;
      // ctx.fillStyle = "#99DF26";
      // ctx.textAlign = "center";
      // ctx.fillText(`${displayName}'s Balance`, canvas.width / 2, 40);

      // ctx.font = "23px Kelpt A1";
      // ctx.fillStyle = "#E1B530";

      // const textYPositions = {
      //   goldCoins: 85,
      //   ruix: 125,
      //   keys: 160,
      // };

      // ctx.fillStyle = "#E1B530";
      // ctx.fillText(`Gold coins :`, 55, textYPositions.goldCoins);
      // ctx.fillStyle = "#00FF00";
      // ctx.fillText(`Ruix :`, 34, textYPositions.ruix);
      // ctx.fillStyle = "#00E1DF";
      // ctx.fillText(`Keys :`, 34, textYPositions.keys);

      // ctx.fillStyle = "#E1B530";
      // ctx.fillText(bal, 150, textYPositions.goldCoins);
      // ctx.fillStyle = "#00FF00";
      // ctx.fillText(ruix, 150, textYPositions.ruix);
      // ctx.fillStyle = "#00E1DF";
      // ctx.fillText(keys, 150, textYPositions.keys);

      // ctx.fillStyle = "#ffffff";
      // ctx.font = "16px Montserrat";

      // let date = new Date();
      // let day = date.getDate();
      // let month = date.getMonth() + 1;
      // let year = date.getFullYear();
      // let fullDate = `${day}.${month}.${year}.`;

      // ctx.fillText(`Date: ${fullDate}`, canvas.width / 1.2, 190);

      // const balanceMessage = new Discord.MessageEmbed()
      //   .setTitle(`Requested by ${message.author.username}`)
      //   .setColor("#00FF00")
      //   .attachFiles([{ attachment: canvas.toBuffer(), name: "balance.png" }])
      //   .setImage("attachment://balance.png");

      // Cache the balance data for this user for a limited time (e.g., 5 minutes)
    }
  },
};
