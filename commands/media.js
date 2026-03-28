// ====================================================
//   𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸 - أوامر الوسائط والتحميل
// ====================================================

const commands = {};
function addCmd(names, config) { names.forEach(name => { commands[name] = config; }); }

// ===== 1. تحميل من يوتيوب =====
addCmd(['يوتيوب', 'yt', 'youtube'], {
  execute: async (ctx) => {
    const { sock, chatId, message, body } = ctx;
    if (!body) return sock.sendMessage(chatId, { text: '📌 ضع رابط يوتيوب بعد الأمر.' }, { quoted: message });
    
    await sock.sendMessage(chatId, { text: '⏳ جاري معالجة الرابط...' }, { quoted: message });
    // هنا يتم دمج مكتبة ytdl-core للتحميل
    await sock.sendMessage(chatId, { text: '✅ (محاكاة) تم تحميل الفيديو بنجاح!' }, { quoted: message });
  }
});

// ===== 2. تحميل من تيك توك =====
addCmd(['تيك', 'تيكتوك', 'tiktok', 'tt'], {
  execute: async (ctx) => {
    const { sock, chatId, message, body } = ctx;
    if (!body) return sock.sendMessage(chatId, { text: '📌 ضع رابط تيك توك بعد الأمر.' }, { quoted: message });
    
    await sock.sendMessage(chatId, { text: '⏳ جاري التحميل بدون علامة مائية...' }, { quoted: message });
    // هنا يتم دمج مكتبة tiktok-scraper
    await sock.sendMessage(chatId, { text: '✅ (محاكاة) تم تحميل فيديو تيك توك!' }, { quoted: message });
  }
});

// ===== 3. تحميل من انستغرام =====
addCmd(['انستا', 'انستغرام', 'ig', 'insta'], {
  execute: async (ctx) => {
    const { sock, chatId, message, body } = ctx;
    if (!body) return sock.sendMessage(chatId, { text: '📌 ضع رابط انستغرام بعد الأمر.' }, { quoted: message });
    
    await sock.sendMessage(chatId, { text: '⏳ جاري جلب المقطع...' }, { quoted: message });
    // هنا يتم دمج مكتبة instagram-url-direct
    await sock.sendMessage(chatId, { text: '✅ (محاكاة) تم تحميل فيديو انستغرام!' }, { quoted: message });
  }
});

// ===== 4. تحويل لملصق =====
addCmd(['ملصق', 'ستيكر', 'sticker', 's'], {
  execute: async (ctx) => {
    const { sock, chatId, message, msgType, quoted } = ctx;
    const isImage = msgType === 'imageMessage' || quoted?.imageMessage;
    
    if (!isImage) return sock.sendMessage(chatId, { text: '📌 قم بالرد على صورة لتحويلها إلى ملصق.' }, { quoted: message });
    
    await sock.sendMessage(chatId, { text: '⏳ جاري صنع الملصق...' }, { quoted: message });
    // هنا يتم استخدام مكتبة sharp أو ffmpeg للتحويل
    await sock.sendMessage(chatId, { text: '✅ (محاكاة) تم صنع الملصق!' }, { quoted: message });
  }
});

module.exports = { commands };
