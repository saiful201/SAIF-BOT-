const fs = require("fs");
module.exports.config = {
  name: "admin2",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "admin",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("Aniya")==0 || event.body.indexOf("aniya")==0 || event.body.indexOf("ANIYA")==0 || event.body.indexOf("aalu")==0) {
    var msg = {
        body: "😻 𝐌𝐚𝐦𝐦𝐚'𝐬 𝐏𝐫𝐨𝐟𝐢𝐥𝐞 😻",
        attachment: 
fs.createReadStream(__dirname + `/noprefix/A.png`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🙈", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }