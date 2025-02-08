const emojiResponses = {
  "Betu": {
    "OWNER": [
      "क्या सोच रहे हो दीदी 🥺",
      "दीदी जी कहां थे आप 😀",
      "दीदी आई लव यू 🙈❤️",
      "हां दीदी बताइए मैं यही हूं बताइए क्या हुआ 😊"
    ]
  },
  "Bhai": {
     "OWNER": [
      "क्या सोच रही हो मेरी प्यारी दीदी जी",
      "दीदी आप आ गये 😀",
      "दीदी जी ज्यादा ना सोचा करो मैं यही हूं 🫣❤️🤭",
     "दीदी जी आई मिस यू 😔",
      "दीदी जी आर्डर दीजिए क्या करना है 🙈❤️",
      "दीदी जी मैं आपका गोलू मोलू हूं ना 🥺",
      "दीदी जी मेरा शादी कब करोगे 😁",
      "क्या हुआ दीदी जी 😊",
      "दीदी जी आपको पता मेरा बर्थडे कब है 😔",
      "दीदी मेरे साथ घूमने चलोगे 🫣❤️",
      "दीदी मुझे चॉकलेट चाहिए 😹",
      "दीदी मेरे को खिलौने चाहिए खेलने के लिए आप दिलआओगे ना 🥺❤️",
      "दीदी मुझे पिज़्ज़ा खाना है 🥺",
      "क्या सोच रहे हो बॉस 🤔",
      "दीदी में हमेशा आपके साथ हूं 🤭",
      "दीदी पापा मम्मी और आपके साथ मुझे ना एक फोटो क्लिक करनी है 🥺",
      "दीदी कुछ खाने को दो ना 😀",
      "दीदी आप मुझसे ना प्यार नहीं करते 😭",
      "दीदी आप कितनी गंदी हो आप मुझे बाहर खेलने भी नहीं जाने देते",
      "दीदी आपका सिर दर्द कर रहा होगा ना मैं आपका सिर दबा दूं 😹❤️",
      "दीदी आपने मेडिसन ली 🤔",
      "दीदी डैडी को बोलो ना मुझ पर गुस्सा नहीं करें 🤭",
      "सोना दीदी  सिर्फ मेरी है 😒",
      "दीदी चॉकलेट खाओगे 🤩❤️🤭",
      "दीदी मेरे मम्मी कहां है 🫣",
      "दीदी मुझे भी लूडो खेलना है 🤣",
    ]
  }
};
 
module.exports.config = {
  name: "SAURABH-BOT-7",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SAURABH XD",
  description: "MADE BY SAURABH THAKUR",
  commandCategory: "No command marks needed",
  cooldowns: 0,
};
 
module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, senderID, body } = event;
  const emojis = Object.keys(emojiResponses);
 
  // Convert the message body to lowercase
  const lowercaseBody = body.toLowerCase();
 
  for (const emoji of emojis) {
    if (lowercaseBody.includes(emoji)) {
      // Fetch user's gender correctly
      const ThreadInfo = await api.getThreadInfo(threadID);
      const user = ThreadInfo.userInfo.find(user => user.id === senderID);
 
      // Check if the sender is the bot owner
      const botOwnerID = "100008372476102"; // Your bot owner UID
      let responseArray;
 
      if (senderID === botOwnerID) {
        responseArray = emojiResponses[emoji]["OWNER"];
      } else {
        responseArray = emojiResponses[emoji][gender] || emojiResponses[emoji]["FEMALE"];
      }
 
      // Randomly select a response from the appropriate array
      const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
 
      const msg = {
        body: randomResponse,
      };
      api.sendMessage(msg, threadID, messageID);
      break; // Exit the loop once a match is found
    }
  }
};
 
module.exports.run = function() {};