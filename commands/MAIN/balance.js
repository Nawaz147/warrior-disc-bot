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
    db.set(`enshrinedAsAMysterionixLegend_${tokenDB}`, true);
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      var balancePrivate = db.fetch(`balancePrivate_${tokenDB}`) || false;
      if (balancePrivate == true && message.mentions.users.first()) {
        const balancePrivateEmbed = new Discord.MessageEmbed()
          .setDescription(`${user.username}'s balance is private!`)
          .setColor(`#2B2D31`);
        message.channel.send(balancePrivateEmbed);
        return;
      }
      let bal = await db.fetch(`money_${tokenDB}.pocket`);
      let ruix = await db.fetch(`ruix_${tokenDB}`);
      let keys = await db.fetch(`key_${tokenDB}`);
      let hallowcharmToken =
        (await db.fetch(`hallowcharmToken_${tokenDB}`)) || 0;
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
      var texarus = db.fetch(`texarus_${tokenDB}`) || 0;
      var waetra = db.fetch(`waetra_${tokenDB}`) || 0;
      var rasheta = db.fetch(`rasheta_${tokenDB}`) || 0;
      var natureDaggers = db.fetch(`natureDaggers_${tokenDB}`) || 0;
      var immortalGun = db.fetch(`immortalGun_${tokenDB}`) || 0;
      var daggerOfDeath = db.fetch(`daggerOfDeath_${tokenDB}`) || 0;
      var awakeningGem = db.fetch(`awakeningGem_${tokenDB}`) || 0;
      var eliteAwakeningGem = db.fetch(`eliteAwakeningGem_${tokenDB}`) || 0;
      var vortexOrb = db.fetch(`vortexOrb_${tokenDB}`) || 0;
      var verdantLeaf = db.fetch(`verdantLeaf_${tokenDB}`) || 0;
      var celestialMoonstone = db.fetch(`celestialMoonstone_${tokenDB}`) || 0;
      var crystallineCorestone =
        db.fetch(`crystallineCorestone_${tokenDB}`) || 0;
      var tomeOfEverlastingWisdom =
        db.fetch(`tomeOfEverlastingWisdom_${tokenDB}`) || 0;
      var goldenGhostKnightSet =
        db.fetch(`goldenGhostKnightSet_${tokenDB}`) || 0;
      var supremeMagicalSet = db.fetch(`supremeMagicalSet_${tokenDB}`);
      var frozenSet = db.fetch(`frozenSet_${tokenDB}`);
      var superGolemSet = db.fetch(`superGolemSet_${tokenDB}`) || 0;
      var arcaneSenseiSet = db.fetch(`arcaneSenseiSet_${tokenDB}`);
      var dawnfireSet = db.fetch(`dawnfireSet_${tokenDB}`);
      var intrepidSet = db.fetch(`intrepidSet_${tokenDB}`);
      var medusaSet = db.fetch(`medusaSet_${tokenDB}`);
      var rustyGears = db.fetch(`rustyGears_${tokenDB}`) || 0;
      var dustbin = db.fetch(`dustbin_${tokenDB}`) || 0;
      var newspaper = db.fetch(`newspaper_${tokenDB}`) || 0;
      var tornCloth = db.fetch(`tornCloth_${tokenDB}`) || 0;
      var usedTissue = db.fetch(`usedTissue_${tokenDB}`) || 0;
      var valoriumsTear = db.fetch(`valoriumsTear_${tokenDB}`) || 0;
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
      var brokenStick = db.fetch(`brokenStick_${tokenDB}`) || 0;
      var bullet = db.fetch(`bullet_${tokenDB}`) || 0;
      var EldrazursGrimoireOfRuin =
        db.fetch(`EldrazursGrimoireOfRuin_${tokenDB}`) || 0;
      var abyssalScepterOfOblivion = db.fetch(
        `abyssalScepterOfOblivion_${tokenDB}`
      );
      var mysticRuneOfResilience =
        db.fetch(`mysticRuneOfResilience_${tokenDB}`) || 0;
      var auroraGaze = db.fetch(`auroraGaze_${tokenDB}`) || 0;
      var orbOfElementalMastery =
        db.fetch(`orbOfElementalMastery_${tokenDB}`) || 0;
      var shieldOfTheEarthshaker =
        db.fetch(`shieldOfTheEarthshaker_${tokenDB}`) || 0;
      var timekeepersChronometer =
        db.fetch(`timekeepersChronometer_${tokenDB}`) || 0;
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
      var sarcasticFringehead = db.fetch(`sarcasticFringehead_${tokenDB}`) || 0;
      var salmon = db.fetch(`salmon_${tokenDB}`) || 0;
      var smellyFish = db.fetch(`smellyFish_${tokenDB}`) || 0;
      var burnedFish = db.fetch(`burnedFish_${tokenDB}`) || 0;
      var grumpyCatfish = db.fetch(`grumpyCatfish_${tokenDB}`) || 0;
      var pancakeFish = db.fetch(`pancakeFish_${tokenDB}`) || 0;
      var discoJellyfish = db.fetch(`discoJellyfish_${tokenDB}`) || 0;
      var sodaCanfish = db.fetch(`sodaCanfish_${tokenDB}`) || 0;
      var lavaLampEel = db.fetch(`lavaLampEel_${tokenDB}`) || 0;
      var rubberDuckyfish = db.fetch(`rubberDuckyfish_${tokenDB}`) || 0;
      var pirateParrotfish = db.fetch(`pirateParrotfish_${tokenDB}`) || 0;
      var toiletSeatLid = db.fetch(`toiletSeatLid_${tokenDB}`) || 0;
      var alienAnglerfish = db.fetch(`alienAnglerfish_${tokenDB}`) || 0;
      var ninjaStarfish = db.fetch(`ninjaStarfish_${tokenDB}`) || 0;
      var boot = db.fetch(`boot_${tokenDB}`) || 0;
      var bottle = db.fetch(`bottle_${tokenDB}`) || 0;
      var fishingRod = db.fetch(`fishingRod_${tokenDB}`) || 0;
      var luminaFin = db.fetch(`luminaFin_${tokenDB}`) || 0;
      var bubblegumBlowfish = db.fetch(`bubblegumBlowfish_${tokenDB}`) || 0;
      var disguisedDiverfish = db.fetch(`disguisedDiverfish_${tokenDB}`) || 0;
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
        transparentGlass * prices.transparentGlass +
        sarcasticFringehead * prices.sarcasticFringehead +
        salmon * prices.salmon +
        smellyFish * prices.smellyFish +
        burnedFish * prices.burnedFish +
        grumpyCatfish * prices.grumpyCatfish +
        pancakeFish * prices.pancakeFish +
        discoJellyfish * prices.discoJellyfish +
        sodaCanfish * prices.sodaCanfish +
        lavaLampEel * prices.lavaLampEel +
        rubberDuckyfish * prices.rubberDuckyfish +
        alienAnglerfish * prices.alienAnglerfish +
        ninjaStarfish * prices.ninjaStarfish +
        pirateParrotfish * prices.pirateParrotfish +
        toiletSeatLid * prices.toiletSeatLid +
        boot * prices.boot +
        fishingRod * prices.fishingRod +
        luminaFin * prices.luminaFin +
        disguisedDiverfish * prices.disguisedDiverfish +
        bubblegumBlowfish * prices.bubblegumBlowfish +
        bottle * prices.bottle;

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
        sarcasticFringehead * prices.sarcasticFringehead +
        salmon * prices.salmon +
        smellyFish * prices.smellyFish +
        burnedFish * prices.burnedFish +
        grumpyCatfish * prices.grumpyCatfish +
        pancakeFish * prices.pancakeFish +
        discoJellyfish * prices.discoJellyfish +
        sodaCanfish * prices.sodaCanfish +
        lavaLampEel * prices.lavaLampEel +
        rubberDuckyfish * prices.rubberDuckyfish +
        alienAnglerfish * prices.alienAnglerfish +
        ninjaStarfish * prices.ninjaStarfish +
        pirateParrotfish * prices.pirateParrotfish +
        toiletSeatLid * prices.toiletSeatLid +
        boot * prices.boot +
        fishingRod * prices.fishingRod +
        luminaFin * prices.luminaFin +
        disguisedDiverfish * prices.disguisedDiverfish +
        bubblegumBlowfish * prices.bubblegumBlowfish +
        bottle * prices.bottle +
        bal;
      const netWorthInvPercentage = (
        (netWorthInv / netWorthTotal) *
        100
      ).toFixed(2);
      const netWorthBalPercentage =
        ((bal / netWorthTotal) * 100).toFixed(2) || 0;
      netWorthInv = netWorthInv
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      netWorthTotal = netWorthTotal
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      bal = bal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      hallowcharmToken = hallowcharmToken
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var mysterionixProActivated =
        db.fetch(`mysterionixProActivated_${tokenDB}`) || false;
      if (mysterionixProActivated == true) {
        var channel = message.guild;
        const displayName = user.username;

        const nameFontSize = Math.min(35, 400 / displayName.length);

        let canvas = Canvas.createCanvas(400, 200);
        let ctx = canvas.getContext("2d");
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha = 0.5;
        const background = await Canvas.loadImage(
          "https://i.ibb.co/NnD4KZk/517194.jpg"
        );

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;

        ctx.font = `${nameFontSize}px Impact`;
        ctx.fillStyle = "#99DF26";
        ctx.textAlign = "center";
        ctx.fillText(`${displayName}'s Balance`, canvas.width / 2, 40);

        ctx.font = "23px Kelpt A1";
        ctx.fillStyle = "#E1B530";

        const textYPositions = {
          goldCoins: 85,
          ruix: 125,
          keys: 160,
        };

        ctx.fillStyle = "#E1B530";
        ctx.fillText(`Gold coins :`, 55, textYPositions.goldCoins);
        ctx.fillStyle = "#00FF00";
        ctx.fillText(`Ruix :`, 34, textYPositions.ruix);
        ctx.fillStyle = "#00E1DF";
        ctx.fillText(`Keys :`, 34, textYPositions.keys);

        ctx.fillStyle = "#E1B530";
        ctx.fillText(bal, 150, textYPositions.goldCoins);
        ctx.fillStyle = "#00FF00";
        ctx.fillText(ruix, 150, textYPositions.ruix);
        ctx.fillStyle = "#00E1DF";
        ctx.fillText(keys, 150, textYPositions.keys);

        ctx.fillStyle = "#ffffff";
        ctx.font = "16px Montserrat";

        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let fullDate = `${day}.${month}.${year}.`;

        ctx.fillText(`Date: ${fullDate}`, canvas.width / 1.2, 190);

        const balanceMessage = new Discord.MessageEmbed()
          .setTitle(`Requested by ${message.author.username}`)
          .setColor("#00FF00")
          .attachFiles([{ attachment: canvas.toBuffer(), name: "balance.png" }])
          .setImage("attachment://balance.png")
          .addField(
            `Inventory net`,
            `<:goldCoin:1156621221761388676> ${netWorthInv} (${netWorthInvPercentage}%)`,
            true
          )
          .addField(
            `Total net`,
            `<:goldCoin:1156621221761388676> ${netWorthTotal}`,
            true
          )
          .setTimestamp();

        message.channel.send(balanceMessage);
      } else {
        const balanceEmbed = new Discord.MessageEmbed()
          .setTitle(`${user.username}'s balance`)
          .addField(
            `Gold coins`,
            `<:goldCoin:1156621221761388676> ${bal} (${netWorthBalPercentage}%)`,
            true
          )
          .addField(`Ruix`, `<a:ruix:1153892039742726246> ${ruix}`, true)
          .addField(
            `Hallowcharm token`,
            `<a:hallowcharmToken:1164785382517395547> ${hallowcharmToken}`,
            true
          )
          .addField(`Keys`, `<:key:1157324619318050906> ${keys}`, true)
          .addField(
            `Inventory net`,
            `<:goldCoin:1156621221761388676> ${netWorthInv} (${netWorthInvPercentage}%)`,
            true
          )
          .addField(
            `Total net`,
            `<:goldCoin:1156621221761388676> ${netWorthTotal}`,
            true
          )
          .setFooter(
            `The percentage shown is the percentage of total net worth`
          )
          .setTimestamp();
        balanceEmbed.setColor(`#2B2D31`);
        message.channel.send(balanceEmbed);
      }

      // Cache the balance data for this user for a limited time (e.g., 5 minutes)
    }
  },
};
