module.exports.config = {
  name: "ARIF-BOT-1",
  version: "1.0.1",
  hasPermission: 0,
  credits: "ARIF BABU",
  description: "MADE BY ARIF BABU",
  commandCategory: "ON PREFIX",
  usages: "ON PREFIX",
  cooldowns: 2,
};
 
module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, senderID, body } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("HH:mm:ss L");

  // Define bot admin ID and female IDs
  const botAdminID = '100000887045076'; // Replace with the actual admin ID
  const femaleIDs = ['100000887045076', '100007994598695']; // Replace with actual female UIDs
 
  // Get user name
  const name = await Users.getNameUser(senderID);
 
  // Get user's gender
  const ThreadInfo = await api.getThreadInfo(event.threadID);
  const user = ThreadInfo.userInfo.find(user => user.id === senderID);
  const gender1 = user ? user.gender : "UNKNOWN";
 
  // Set the gender-specific reply
  const replies = gender1 === "MALE" 
    ? ["हाय मैं सदके जावा तेरी इस मासूम सकल पे बेबी 💋🙈 " , "बार बार परेशान ना कर अपने बाबू के साथ बीजी हूं। 😒🤟" , "मैं गरीबों से बात नही करती ☹️🤟", "क्यूं बुलाया हमे...?😾🔪 " , ""तुम मुझे बिलकुल भी याद नहीं करते ना 😥 देख लेना पाप लगेगा 🥺👈"];

   const femaleReplies
    : ["इतना न पास आओ प्यार हो जाएगा देवी जी 🙈😎😕👈" , "इटू 🤏 सा शर्म कर लिया करो बोट बोट करते वक्त देवी 🙂🤞" , "इतनी सिंगल हूं की ख्याब में लड़की की हां करने से पहले ही आंखे खुल जाती है 😕🤞" , "जरूरी नहीं हर लड़की धोखा दे 👉💔 कुछ लड़किया गालियां भी देती है। 😕🤞", "आप ऐसा न बोलो मुझे शर्म आती है। 🙈♥️👌" , "क्यूं बुलाया हमे...?😾🔪 " , "तुम मुझे बिलकुल भी याद नहीं करते ना 😥 देख लेना पाप लगेगा 🥺👈"];
  const rand = replies[Math.floor(Math.random() * replies.length)];
 
  // Admin-specific replies
  const adminReplies = [
    "मालिक आ गये हो 🙂🤞",
    "बोलिए सर",
    "जी मालिक हुकुम कीजिए",
    "सर",
    "जी सर"
  ];
  const randAdminReply = adminReplies[Math.floor(Math.random() * adminReplies.length)];
 
  // Female-specific replies
  const femaleReplies = [
    "boliye ma'am", 
    "हुकुम कीजिए मालकिन", 
    "जी मालकिन", 
    "बोलिए मैडम जी"
  ];
  const randFemaleReply = femaleReplies[Math.floor(Math.random() * femaleReplies.length)];

  // Handle commands anywhere in the message
  const messageBody = event.body.toLowerCase();
  if (messageBody.includes("bot") || 
      messageBody.includes("Bot") || 
      messageBody.includes("BOT")) {
    // Show typing indicator
    await api.sendTypingIndicator(threadID);
 
    // Delay to simulate typing
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
 
    // Check if the sender is the bot admin
    if (senderID === botAdminID) {
      // Reply with a random admin message
      return api.sendMessage(randAdminReply, threadID, messageID);
    }
 
    // Check if the sender is one of the female UIDs
    if (femaleIDs.includes(senderID)) {
      // Reply with a random female-specific message
      return api.sendMessage(randFemaleReply, threadID, messageID);
    } else {
      // Reply with a personalized message for other users
      const msg = {
        body: `${name} 😗, ${rand}`,
        mentions: [{ tag: name, id: senderID }],
      };
      return api.sendMessage(msg, threadID, messageID);
    }
  }
};
 
module.exports.run = function ({ api, event, client, __GLOBAL }) {};
