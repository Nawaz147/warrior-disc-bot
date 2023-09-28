const Discord = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const startFunction = require("../../startCommandFunction.js");

module.exports = {
  name: "fish",
  aliases: ["Fishing"],
  description: "To play fishing event",
  usage: "fish",
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
    if (!message.author.id == "768747976767832084") {
      const buildInProgress = new Discord.MessageEmbed()
        .setDescription(`This command in under construction 🚧`)
        .setColor("#2B2D31");
      message.channel.send(buildInProgress);
      return;
    }
    if (startFunction) {
      startFunction(message, args, client);
    }

    if (tokenDB && acceptedTOS == true && update == false && banned == false) {
      const cooldownKey = `fish_cooldown_${tokenDB}`;
      const currentTime = Date.now();
      const cooldownTime = 10000; // 10 seconds in milliseconds

      if (
        db.has(cooldownKey) &&
        currentTime - db.get(cooldownKey) < cooldownTime
      ) {
        const remainingTime =
          (db.get(cooldownKey) + cooldownTime - currentTime) / 1000;
        const waitMessages = [
          "Hold on, let the fishes run... 😅",
          "The fish are playing hide and seek 👀, don't give up...",
          "Fishing in progress... Please don't scare 👻 the fish away!",
          "Just keep swimming 💦... I mean, waiting...",
          "The fish are conspiring against you, but patience is your secret weapon 🏹...",
        ];
        const randomWaitMessage =
          waitMessages[Math.floor(Math.random() * waitMessages.length)];

        // Create an embed for the wait message
        const waitEmbed = new Discord.MessageEmbed()
          .setDescription(`${randomWaitMessage} `)
          .setFooter(
            `You can fish again in ${remainingTime.toFixed(1)} seconds.`
          )
          .setColor("#2B2D31");

        message.channel.send(waitEmbed);
        return;
      }

      // Set the cooldown timestamp
      db.set(cooldownKey, currentTime);
      const trashFishesToGet = [
        {
          name: "Sarcastic fringehead",
          emoji: "<:sarcasticFringehead:1156929582335799388>",
          funnyTexts: [
            "You reeled in a Sarcastic fringehead. It sarcastically compliments your fishing skills.",
            "A Sarcastic fringehead appeared! It's not very impressed with your fishing technique.",
            "You caught a Sarcastic fringehead. It gives you a snarky fishy grin.",
            "It's a Sarcastic fringehead! It starts a stand-up comedy routine about fishing.",
            "A Sarcastic fringehead is your catch! It tells you a fishy joke.",
            "You pulled out a Sarcastic fringehead. It claims to be the world champion in underwater chess.",
            "You caught a Sarcastic fringehead. It challenges you to a fish-off!",
            "A Sarcastic fringehead is on your hook! It asks if you can teach it to fish.",
            "You caught a Sarcastic fringehead. It claims to be the fishiest stand-up comedian.",
            "A Sarcastic fringehead is on your hook! It challenges you to a fishy debate.",
            "You reeled in a Sarcastic fringehead. It offers you a snarky fishy critique of your fishing rod.",
            "A Sarcastic fringehead appeared! It tells you the secret to catching the perfect fish: be more sarcastic.",
            "You caught a Sarcastic fringehead. It asks if you have a fishy comeback for its sarcasm.",
            "You pulled out a Sarcastic fringehead. It claims to be the CEO of Fishy Insults Inc.",
            "A Sarcastic fringehead is your catch! It brags about being the snarkiest fish in the sea.",
          ],
        },
        {
          name: "Salmon",
          emoji: "<:salmon:1156929627126771784>",
          funnyTexts: [
            "You pulled out a salmon! It's doing its best salmon impression.",
            "It's a salmon! It does a little fishy dance for you.",
            "You caught a salmon, and it asks if you have any lemon and butter.",
            "A salmon is your catch! It says it was on its way to a sushi party.",
            "You reeled in a salmon. It challenges you to a swimming race.",
            "You caught a salmon. It claims to be the Michael Jordan of fish.",
            "A salmon appears! It's practicing its synchronized swimming routine.",
            "You found a salmon. It starts singing a fishy love song.",
            "You reeled in a salmon. It starts a fishy dance party on your boat.",
            "You caught a salmon. It challenges you to a game of underwater chess.",
            "A salmon is your catch! It claims to be the world record holder in fish hurdling.",
            "You found a salmon. It asks if you're up for a fishy game of hide and seek.",
            "A salmon emerges from the water! It gives you a salmon-sized high-five.",
            "You pulled out a salmon. It asks if you can teach it to fish for compliments.",
            "You caught a salmon. It claims to be the fishy ambassador to Atlantis.",
          ],
        },
        {
          name: "Smelly fish",
          emoji: "<:smellyFish:1156929529894424666>",
          funnyTexts: [
            "You found a smelly fish! It lives up to its name.",
            "A smelly fish emerges from the water. You might need a nose plug.",
            "You caught a smelly fish. It's not the catch of the day.",
            "It's a smelly fish! It offers to give you fishy perfume tips.",
            "A smelly fish is your catch! It blames a nearby fish for the smell.",
            "You reeled in a smelly fish. It asks if you have any fish deodorant.",
            "You caught a smelly fish. It challenges you to a fish-eating contest.",
            "A smelly fish appears! It claims to be the official fish of bad smells.",
            "You reeled in a smelly fish. It suggests opening a fishy perfume shop.",
            "A smelly fish emerges from the water. It challenges you to a fishy eating contest.",
            "You caught a smelly fish. It claims to have invented fishy deodorant.",
            "It's a smelly fish! It starts a fishy yoga session to improve its scent.",
            "A smelly fish is your catch! It offers you a smelly fish handshake.",
            "You found a smelly fish. It claims to be the chief odor officer of the ocean.",
            "You caught a smelly fish. It asks if you have any fishy air freshener.",
          ],
        },
        {
          name: "burned fish",
          emoji: "<:burnedfish:1156939483267207220>",
          funnyTexts: [
            "You caught a burned fish. It looks like it had a rough time on the grill.",
            "A charred fish appears! It's a bit crispy around the edges.",
            "It's a burned fish! Someone left it on the barbecue for too long.",
            "A burned fish is your catch! It says it's fire-resistant now.",
            "You reeled in a burned fish. It asks for sunscreen.",
            "You caught a burned fish. It's practicing its fire-breathing trick.",
            "A burned fish emerges from the water. It wants to start a barbecue club.",
            "You found a burned fish. It claims to be the secret ingredient for BBQ sauce.",
            "You caught a burned fish. It claims to be the official mascot of BBQ parties.",
            "A burned fish is your catch! It says it's fireproof now and ready for adventures.",
            "You found a burned fish. It challenges you to a fishy barbecue cook-off.",
            "A burned fish emerges from the water. It offers to toast marshmallows for you.",
            "You reeled in a burned fish. It claims to have tanned to perfection on the grill.",
            "You pulled out a burned fish. It asks if you have any fishy sunscreen.",
            "You caught a burned fish. It insists on being called 'Crispy' from now on.",
          ],
        },
        {
          name: "Grumpy Catfish",
          emoji: "<:grumpyCatfish:1156929452056522812>",
          funnyTexts: [
            "You caught a Grumpy Catfish. It looks like it didn't want to be caught.",
            "A Grumpy Catfish is your catch! It claims to have a PhD in catfishology.",
            "You reeled in a Grumpy Catfish. It insists on being called 'Professor Whiskers.'",
            "A Grumpy Catfish emerges from the water. It's not a morning fish.",
            "You found a Grumpy Catfish. It wants to start a grumpy fish support group.",
            "You pulled out a Grumpy Catfish. It challenges you to a staring contest.",
            "You caught a Grumpy Catfish. It claims to have the grumpiest meow in the sea.",
            "A Grumpy Catfish is on your hook! It asks if you have any fishnip.",
            "You reeled in a Grumpy Catfish. It insists on a grumpy fish selfie.",
            "You caught a Grumpy Catfish. It wants to start a grumpy catfish meme page.",
            "A Grumpy Catfish is your catch! It tells you that fishing is for amateurs.",
            "You found a Grumpy Catfish. It challenges you to a grumpy-off.",
            "A Grumpy Catfish emerges from the water. It insists on a grumpy fish philosophy debate.",
            "You pulled out a Grumpy Catfish. It claims to be the grumpiest fish in the ocean.",
            "You caught a Grumpy Catfish. It asks if you can teach it to smile.",
            "A Grumpy Catfish is on your hook! It tells you that fish puns are beneath it.",
            "You reeled in a Grumpy Catfish. It insists on a grumpy fish poetry contest.",
            "You caught a Grumpy Catfish. It challenges you to a grumpy fish stare-down.",
            "A Grumpy Catfish is your catch! It claims to be the grandmaster of grumpiness.",
            "You found a Grumpy Catfish. It wants to start a grumpy fish revolution.",
          ],
        },
        {
          name: "Pancake Fish",
          emoji: "<:pancakeFish:1156929418170744852>",
          funnyTexts: [
            "You caught a Pancake Fish! It's a bit flat, but it looks delicious.",
            "A Pancake Fish is your catch! It insists on being called 'Flapjack Fin.'",
            "You reeled in a Pancake Fish. It claims to have the world record for flips.",
            "A Pancake Fish emerges from the water. It challenges you to a pancake-eating contest.",
            "You found a Pancake Fish. It wants to start a pancake-themed fish cafe.",
            "You pulled out a Pancake Fish. It challenges you to a syrup-drinking duel.",
            "You caught a Pancake Fish. It claims to be the king of breakfast in the sea.",
            "A Pancake Fish is on your hook! It asks if you have any butter.",
            "You reeled in a Pancake Fish. It insists on a pancake flipping competition.",
            "You caught a Pancake Fish. It wants to start a pancake party underwater.",
            "A Pancake Fish is your catch! It tells you that fish like brunch too.",
            "You found a Pancake Fish. It challenges you to a pancake stack-off.",
            "A Pancake Fish emerges from the water. It insists on pancake poetry readings.",
            "You pulled out a Pancake Fish. It claims to be the syrupy sultan of the sea.",
            "You caught a Pancake Fish. It asks if you have any maple syrup.",
          ],
        },

        {
          name: "Disco Jellyfish",
          emoji: "<:discoJellyfish:1156929355465900133>",
          funnyTexts: [
            "You caught a Disco Jellyfish! It's ready to dance the night away.",
            "A Disco Jellyfish is your catch! It insists on being called 'Jelly Groove.'",
            "You reeled in a Disco Jellyfish. It claims to have the best dance moves in the sea.",
            "A Disco Jellyfish emerges from the water. It challenges you to a dance-off.",
            "You found a Disco Jellyfish. It wants to start a dance club for sea creatures.",
            "You pulled out a Disco Jellyfish. It challenges you to a disco ball spin-off.",
            "You caught a Disco Jellyfish. It claims to be the disco king of the ocean.",
            "A Disco Jellyfish is on your hook! It asks if you have any funky beats.",
            "You reeled in a Disco Jellyfish. It insists on a dance floor showdown.",
            "You caught a Disco Jellyfish. It wants to start a dance party on your boat.",
            "A Disco Jellyfish is your catch! It tells you that underwater raves are the best.",
            "You found a Disco Jellyfish. It challenges you to a disco dance battle.",
            "A Disco Jellyfish emerges from the water. It insists on disco-themed karaoke.",
            "You pulled out a Disco Jellyfish. It claims to be the grooviest fish in the sea.",
            "You caught a Disco Jellyfish. It asks if you have any disco lights.",
          ],
        },
        {
          name: "Soda Canfish",
          emoji: "<:sodaCanfish:1156929327817035788>",
          funnyTexts: [
            "You caught a Soda Canfish! It's a bit fizzy but surprisingly refreshing.",
            "A Soda Canfish is your catch! It insists on being called 'Fizzmaster.'",
            "You reeled in a Soda Canfish. It claims to have the secret to carbonation.",
            "A Soda Canfish emerges from the water. It challenges you to a soda chugging contest.",
            "You found a Soda Canfish. It wants to start a soda can recycling initiative.",
            "You pulled out a Soda Canfish. It challenges you to a soda can crushing competition.",
            "You caught a Soda Canfish. It claims to be the king of bubbly drinks in the sea.",
            "A Soda Canfish is on your hook! It asks if you have any straws.",
            "You reeled in a Soda Canfish. It insists on a fizzy drink taste test.",
            "You caught a Soda Canfish. It wants to start a soda party underwater.",
            "A Soda Canfish is your catch! It tells you that fish enjoy a good soda pop.",
            "You found a Soda Canfish. It challenges you to a soda can balancing act.",
            "A Soda Canfish emerges from the water. It insists on soda-themed trivia games.",
            "You pulled out a Soda Canfish. It claims to be the most refreshing fish in the sea.",
            "You caught a Soda Canfish. It asks if you have any ice cubes.",
          ],
        },
        {
          name: "Lava Lamp Eel",
          emoji: "<:lavaLampEel:1156939953448681472>",
          funnyTexts: [
            "You caught a Lava Lamp Eel! It's groovy and glows in vibrant colors.",
            "A Lava Lamp Eel is your catch! It insists on being called 'Lava Dancer.'",
            "You reeled in a Lava Lamp Eel. It claims to have the best light show in the sea.",
            "A Lava Lamp Eel emerges from the water. It challenges you to a dance-off under the lava lamp.",
            "You found a Lava Lamp Eel. It wants to start an underwater discotheque.",
            "You pulled out a Lava Lamp Eel. It challenges you to a lava lamp swirling contest.",
            "You caught a Lava Lamp Eel. It claims to be the grooviest eel in the ocean.",
            "A Lava Lamp Eel is on your hook! It asks if you have any glow sticks.",
            "You reeled in a Lava Lamp Eel. It insists on a dance party under the lava lamp.",
            "You caught a Lava Lamp Eel. It wants to start a psychedelic fish festival.",
            "A Lava Lamp Eel is your catch! It tells you that fish have great taste in decor.",
            "You found a Lava Lamp Eel. It challenges you to a lava lamp design competition.",
            "A Lava Lamp Eel emerges from the water. It insists on lava lamp-themed karaoke.",
            "You pulled out a Lava Lamp Eel. It claims to be the most illuminating fish in the sea.",
            "You caught a Lava Lamp Eel. It asks if you have any disco balls.",
          ],
        },
        {
          name: "Rubber Duckyfish",
          emoji: "<:rubberDuckyfish:1156938911004766240>",
          funnyTexts: [
            "You caught a Rubber Duckyfish! It squeaks when you squeeze it.",
            "A Rubber Duckyfish is your catch! It insists on being called 'Ducky McFish.'",
            "You reeled in a Rubber Duckyfish. It claims to be the world's favorite bath toy fish.",
            "A Rubber Duckyfish emerges from the water. It challenges you to a rubber ducky race.",
            "You found a Rubber Duckyfish. It wants to start a rubber ducky parade for fish.",
            "You pulled out a Rubber Duckyfish. It challenges you to a rubber ducky squeaking contest.",
            "You caught a Rubber Duckyfish. It claims to be the quackiest fish in the sea.",
            "A Rubber Duckyfish is on your hook! It asks if you have any bubble bath.",
            "You reeled in a Rubber Duckyfish. It insists on a rubber ducky fashion show.",
            "You caught a Rubber Duckyfish. It wants to start a bath time party underwater.",
            "A Rubber Duckyfish is your catch! It tells you that fish love a good soak.",
            "You found a Rubber Duckyfish. It challenges you to a rubber ducky trivia quiz.",
            "A Rubber Duckyfish emerges from the water. It insists on rubber ducky karaoke.",
            "You pulled out a Rubber Duckyfish. It claims to be the squeakiest fish in the sea.",
            "You caught a Rubber Duckyfish. It asks if you have any duck snacks.",
          ],
        },

        {
          name: "Ninja Starfish",
          emoji: "<:ninjaStarfish:1156938871695757432>",
          funnyTexts: [
            "You caught a Ninja Starfish! It's a master of stealth and underwater combat.",
            "A Ninja Starfish is your catch! It insists on being called 'Shuriken Shinobi.'",
            "You reeled in a Ninja Starfish. It claims to have trained with fish ninjas.",
            "A Ninja Starfish emerges from the water. It challenges you to a ninja duel.",
            "You found a Ninja Starfish. It wants to start a secret fish ninja academy.",
            "You pulled out a Ninja Starfish. It challenges you to a throwing star competition.",
            "You caught a Ninja Starfish. It claims to be the stealthiest fish in the sea.",
            "A Ninja Starfish is on your hook! It asks if you have any seaweed for camouflage.",
            "You reeled in a Ninja Starfish. It insists on a ninja fish training session.",
            "You caught a Ninja Starfish. It wants to start a fish ninja clan underwater.",
            "A Ninja Starfish is your catch! It tells you that fish ninjas are always watching.",
            "You found a Ninja Starfish. It challenges you to a ninja obstacle course.",
            "A Ninja Starfish emerges from the water. It insists on ninja-themed riddles.",
            "You pulled out a Ninja Starfish. It claims to be the sneakiest fish in the sea.",
            "You caught a Ninja Starfish. It asks if you have any sushi recipes.",
          ],
        },
        {
          name: "Alien Anglerfish",
          emoji: "<:alienAnglerfish:1156938740586000394>",
          funnyTexts: [
            "You caught an Alien Anglerfish! It's here to probe your fishing skills.",
            "An Alien Anglerfish is your catch! It insists on being called 'Extraterrestrial Eel.'",
            "You reeled in an Alien Anglerfish. It claims to have traveled from another galaxy for this fishing trip.",
            "An Alien Anglerfish emerges from the water. It challenges you to a space-themed fish-off.",
            "You found an Alien Anglerfish. It wants to start an interstellar fishing club.",
            "You pulled out an Alien Anglerfish. It challenges you to a UFO-spotting contest.",
            "You caught an Alien Anglerfish. It claims to be the most extraterrestrial fish in the sea.",
            "An Alien Anglerfish is on your hook! It asks if you have any alien bait.",
            "You reeled in an Alien Anglerfish. It insists on a cosmic fishing expedition.",
            "You caught an Alien Anglerfish. It wants to start an intergalactic fish party underwater.",
            "An Alien Anglerfish is your catch! It tells you that fish from other planets love fishing too.",
            "You found an Alien Anglerfish. It challenges you to an alien trivia quiz.",
            "An Alien Anglerfish emerges from the water. It insists on probing fishy mysteries.",
            "You pulled out an Alien Anglerfish. It claims to have the most advanced fishing technology in the sea.",
            "You caught an Alien Anglerfish. It asks if you have any space snacks.",
          ],
        },

        {
          name: "Pirate Parrotfish",
          emoji: "<:pirateParrotfish:1156938717781573733>",
          funnyTexts: [
            "You caught a Pirate Parrotfish! It's ready to sail the seven seas with you.",
            "A Pirate Parrotfish is your catch! It insists on being called 'Captain Squawks.'",
            "You reeled in a Pirate Parrotfish. It claims to have buried treasure on a distant fish island.",
            "A Pirate Parrotfish emerges from the water. It challenges you to a pirate-themed fish duel.",
            "You found a Pirate Parrotfish. It wants to start a fish pirate crew on your boat.",
            "You pulled out a Pirate Parrotfish. It challenges you to a plank-walking competition.",
            "You caught a Pirate Parrotfish. It claims to be the most swashbuckling fish in the sea.",
            "A Pirate Parrotfish is on your hook! It asks if you have any fishy grog.",
            "You reeled in a Pirate Parrotfish. It insists on a pirate fish treasure hunt.",
            "You caught a Pirate Parrotfish. It wants to start a fishy mutiny underwater.",
            "A Pirate Parrotfish is your catch! It tells you that fish can be pirates too, arrr!",
            "You found a Pirate Parrotfish. It challenges you to a pirate-themed sea shanty sing-off.",
            "A Pirate Parrotfish emerges from the water. It insists on pirate-themed fishy riddles.",
            "You pulled out a Pirate Parrotfish. It claims to have the deadliest beak in the sea.",
            "You caught a Pirate Parrotfish. It asks if you have any pirate flags.",
          ],
        },
        {
          name: "Toilet Seat Lid",
          emoji: "<:toiletSeatLid:1156938695635644506>",
          funnyTexts: [
            "You caught a Toilet Seat Lid. It asks if you're redecorating the ocean floor.",
            "A Toilet Seat Lid is your catch! It insists on being called 'The Commode King.'",
            "You reeled in a Toilet Seat Lid. It claims to be the official throne of the sea.",
            "A Toilet Seat Lid emerges from the water. It challenges you to a toilet paper duel.",
            "You found a Toilet Seat Lid. It wants to start a toilet seat museum.",
            "You pulled out a Toilet Seat Lid. It challenges you to a flush-off.",
            "You caught a Toilet Seat Lid. It claims to be the king of bathroom humor.",
            "A Toilet Seat Lid is on your hook! It asks if you have any spare rolls.",
            "You reeled in a Toilet Seat Lid. It insists on a toilet seat jousting tournament.",
            "You caught a Toilet Seat Lid. It wants to start a toilet-themed fish party.",
            "A Toilet Seat Lid is your catch! It tells you that the sea is its bathroom.",
            "You found a Toilet Seat Lid. It challenges you to a toilet seat lid toss.",
            "A Toilet Seat Lid emerges from the water. It insists on a toilet seat lid design contest.",
            "You pulled out a Toilet Seat Lid. It claims to be the master of the porcelain throne.",
            "You caught a Toilet Seat Lid. It asks if you have any plungers.",
            "A Toilet Seat Lid is on your hook! It tells you that fish are the real bathroom invaders.",
            "You reeled in a Toilet Seat Lid. It insists on a toilet seat lid pun battle.",
            "You caught a Toilet Seat Lid. It challenges you to a toilet seat lid trivia quiz.",
            "A Toilet Seat Lid is your catch! It claims to be the keeper of bathroom secrets.",
            "You found a Toilet Seat Lid. It wants to start a toilet seat lid revolution.",
          ],
        },

        {
          name: "boot",
          emoji: "<:boot:1156938677176520785>",
          funnyTexts: [
            "You reeled in a boot! Looks like you found some lost footwear.",
            "A boot?! Did someone go swimming with their shoes on again?",
            "You caught a boot! Maybe it's a rare designer fishing boot?",
            "A boot is your catch! It asks if you've seen its pair.",
            "You found a boot. It challenges you to a boot-wearing contest.",
            "You pulled out a boot. It claims to be the latest fashion trend in the fish world.",
            "A boot emerges from the water. It wants to start a fish shoe store.",
            "You caught a boot. It claims to be the left boot from Atlantis.",
            "You reeled in a boot. It challenges you to a fishy fashion show.",
            "A boot is your catch! It asks if you've seen its missing sock.",
            "You found a boot. It claims to have walked the underwater runway.",
            "A boot emerges from the water. It wants to start a boot-wearing fish club.",
            "You pulled out a boot. It insists on being called 'Booty' now.",
            "You caught a boot. It offers you a boot-shaped fish cake recipe.",
            "You reeled in a boot. It claims to be the most stylish fish in the ocean.",
          ],
        },
        {
          name: "bottle",
          emoji: "<:bottle:1156938658667044934>",
          funnyTexts: [
            "You found a bottle! There's a message inside, but it's just a grocery list.",
            "A mysterious bottle washes ashore. It contains a note that says, 'Buy more fish food.'",
            "You caught a bottle! Maybe there's a genie inside... or just some seawater.",
            "A bottle is your catch! It asks if you'll be its message in a bottle.",
            "You reeled in a bottle. It claims to have traveled the seven seas.",
            "You found a bottle. It wants to start a fishy recycling program.",
            "A bottle emerges from the water. It challenges you to a message-writing contest.",
            "You caught a bottle. It claims to be the most interesting bottle in the world.",
            "You caught a bottle. It asks if you'll be its message in a bottle.",
            "You reeled in a bottle. It insists on being called 'Bottley' now.",
            "You found a bottle. It wants to start a message-writing fish club.",
            "A bottle emerges from the water. It challenges you to a bottle-flipping contest.",
            "You pulled out a bottle. It claims to be the most interesting bottle in the sea.",
            "You found a bottle. It offers you a fishy riddle to solve.",
            "A bottle is your catch! It tells you a fishy secret it heard from the depths.",
          ],
        },
      ];
      // Select a random item from the array
      const randomItem =
        trashFishesToGet[Math.floor(Math.random() * trashFishesToGet.length)];

      // Select a random funny text associated with the item
      const randomFunnyText =
        randomItem.funnyTexts[
          Math.floor(Math.random() * randomItem.funnyTexts.length)
        ];
      function formatName(name) {
        return name
          .split(" ")
          .map((word, index) =>
            index === 0
              ? word.toLowerCase()
              : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join("");
      }
      const formattedItemName = formatName(randomItem.name);
      console.log(formattedItemName);

      const footerTexts = [
        "May your net be ever full and your fish tales even taller!",
        "Keep reeling in the fun!",
        "Remember, even the smallest fish has a big story!",
        "Fish on, fellow angler!",
        "Don't forget to do your fishy victory dance!",
        "Tight lines and good times!",
        "Fishing is the reel deal!",
        "Share your fishy adventures with your fellow sailors!",
        "Catch a fish, and make a friend!",
        "May your fishing trips be as deep as the ocean!",
        "Here's to hooking the big one next time!",
        "Reel in memories that will last a lifetime!",
        "Fish, relax, repeat!",
        "Keep calm and fish on!",
        "The sea is full of surprises—what's your next catch?",
        "Life's a beach, and then you fish!",
        "In the game of fishing, you win or you reel!",
        "Every fish is a new story to tell.",
        "Dive into the world of fin-tastic adventures!",
        "Reel life is the best life!",
        "Hooked on fishing, addicted to fun!",
        "May your hooks be sharp, and your fish be plentiful!",
        "Fish 'til you drop, then fish some more!",
        "Cast away your worries with every cast!",
        "Keep your friends close and your fish closer!",
        "The ocean is calling, and I must go fishing!",
        "Anglers make the best fishy friends!",
        "Fishing: the art of drowning worms and saving souls!",
        "Catch and release—fish and friendships!",
      ];

      // Select a random footer text
      const randomFooterText =
        footerTexts[Math.floor(Math.random() * footerTexts.length)];

      // Create an embed to show the result
      const fishEmbed = new Discord.MessageEmbed()
        .addField(
          `You hooked a ${randomItem.name} ${randomItem.emoji}`,
          `You've just reeled in a remarkable ${randomItem.name}! ${randomFunnyText}`
        )
        .setColor("#2B2D31")
        .setFooter(randomFooterText);
      db.add(`${formattedItemName}_${tokenDB}`, 1);
      message.channel.send(fishEmbed);
    }
  },
};
