module.exports.config = {
        name: "pending",
        version: "1.0.5",
        credits: "SAURABH BABU",
        hasPermssion: 2,
        description: "MADE BY SAURABH BABU",
        commandCategory: "SYSTEM",
        cooldowns: 5
};

module.exports.languages = {
    "vi": {
        "returnListPending": "❁ ━━━[𝐏𝐄𝐍𝐃𝐈𝐍𝐆]━━━ ❁\nTổng số nhóm cần duyệt: {%1} nhóm\n\n{%2}",
        "returnListClean": "PENDING Hiện tại không có nhóm nào trong hàng chờ"
    },
    "en": {
        "invaildNumber": "%1 बॉस आप ग्रुप इग्नोर से निकलना भूल गए हो 😭👈",
        "cancelSuccess": "Refused {%1} thread!",
        "notiBox": "मेरे बॉस सौरभ ने अप्रूवल दे दिया हैं और जानकारी के लिए 👉#help to और #help2👈लिखें धन्यवाद 😹👈",
        "approveSuccess": "बॉस आपने अप्रूवल दे दिया है %1 🙂🤞",

        "returnListPending": "❁ ━━━[𝐏𝐄𝐍𝐃𝐈𝐍𝐆]━━━ ❁\n\nइतने ग्रुप आप के पैडिंग मै हैं बॉस सिलेक्ट क़र लो 🍎 {%1} मालिक\n%2",
        "returnListClean": "❁ ━━━[𝐏𝐄𝐍𝐃𝐈𝐍𝐆]━━━ ❁\n\nमालिक आप के ग्रुप पेंडिंग मै नहीं हैं अब खुश हो जाओ बॉस 😹👈"
    }
}

module.exports.handleReply = async function({ api, event, handleReply, getText }) {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(getText("invaildNumber", singleIndex), threadID, messageID);
            api.removeUserFromGroup(api.getCurrentUserID(), handleReply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getText("cancelSuccess", count), threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(getText("invaildNumber", singleIndex), threadID, messageID);
            api.sendMessage(getText("notiBox"), handleReply.pending[singleIndex - 1].threadID);
            count+=1;
        }
        return api.sendMessage(getText("approveSuccess", count), threadID, messageID);
    }
}

module.exports.run = async function({ api, event, getText }) {
        const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;

    try {
                var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
                var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
        } catch (e) { return api.sendMessage(getText("cantGetPendingList"), threadID, messageID) }

        const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `✰ ${index++}\n ${single.name}\n (${single.threadID})\n━━━━━━━━━━━━━━━\n`;

    if (list.length != 0) return api.sendMessage(getText("returnListPending", list.length, msg), threadID, (error, info) => {
                global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
        }, messageID);
    else return api.sendMessage(getText("returnListClean"), threadID, messageID);
}