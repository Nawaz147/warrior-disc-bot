const addBot = document.querySelector("button");
addBot.onclick = function () {
  window.location =
    "https://discord.com/api/oauth2/authorize?client_id=934850905273159710&permissions=8937223482609&scope=bot";
};
const botCommands = document.querySelector(".botCommandsBtn");
botCommands.onclick = function () {
  window.location = "./commands.html";
};
const promoCodesBtn = document.querySelector(".promoCodesBtn");
promoCodesBtn.onclick = function () {
  window.location = "./promoCodes.html";
};
const itemInfosBtn = document.querySelector(".itemInfosBtn");
itemInfosBtn.onclick = function () {
  window.location = "./itemInfos.html";
};
