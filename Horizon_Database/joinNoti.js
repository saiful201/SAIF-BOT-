module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "CatalizCS", //fixing ken gusler
  description: "Notify bot or group member with random gif/photo/video",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "pidusage": ""
  }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

  const path = join(__dirname, "cache", "joinGif");
  if (existsSync(path)) mkdirSync(path, { recursive: true });	

  const path2 = join(__dirname, "cache", "joinjpg", "join.jpg");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`{ ${global.config.PREFIX} } × ${(!global.config.BOTNAME) ? "bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    const fs = require("fs");
    return api.sendMessage("╭──────•◈•───────╮\n         🅂🄰🄸🄵🄱🄾🅃       \n চলে এসেছি আমি সাইফুল বট তোমাদের মাঝে_🤭 \n╰──────•◈•───────╯", event.threadID, () => api.sendMessage({body:`আসসালামু আলাইকুম

🤖ROBOT CONNECTED SUCCESSFULLY🤖

চলে আসলাম তোমাদের মাঝে 🥀

◑আপনাকে অনেক ধন্যবাদ আমাকে এড দেওয়ার জন্য,❤️‍🔥

◑কিন্তু আমাকে কন্ট্রোল করার জন্য প্রয়োজন আমার বস সাইফুল ইসলাম কে🤙

◑মেম্বারদের সব কমান্ড আমার পক্ষে পালনকরা সম্ভব না 😔

◑আমার বস সাইফুল ইসলাম কে এড দিতে প্রথমে টাইপ করুন /add তারপর একটা স্পেস দিয়ে বস এর 𝒖𝒊'𝒅 100011152309303 দিন ☺️

◑ ফেসবুক লিংক ☞ https://www.facebook.com/saifulislam713?mibextid=ZbWKwL

🐰\n\nUse ${global.config.PREFIX}help to see commands.\n\nexample :\n${global.config.PREFIX}mark (text)\n${global.config.PREFIX}lexi (text)\n${global.config.PREFIX}trump (text)\n${global.config.PREFIX}info 
`, attachment: fs.createReadStream(__dirname + "/cache/joinmp4/saiful.mp4")} ,threadID));
  }
  else {
    try {
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const path = join(__dirname, "cache", "joinGif");
      const pathGif = join(path, `${threadID}.gif`);

      var mentions = [], nameArray = [], memLength = [], i = 0;

      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);
      }
      memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = "💐 WELCOME\n{name}\nআপনাকে আমাদের BFF OFFICIAL  Group এ Join হওয়ার জন্য ধন্যবাদ। আপনি আমাদের GROUP এর\n {soThanhVien} Number member আসা করি আপনি আমাদের সকল রুলস মেনে চলবেন।🖤💐\n[𝑮𝑹𝑶𝑼𝑷 𝑹𝑼𝑳𝑬𝑺]\n১. গ্ৰুপে কেউ ১৮+ কিছু দিবেন না।\n২. আমাদের গ্ৰুপে অনেক Senior ভাই ও আপু আছে, সবাইকে সম্মান দিবেন।\n৩. অযথা BOT Command দিয়ে বিরক্ত করবেন না।\n𝙳𝚎𝚜𝚒𝚐𝚗𝚎𝚍 𝙱𝚢; sᴀɪғᴜʟ ɪsʟᴀᴍ" : msg = threadData.customJoin;
      msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{type}/g, (memLength.length > 1) ?  'You' : 'Friend')
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

      if (existsSync(path)) mkdirSync(path, { recursive: true });

      const randomPath = readdirSync(join(__dirname, "cache", "joinjpg", "join.jpg"));

      if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
      else if (randomPath.length != 0) {
        const pathRandom = join(__dirname, "cache", "joinjpg", "join.jpg", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
        formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
      }
      else formPush = { body: msg, mentions }

      return api.sendMessage(formPush, threadID);
    } catch (e) { return console.log(e) };
  }
                       }
