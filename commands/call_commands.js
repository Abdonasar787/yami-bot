// ====================================================
//   𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸 - أوامر الكال (المكالمات)
// ====================================================

const commands = {};
function addCmd(names, config) { names.forEach(name => { commands[name] = config; }); }

// ===== 1. طرد الكال (طرد شخص من المجموعة بسبب المكالمة) =====
addCmd(['طرد_الكال', 'طرد_مكالمة', 'kickcall'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, targetJid, message, isBotAdmin } = ctx;
    if (!isBotAdmin) return sock.sendMessage(chatId, { text: '❌ البوت ليس مشرفاً!' }, { quoted: message });
    if (!targetJid) return sock.sendMessage(chatId, { text: '📌 منشن الشخص الذي اتصل ليتم طرده.' }, { quoted: message });
    
    await sock.sendMessage(chatId, { text: '📞 تم رصد مكالمة مخالفة... جاري الطرد! 🚫' });
    setTimeout(async () => {
      await sock.groupParticipantsUpdate(chatId, [targetJid], 'remove');
      await sock.sendMessage(chatId, { text: '✅ تم طرد المخالف بنجاح!' });
    }, 1000);
  }
});

// ===== 2. منشن الكال (تنبيه لدخول المكالمة) =====
addCmd(['كال', 'مكالمة', 'call', 'تجمع'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, metadata, body } = ctx;
    const participants = metadata.participants.map(p => p.id);
    const text = body || '📞 مكالمة جماعية الآن! الكل يدخل بسرعة 🏃‍♂️💨';
    
    let msg = `╔══════════════════════╗\n║  📞 نداء مكالمة جماعية  ║\n╚══════════════════════╝\n\n📝 ${text}\n\n`;
    participants.forEach(p => { msg += `🌸 @${p.split('@')[0]}\n`; });
    
    await sock.sendMessage(chatId, { text: msg, mentions: participants });
  }
});

// ===== 3. إعدادات رفض المكالمات التلقائي =====
addCmd(['قفل_الكال', 'منع_المكالمات', 'anticall'], {
  ownerOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, message, body, settings } = ctx;
    const state = body === 'تشغيل' || body === 'on' ? true : body === 'ايقاف' || body === 'off' ? false : null;
    if (state === null) return sock.sendMessage(chatId, { text: '📌 اكتب (تشغيل/ايقاف) بعد الأمر.\nمثال: .قفل_الكال تشغيل' }, { quoted: message });
    
    settings.antiCall = state;
    await sock.sendMessage(chatId, { text: `📞 تم ${state ? 'تفعيل' : 'إيقاف'} الرفض التلقائي للمكالمات!` }, { quoted: message });
  }
});

module.exports = { commands };
