// ====================================================
//   𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸 - أوامر الحماية
// ====================================================

const { loadGroupSettings, saveGroupSettings } = require('./group_events');

const commands = {};
function addCmd(names, config) { names.forEach(name => { commands[name] = config; }); }

// ===== 1. حماية الروابط =====
addCmd(['منع_الروابط', 'قفل_الروابط', 'antilink'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, message, body } = ctx;
    const gs = loadGroupSettings();
    if (!gs[chatId]) gs[chatId] = {};
    
    const state = body === 'تشغيل' || body === 'on' ? true : body === 'ايقاف' || body === 'off' ? false : null;
    if (state === null) return sock.sendMessage(chatId, { text: '📌 اكتب (تشغيل/ايقاف) بعد الأمر.\nمثال: .منع_الروابط تشغيل' }, { quoted: message });
    
    gs[chatId].antiLink = state;
    saveGroupSettings(gs);
    await sock.sendMessage(chatId, { text: `🛡️ تم ${state ? 'تفعيل' : 'إيقاف'} حماية الروابط بنجاح!` }, { quoted: message });
  }
});

// ===== 2. حماية السبام =====
addCmd(['منع_السبام', 'قفل_السبام', 'antispam'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, message, body } = ctx;
    const gs = loadGroupSettings();
    if (!gs[chatId]) gs[chatId] = {};
    
    const state = body === 'تشغيل' || body === 'on' ? true : body === 'ايقاف' || body === 'off' ? false : null;
    if (state === null) return sock.sendMessage(chatId, { text: '📌 اكتب (تشغيل/ايقاف) بعد الأمر.\nمثال: .منع_السبام تشغيل' }, { quoted: message });
    
    gs[chatId].antiSpam = state;
    saveGroupSettings(gs);
    await sock.sendMessage(chatId, { text: `🛡️ تم ${state ? 'تفعيل' : 'إيقاف'} حماية التكرار (السبام) بنجاح!` }, { quoted: message });
  }
});

// ===== 3. الترحيب والتوديع =====
addCmd(['ترحيب', 'تفعيل_الترحيب', 'welcome'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, message, body } = ctx;
    const gs = loadGroupSettings();
    if (!gs[chatId]) gs[chatId] = {};
    
    const state = body === 'تشغيل' || body === 'on' ? true : body === 'ايقاف' || body === 'off' ? false : null;
    if (state === null) return sock.sendMessage(chatId, { text: '📌 اكتب (تشغيل/ايقاف) بعد الأمر.\nمثال: .ترحيب تشغيل' }, { quoted: message });
    
    gs[chatId].welcome = state;
    saveGroupSettings(gs);
    await sock.sendMessage(chatId, { text: `🌸 تم ${state ? 'تفعيل' : 'إيقاف'} رسائل الترحيب بنجاح!` }, { quoted: message });
  }
});

addCmd(['مغادرة', 'تفعيل_المغادرة', 'goodbye'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, message, body } = ctx;
    const gs = loadGroupSettings();
    if (!gs[chatId]) gs[chatId] = {};
    
    const state = body === 'تشغيل' || body === 'on' ? true : body === 'ايقاف' || body === 'off' ? false : null;
    if (state === null) return sock.sendMessage(chatId, { text: '📌 اكتب (تشغيل/ايقاف) بعد الأمر.\nمثال: .مغادرة تشغيل' }, { quoted: message });
    
    gs[chatId].goodbye = state;
    saveGroupSettings(gs);
    await sock.sendMessage(chatId, { text: `🌸 تم ${state ? 'تفعيل' : 'إيقاف'} رسائل المغادرة بنجاح!` }, { quoted: message });
  }
});

module.exports = { commands };
