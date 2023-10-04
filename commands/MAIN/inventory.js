const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "inventory",
  aliases: ["Inventory", "Inv", "inv"],
  description: "To check inventory",
  usage: "inventory",
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
    // db.set(`moonsShineOfMetalSword_${tokenDB}`, 0);
    if (startFunction) {
      startFunction(message, args, client);
    }
    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      const channel = message.channel; // Replace with the channel you want to check
      const botPermissions = channel.permissionsFor(client.user);
      if (
        botPermissions.has("ADD_REACTIONS") &&
        botPermissions.has("READ_MESSAGE_HISTORY") &&
        botPermissions.has("MANAGE_MESSAGES")
      ) {
        db.add(`usefulUsageOfCommand_${tokenDB}`, 1);
        if (!args[0] || args[0].toLowerCase() !== "craft") {
          const items = {
            "<a:mysterionixPro:1159100552299429908> Mysterionix pro":
              db.fetch(`mysterionixPro_${tokenDB}`) || 0,
            "<a:moonsShineOfMetalSword:1154071077954269245> Moon's shine of metal sword":
              db.fetch(`moonsShineOfMetalSword_${tokenDB}`) || 0,
            "<a:mysticRuneOfResilience:1149382045911494738> Mystic rune of resilience":
              db.fetch(`mysticRuneOfResilience_${tokenDB}`) || 0,
            "<a:auroraGaze:1149396676650483914> Aurora gaze":
              db.fetch(`auroraGaze_${tokenDB}`) || 0,
            "<a:abyssalCrownOfDominience:1149551849192575048> Abyssal crown of dominance":
              db.fetch(`abyssalCrownOfDominance_${tokenDB}`) || 0,
            "<a:abyssalScepterOfOblivion:1149541562523603004> Abyssal scepter of oblivion":
              db.fetch(`abyssalScepterOfOblivion_${tokenDB}`) || 0,
            "<:daggerofdeath:1147084241516105728> Dagger of death":
              db.fetch(`daggerOfDeath_${tokenDB}`) || 0,
            "<:immortalgun:1147084130807455814> Immortal gun of energy":
              db.fetch(`immortalGun_${tokenDB}`) || 0,
            "<:naturedaggers:1147084151686701068> Nature daggers of superpower":
              db.fetch(`natureDaggers_${tokenDB}`) || 0,
            "<:eldritchFlameScroll:1154411820283613275> Eldritch flame scroll":
              db.fetch(`eldritchFlameScroll_${tokenDB}`) || 0,
            "<:orbOfElementalMastery:1151189114767540265> Orb of elemental mastery":
              db.fetch(`orbOfElementalMastery_${tokenDB}`) || 0,
            "<:abyssalstarcrystal:1148264853060976720> Abyssal starcrystal":
              db.fetch(`abyssalStarcrystal_${tokenDB}`) || 0,
            "<:eldrazursgrimoireofruin:1148265284478709922> Eldra'zur's grimoire of ruin":
              db.fetch(`eldrazursGrimoireOfRuin_${tokenDB}`) || 0,
            "<:vortexorb:1147066784969666600> Vortex orb":
              db.fetch(`vortexOrb_${tokenDB}`) || 0,
            "<:verdantwhisperleaf:1147068073619226684> Verdant Whisper leaf":
              db.fetch(`verdantLeaf_${tokenDB}`) || 0,
            "<:valoriumsSoul:1147382331422810132> Valorium's Eclipsian soul":
              db.fetch(`valoriumsEclipsianSoul_${tokenDB}`) || 0,
            "<:titlelogo:1148602133445353515> Monarch slayer":
              db.fetch(`monarchSlayerTitle_${tokenDB}`) || 0,
            "<:infernothsWrathfulEye:1154412305128378499> Infernoth's wrathful eye":
              db.fetch(`infernothsWrathfulEye_${tokenDB}`) || 0,
            "<:celestialmoonstone:1147070214987583519> Celestial Moonstone":
              db.fetch(`celestialMoonStone_${tokenDB}`) || 0,
            "<:pyroclasmicGem:1154412690870108261> Pyroclasmic gem":
              db.fetch(`pyroclasmicGem_${tokenDB}`) || 0,
            "<:valoriumsTear:1147381630009364581> Valorium's tear":
              db.fetch(`valoriumsTear_${tokenDB}`) || 0,
            "<:pyroclasmicEssence:1154413077807255612> Pyroclasmic essence":
              db.fetch(`pyroclasmicEssence_${tokenDB}`) || 0,
            "<:magmaticTorch:1154413864386052146> Magmatic torch":
              db.fetch(`magmaticTorch_${tokenDB}`) || 0,
            "<:goldbar:1147101331534921758> Gold Bar":
              db.fetch(`goldBar_${tokenDB}`) || 0,
            "<:crystallinecorestone:1147068766983819275> Crystalline corestone":
              db.fetch(`crystallineCorestone_${tokenDB}`) || 0,
            "<:bullet:1147100873164603472> Bullet":
              db.fetch(`bullet_${tokenDB}`) || 0,
            "<:tomeofeverlastingwisdom:1147073417275773018> Tome of everlasting wisdom":
              db.fetch(`tomeOfEverlastingWisdom_${tokenDB}`) || 0,
            "<:rashetathefuriousaxe:1147085204779962408> Rasheta the furious axe":
              db.fetch(`rasheta_${tokenDB}`) || 0,
            "<a:disguisedDiverfish:1158038321537241098> Disguised diverfish":
              db.fetch(`disguisedDiverfish_${tokenDB}`) || 0,
            "<a:luminaFin:1158034789614497813> Lumina fin":
              db.fetch(`luminaFin_${tokenDB}`) || 0,
            "<:waetrathefreezedbow:1147084610279325706> Waetra the freezed bow":
              db.fetch(`waetra_${tokenDB}`) || 0,
            "<a:bubblegumBlowfish:1158036690364010549> Bubblegum blowfish":
              db.fetch(`bubblegumBlowfish_${tokenDB}`) || 0,
            "<:shieldOfTheEarthshaker:1151190097924980867> Shield of the earthshaker":
              db.fetch(`shieldOfTheEarthshaker${tokenDB}`) || 0,
            "<:timekeepersChronometer:1152603999074263050> Timekeeper's chronometer":
              db.fetch(`timekeepersChronometer_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Arcane sensei set":
              db.fetch(`arcaneSenseiSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Super golem set":
              db.fetch(`superGolemSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Supreme magical set":
              db.fetch(`supremeMagicalSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Golden Ghost Knight Set":
              db.fetch(`goldenGhostKnightSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Medusa set":
              db.fetch(`medusaSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Intrepid set":
              db.fetch(`intrepidSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Frozen set":
              db.fetch(`frozenSet_${tokenDB}`) || 0,
            "<:vanityicon:1147071701633482773> Dawnfire set":
              db.fetch(`dawnfireSet_${tokenDB}`) || 0,
            "<:texarusthedemonishedstaff:1147083583899586661> Texarus the demonished staff":
              db.fetch(`texarus_${tokenDB}`) || 0,
            "<:eternalFlameEssence:1154414454155530371> Eternal flame essence":
              db.fetch(`eternalFlameEssence_${tokenDB}`) || 0,
            "<:fishingRod:1157537595002204260> Fishing rod": db.fetch(
              `fishingRod_${tokenDB}`
            ),
            "<:blackOil:1154415835998322718> Black oil":
              db.fetch(`blackOil_${tokenDB}`) || 0,
            "<:eliteawakeninggem:1147070929957027860> Elite awakening gem":
              db.fetch(`eliteAwakeningGem_${tokenDB}`) || 0,
            "<:unlockedCrateOfEnergy:1147102884585017355> Unlocked crate of energy":
              db.fetch(`unlockedCrateOfEnergy_${tokenDB}`) || 0,
            "<:hotWater:1154416000360525924> Hot water":
              db.fetch(`hotWater_${tokenDB}`) || 0,
            "<:transparentGlass:1154416282133876868> Transparent glass":
              db.fetch(`transparentGlass_${tokenDB}`) || 0,
            "<:awakeninggem:1147071223042424902> Awakening gem":
              db.fetch(`awakeningGem_${tokenDB}`) || 0,
            "<:ventorianbow:1147084109986930688> Ventorian bow of ventor":
              db.fetch(`ventorianBow_${tokenDB}`) || 0,
            "<:sarcasticFringehead:1156929582335799388> Sarcastic fringehead":
              db.fetch(`sarcasticFringehead_${tokenDB}`) || 0,
            "<:salmon:1156929627126771784> Salmon":
              db.fetch(`salmon_${tokenDB}`) || 0,
            "<:smellyFish:1156929529894424666> Smelly fish":
              db.fetch(`smellyFish_${tokenDB}`) || 0,
            "<:burnedfish:1156939483267207220> Burned fish":
              db.fetch(`burnedFish_${tokenDB}`) || 0,
            "<:grumpyCatfish:1156929452056522812> Grumpy catfish":
              db.fetch(`grumpyCatfish_${tokenDB}`) || 0,
            "<:pancakeFish:1156929418170744852> Pancake fish":
              db.fetch(`pancakeFish_${tokenDB}`) || 0,
            "<:discoJellyfish:1156929355465900133> Disco jellyfish":
              db.fetch(`discoJellyfish_${tokenDB}`) || 0,
            "<:sodaCanfish:1156929327817035788> Soda canfish":
              db.fetch(`sodaCanfish_${tokenDB}`) || 0,
            "<:lavaLampEel:1156939953448681472> Lava lamp eel":
              db.fetch(`lavaLampEel_${tokenDB}`) || 0,
            "<:rubberDuckyfish:1156938911004766240> Rubber duckyfish":
              db.fetch(`rubberDuckyfish_${tokenDB}`) || 0,
            "<:ninjaStarfish:1156938871695757432> Ninja starfish":
              db.fetch(`ninjaStarfish_${tokenDB}`) || 0,
            "<:alienAnglerfish:1156938740586000394> Alien anglerfish":
              db.fetch(`alienAnglerFish_${tokenDB}`) || 0,
            "<:pirateParrotfish:1156938717781573733> Pirate parrotfish":
              db.fetch(`pirateParrotfish_${tokenDB}`) || 0,
            "<:toiletSeatLid:1156938695635644506> Toilet seat lid":
              db.fetch(`toiletSeatLid_${tokenDB}`) || 0,
            "<:boot:1156938677176520785> Boot":
              db.fetch(`boot_${tokenDB}`) || 0,
            "<:bottle:1156938658667044934> Bottle":
              db.fetch(`bottle_${tokenDB}`) || 0,
            "<:rustygears:1147072174264426606> Rusty gears":
              db.fetch(`rustyGears_${tokenDB}`) || 0,
            "<:torncloth:1147103370637738035> Torn cloth":
              db.fetch(`tornCloth_${tokenDB}`) || 0,
            "<:brokenstick:1147072664792485949> Broken stick":
              db.fetch(`brokenStick_${tokenDB}`) || 0,
            "<:dustbin:1147071977601908767> Dustbin":
              db.fetch(`dustbin_${tokenDB}`) || 0,
            "<:newspaper:1147073903068463114> Newspaper":
              db.fetch(`newspaper_${tokenDB}`) || 0,
            "<:usedtissue:1147072375305797692> Used tissue":
              db.fetch(`usedTissue_${tokenDB}`) || 0,
            "<:cotton:1147116559526015088> Cotton":
              db.fetch(`cotton_${tokenDB}`) || 0, // Common material
            "<:supergem:1147106342427955300> Super gem":
              db.fetch(`superGem_${tokenDB}`) || 0, // Mythic material
            "<:leather:1147104055701798933> Leather":
              db.fetch(`leather_${tokenDB}`) || 0, // Arcane material
            "<:arcaneshard:1147112213073629206> Arcane shard":
              db.fetch(`arcaneShard_${tokenDB}`) || 0, // Arcane material
            "<:icecube:1147112519878590514> Ice cube":
              db.fetch(`iceCube_${tokenDB}`) || 0, // Arcane material
            "<:greenrock:1147112816235515954> Green rock":
              db.fetch(`greenRock_${tokenDB}`) || 0, // Arcane material
            "<:silk:1147103793058693130> Silk":
              db.fetch(`silk_${tokenDB}`) || 0, // Arcane material
          };

          // Function to get the rarity of an item

          // Create the inventory embed
          const inventoryEmbed = new Discord.MessageEmbed()
            .setTitle(`${user.username}'s Inventory`)
            .setColor(`#2B2D31`);

          // Check each item and add it to the inventory description if the user has it
          const itemNames = Object.keys(items);
          const itemsPerPage = 8;
          let currentPage = 1;
          const itemsRarity = {
            "<a:mysterionixPro:1159100552299429908> Mysterionix pro": "Premium",
            "<a:disguisedDiverfish:1158038321537241098> Disguised diverfish":
              "Collectible",
            "<a:luminaFin:1158034789614497813> Lumina fin": "Collectible",
            "<a:bubblegumBlowfish:1158036690364010549> Bubblegum blowfish":
              "Collectible",
            "<:fishingRod:1157537595002204260> Fishing rod": "Tool",
            "<:sarcasticFringehead:1156929582335799388> Sarcastic fringehead":
              "Sellable",
            "<:salmon:1156929627126771784> Salmon": "Sellable",
            "<:smellyFish:1156929529894424666> Smelly fish": "Sellable",
            "<:burnedfish:1156939483267207220> Burned fish": "Sellable",
            "<:grumpyCatfish:1156929452056522812> Grumpy catfish": "Sellable",
            "<:pancakeFish:1156929418170744852> Pancake fish": "Sellable",
            "<:discoJellyfish:1156929355465900133> Disco jellyfish": "Sellable",
            "<:sodaCanfish:1156929327817035788> Soda canfish": "Sellable",
            "<:lavaLampEel:1156939953448681472> Lava lamp eel": "Sellable",
            "<:rubberDuckyfish:1156938911004766240> Rubber duckyfish":
              "Sellable",
            "<:ninjaStarfish:1156938871695757432> Ninja starfish": "Sellable",
            "<:alienAnglerfish:1156938740586000394> Alien anglerfish":
              "Sellable",
            "<:pirateParrotfish:1156938717781573733> Pirate parrotfish":
              "Sellable",
            "<:toiletSeatLid:1156938695635644506> Toilet seat lid": "Sellable",
            "<:boot:1156938677176520785> Boot": "Sellable",
            "<:bottle:1156938658667044934> Bottle": "Sellable",
            "<:eldritchFlameScroll:1154411820283613275> Eldritch flame scroll":
              "Collectible",
            "<:infernothsWrathfulEye:1154412305128378499> Infernoth's wrathful eye":
              "Collectible",
            "<:pyroclasmicGem:1154412690870108261> Pyroclasmic gem":
              "Collectible",
            "<:pyroclasmicEssence:1154413077807255612> Pyroclasmic essence":
              "Collectible",
            "<:magmaticTorch:1154413864386052146> Magmatic torch":
              "Collectible",
            "<:eternalFlameEssence:1154414454155530371> Eternal flame essence":
              "Collectible",
            "<:blackOil:1154415835998322718> Black oil": "Collectible",
            "<:hotWater:1154416000360525924> Hot water": "Collectible",
            "<:transparentGlass:1154416282133876868> Transparent glass":
              "Collectible",
            "<a:moonsShineOfMetalSword:1154071077954269245> Moon's shine of metal sword":
              "Weapon",
            "<:timekeepersChronometer:1152603999074263050> Timekeeper's chronometer":
              "Collectible",
            "<:shieldOfTheEarthshaker:1151190097924980867> Shield of the earthshaker":
              "Collectible",
            "<:orbOfElementalMastery:1151189114767540265> Orb of elemental mastery":
              "Collectible",
            "<a:auroraGaze:1149396676650483914> Aurora gaze": "Collectible",
            "<a:mysticRuneOfResilience:1149382045911494738> Mystic rune of resilience":
              "Collectible & Military",
            "<:goldbar:1147101331534921758> Gold Bar": "Economy",
            "<:daggerofdeath:1147084241516105728> Dagger of death": "Weapon",
            "<:bullet:1147100873164603472> Bullet": "Military",
            "<:awakeninggem:1147071223042424902> Awakening gem": "Power-up",
            "<:eliteawakeninggem:1147070929957027860> Elite awakening gem":
              "Power-up",
            "<:ventorianbow:1147084109986930688> Ventorian bow of ventor":
              "Weapon",
            "<:texarusthedemonishedstaff:1147083583899586661> Texarus the demonished staff":
              "Weapon",
            "<:waetrathefreezedbow:1147084610279325706> Waetra the freezed bow":
              "Weapon",
            "<:rashetathefuriousaxe:1147085204779962408> Rasheta the furious axe":
              "Weapon",
            "<:naturedaggers:1147084151686701068> Nature daggers of superpower":
              "Weapon",
            "<:immortalgun:1147084130807455814> Immortal gun of energy":
              "Weapon",
            "<:vanityicon:1147071701633482773> Golden Ghost Knight Set":
              "Vanity",
            "<:vanityicon:1147071701633482773> Supreme magical set": "Vanity",
            "<:vanityicon:1147071701633482773> Frozen set": "Vanity",
            "<:vanityicon:1147071701633482773> Super golem set": "Vanity",
            "<:vanityicon:1147071701633482773> Dawnfire set": "Vanity",
            "<:vanityicon:1147071701633482773> Arcane sensei set": "Vanity",
            "<:vanityicon:1147071701633482773> Intrepid set": "Vanity",
            "<:vanityicon:1147071701633482773> Medusa set": "Vanity",
            "<:unlockedCrateOfEnergy:1147102884585017355> Unlocked crate of energy":
              "Chest",
            "<:vortexorb:1147066784969666600> Vortex orb": "Collectible",
            "<:verdantwhisperleaf:1147068073619226684> Verdant Whisper leaf":
              "Collectible",
            "<:celestialmoonstone:1147070214987583519> Celestial Moonstone":
              "Collectible",
            "<:crystallinecorestone:1147068766983819275> Crystalline corestone":
              "Collectible",
            "<:tomeofeverlastingwisdom:1147073417275773018> Tome of everlasting wisdom":
              "Collectible",
            "<:rustygears:1147072174264426606> Rusty gears": "Sellable",
            "<:dustbin:1147071977601908767> Dustbin": "Sellable",
            "<:newspaper:1147073903068463114> Newspaper": "Sellable",
            "<:torncloth:1147103370637738035> Torn cloth": "Sellable",
            "<:usedtissue:1147072375305797692> Used tissue": "Sellable",
            "<:brokenstick:1147072664792485949> Broken stick": "Sellable",
            "<:cotton:1147116559526015088> Cotton": "Material",
            "<:supergem:1147106342427955300> Super gem": "Material",
            "<:leather:1147104055701798933> Leather": "Material",
            "<:arcaneshard:1147112213073629206> Arcane shard": "Material",
            "<:icecube:1147112519878590514> Ice cube": "Material",
            "<:greenrock:1147112816235515954> Green rock": "Material",
            "<:silk:1147103793058693130> Silk": "Material",
            "<:valoriumsTear:1147381630009364581> Valorium's tear":
              "Collectible",
            "<:valoriumsSoul:1147382331422810132> Valorium's Eclipsian soul":
              "Collectible",
            "<a:abyssalCrownOfDominience:1149551849192575048> Abyssal crown of dominance":
              "Collectible",
            "<:abyssalstarcrystal:1148264853060976720> Abyssal starcrystal":
              "Collectible",
            "<:eldrazursgrimoireofruin:1148265284478709922> Eldra'zur's grimoire of ruin":
              "Collectible",
            "<a:abyssalScepterOfOblivion:1149541562523603004> Abyssal scepter of oblivion":
              "Collectible",
            "<:titlelogo:1148602133445353515> Monarch slayer": "Title",
          };
          const itemsID = {
            "<:eldritchFlameScroll:1154411820283613275> Eldritch flame scroll":
              "eldritchFlameScroll",
            "<:infernothsWrathfulEye:1154412305128378499> Infernoth's wrathful eye":
              "infernothsWrathfulEye",
            "<:pyroclasmicGem:1154412690870108261> Pyroclasmic gem":
              "pyroclasmicGem",
            "<:pyroclasmicEssence:1154413077807255612> Pyroclasmic essence":
              "pyroclasmicEssence",
            "<:magmaticTorch:1154413864386052146> Magmatic torch":
              "magmaticTorch",
            "<:eternalFlameEssence:1154414454155530371> Eternal flame essence":
              "eternalFlameEssence",
            "<:blackOil:1154415835998322718> Black oil": "blackOil",
            "<:hotWater:1154416000360525924> Hot water": "hotWater",
            "<:transparentGlass:1154416282133876868> Transparent glass":
              "transparentGlass",
            "<a:moonsShineOfMetalSword:1154071077954269245> Moon's shine of metal sword":
              "moonsShineOfMetalSword",
            "<:timekeepersChronometer:1152603999074263050> Timekeeper's chronometer":
              "timekeepersChronometer",
            "<:shieldOfTheEarthshaker:1151190097924980867> Shield of the earthshaker":
              "shieldOfTheEarthshaker",
            "<:orbOfElementalMastery:1151189114767540265> Orb of elemental mastery":
              "orbOfElementalMastery",
            "<a:auroraGaze:1149396676650483914> Aurora gaze": "auroraGaze",
            "<a:mysticRuneOfResilience:1149382045911494738> Mystic rune of resilience":
              "mysticRuneOfResilience",
            "<:goldbar:1147101331534921758> Gold Bar": "goldBar",
            "<:daggerofdeath:1147084241516105728> Dagger of death":
              "daggerOfDeath",
            "<:bullet:1147100873164603472> Bullet": "bullet",
            "<:awakeninggem:1147071223042424902> Awakening gem": "awakeningGem",
            "<:eliteawakeninggem:1147070929957027860> Elite awakening gem":
              "eliteAwakeningGem",
            "<:ventorianbow:1147084109986930688> Ventorian bow of ventor":
              "ventorianBow",
            "<:texarusthedemonishedstaff:1147083583899586661> Texarus the demonished staff":
              "texarus",
            "<:waetrathefreezedbow:1147084610279325706> Waetra the freezed bow":
              "waetra",
            "<:rashetathefuriousaxe:1147085204779962408> Rasheta the furious axe":
              "rasheta",
            "<:naturedaggers:1147084151686701068> Nature daggers of superpower":
              "natureDaggers",
            "<:immortalgun:1147084130807455814> Immortal gun of energy":
              "immortalGun",
            "<:vanityicon:1147071701633482773> Golden Ghost Knight Set":
              "goldenGhostKnightSet",
            "<:vanityicon:1147071701633482773> Supreme magical set":
              "supremeMagicalSet",
            "<:vanityicon:1147071701633482773> Frozen set": "frozenSet",
            "<:vanityicon:1147071701633482773> Super golem set":
              "superGolemSet",
            "<:vanityicon:1147071701633482773> Dawnfire set": "dawnfireSet",
            "<:vanityicon:1147071701633482773> Arcane sensei set":
              "arcaneSenseiSet",
            "<:vanityicon:1147071701633482773> Intrepid set": "intrepidSet",
            "<:vanityicon:1147071701633482773> Medusa set": "medusaSet",
            "<:unlockedCrateOfEnergy:1147102884585017355> Unlocked crate of energy":
              "unlockedCrateOfEnergy",
            "<:vortexorb:1147066784969666600> Vortex orb": "vortexOrb",
            "<:verdantwhisperleaf:1147068073619226684> Verdant Whisper leaf":
              "verdantLeaf",
            "<:celestialmoonstone:1147070214987583519> Celestial Moonstone":
              "celestialMoonstone",
            "<:crystallinecorestone:1147068766983819275> Crystalline corestone":
              "crystallineCorestone",
            "<:tomeofeverlastingwisdom:1147073417275773018> Tome of everlasting wisdom":
              "tomeOfEverlastingWisdom",
            "<:rustygears:1147072174264426606> Rusty gears": "rustyGears",
            "<:dustbin:1147071977601908767> Dustbin": "dustbin",
            "<:newspaper:1147073903068463114> Newspaper": "newspaper",
            "<:torncloth:1147103370637738035> Torn cloth": "tornCloth",
            "<:usedtissue:1147072375305797692> Used tissue": "usedTissue",
            "<:brokenstick:1147072664792485949> Broken stick": "brokenStick",
            "<:cotton:1147116559526015088>Cotton": "cotton",
            "<:supergem:1147106342427955300> Super gem": "superGem",
            "<:leather:1147104055701798933> Leather": "leather",
            "<:arcaneshard:1147112213073629206> Arcane shard": "arcaneShard",
            "<:icecube:1147112519878590514> Ice cube": "iceCube",
            "<:greenrock:1147112816235515954> Green rock": "greenRock",
            "<:silk:1147103793058693130> Silk": "silk",
            "<:valoriumsTear:1147381630009364581> Valorium's tear":
              "valoriumsTear",
            "<:valoriumsSoul:1147382331422810132> Valorium's Eclipsian soul":
              "valoriumsEclipsianSoul",
            "<a:abyssalCrownOfDominience:1149551849192575048> Abyssal crown of dominance":
              "abyssalCrownOfDominance",
            "<:abyssalstarcrystal:1148264853060976720> Abyssal starcrystal":
              "abyssalStarcrystal",
            "<:eldrazursgrimoireofruin:1148265284478709922> Eldra'zur's grimoire of ruin":
              "eldrazursGrimoireOfRuin",
            "<a:abyssalScepterOfOblivion:1149541562523603004> Abyssal scepter of oblivion":
              "abyssalScepterOfOblivion",
            "<:titlelogo:1148602133445353515> Monarch slayer":
              "monarchSlayerTitle",
          };

          function showCurrentPage() {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(
              startIndex + itemsPerPage,
              itemNamesWithQuantity.length
            );
            const pageItems = itemNamesWithQuantity.slice(startIndex, endIndex);
            const inventoryItems = [];

            for (const [itemName, amount] of pageItems) {
              const rarity = itemsRarity[itemName] || "ERROR";
              const itemID = itemsID[itemName] || "ERROR";
              inventoryItems.push(
                `**${itemName} -** ${amount}\n  <:arrow:1156648683849383936> ${rarity}\n`
              );
            }

            inventoryEmbed.setDescription(inventoryItems.join("\n"));
            inventoryEmbed.setFooter(`Page ${currentPage}/${totalPages}`);
            return inventoryEmbed;
          }
          const itemNamesWithQuantity = Object.entries(items).filter(
            ([itemName, quantity]) => quantity > 0
          );
          const totalPages = Math.ceil(
            itemNamesWithQuantity.length / itemsPerPage
          );
          const inventoryMessage = await message.channel.send(
            showCurrentPage()
          );

          if (totalPages > 1 && itemNamesWithQuantity.length > itemsPerPage) {
            await inventoryMessage.react("<:leftarrow:1147157614065627208>");
            await inventoryMessage.react("<:rightarrow:1147157581266165811>");

            const filter = (reaction, user) => {
              return (
                ["leftarrow", "rightarrow"].includes(reaction.emoji.name) &&
                user.id === message.author.id
              );
            };

            const collector = inventoryMessage.createReactionCollector(filter, {
              time: 604800000,
              dispose: true,
            });

            collector.on("collect", (reaction) => {
              reaction.users.remove(message.author).catch(console.error);
              if (reaction.emoji.name === "rightarrow") {
                currentPage = (currentPage % totalPages) + 1;
              } else if (reaction.emoji.name === "leftarrow") {
                currentPage = ((currentPage - 2 + totalPages) % totalPages) + 1;
              }
              inventoryMessage.edit(showCurrentPage());
            });

            collector.on("end", () => {
              inventoryMessage.reactions.removeAll().catch(console.error);
            });
          } else {
            inventoryMessage.reactions.removeAll().catch(console.error);
          }
        }
      } else {
        message.channel.send(
          "I don't have the necessary permissions to add reactions or edit messages with reactions in this channel."
        );
      }
    }
  },
};
