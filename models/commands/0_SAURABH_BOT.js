const fs = global.nodemodule["fs-extra"]; // This line is likely unnecessary and can be removed
module.exports.config = {
  name: "julmi",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "SAURABH THAKUR",
  description: "prem bot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  const { threadID, messageID, senderID } = event; // Use object destructuring for cleaner code
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:mm:ss L"); // Corrected time format (mm instead of MM)
  const name = await Users.getNameUser(senderID); // Get the user's name

  const tl = [" बस यूँ ही पूछना था  कि हर रोज जो मेरी नींद चुराते हो  उसका तुम करते क्या हो…..? ","क्या सोच रहे हो सर 🤔","अच्छा जी","चलिए आज से आपको फुल इज्जत देगा ए बोट","सर आपका खाना हो गया","सर आप तो फेसबुक के किंग लग रहे हैं","सर जितनी इज्जत मैं आपको दे सकता हूं दूंगा लेकिन अगर बदतमीजी करोगे तो इतनी इज्जत उतार भी लूंगा 😒","सर थोड़ा खाना खाया कीजिए आप तो बहुत पतले हो गए हो 😒","आपकी बाबू नजर नहीं आ रही है 🤭","लगता आपकी बाबू  किसी के साथ भाग गई","रोना नहीं मेरे बच्चे कोई नई लड़की मिल जाएगी तुम्हें 😁","मेरी बातों का बुरा मत माना करो मैं तो एक वोट हूं 🫡", /* ... (rest of your array of strings) */ ];
  const rand = tl[Math.floor(Math.random() * tl.length)];

  // Removed unnecessary if conditions that always evaluated to false
  if (event.body === undefined || event.body.trim() === "") { // Check if the message is empty or contains only whitespace
    return api.sendMessage("", threadID, messageID); // Send the message and include messageID
  }

  // Removed unnecessary "mess" variable

  if (event.body.toLowerCase().startsWith("🤔") || event.body.toLowerCase().startsWith("bhai")) { // Use startsWith to check for prefix
    const msg = {
      body: ` ${name} \n\n ${rand} \n\n◦•●◉✿Nobita✿◉●•◦`
    };
    return api.sendMessage(msg, threadID, messageID); // Include messageID for replies
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) { }; // This function is empty and doesn't need to do anything
