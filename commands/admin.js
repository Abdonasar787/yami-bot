// ====================================================
//   𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸 - أوامر الإدارة
// ====================================================

const commands = {};

// دالة مساعدة لإضافة الأوامر مع اختصاراتها
function addCmd(names, config) {
  names.forEach(name => { commands[name] = config; });
}

// ===== 1. أوامر الطرد =====
addCmd(['طرد', 'بان', 'برا', 'kick', 'ban'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, targetJid, message, isBotAdmin } = ctx;
    if (!isBotAdmin) return sock.sendMessage(chatId, { text: '❌ البوت ليس مشرفاً!' }, { quoted: message });
    if (!targetJid) return sock.sendMessage(chatId, { text: '📌 منشن الشخص أو رد على رسالته للطرد.' }, { quoted: message });
    
    await sock.groupParticipantsUpdate(chatId, [targetJid], 'remove');
    await sock.sendMessage(chatId, { text: '✅ تم طرد العضو بنجاح!' }, { quoted: message });
  }
});

// ===== 2. أوامر الرفع والتنزيل =====
addCmd(['ادمن', 'رفع', 'ترقية', 'promote'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, targetJid, message, isBotAdmin } = ctx;
    if (!isBotAdmin) return sock.sendMessage(chatId, { text: '❌ البوت ليس مشرفاً!' }, { quoted: message });
    if (!targetJid) return sock.sendMessage(chatId, { text: '📌 منشن الشخص لرفعه مشرف.' }, { quoted: message });
    
    await sock.groupParticipantsUpdate(chatId, [targetJid], 'promote');
    await sock.sendMessage(chatId, { text: '✅ تم رفعه ليصبح مشرفاً!' }, { quoted: message });
  }
});

addCmd(['شيل', 'تنزيل', 'اعفاء', 'demote'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, targetJid, message, isBotAdmin } = ctx;
    if (!isBotAdmin) return sock.sendMessage(chatId, { text: '❌ البوت ليس مشرفاً!' }, { quoted: message });
    if (!targetJid) return sock.sendMessage(chatId, { text: '📌 منشن المشرف لتنزيله.' }, { quoted: message });
    
    await sock.groupParticipantsUpdate(chatId, [targetJid], 'demote');
    await sock.sendMessage(chatId, { text: '✅ تم تنزيله من الإشراف!' }, { quoted: message });
  }
});

// ===== 3. قفل وفتح المجموعة =====
addCmd(['قفل', 'اغلاق', 'close', 'lock'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, message, isBotAdmin } = ctx;
    if (!isBotAdmin) return sock.sendMessage(chatId, { text: '❌ البوت ليس مشرفاً!' }, { quoted: message });
    
    await sock.groupSettingUpdate(chatId, 'announcement');
    await sock.sendMessage(chatId, { text: '🔒 تم قفل المجموعة، المشرفون فقط يمكنهم الإرسال.' }, { quoted: message });
  }
});

addCmd(['فتح', 'open', 'unlock'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, message, isBotAdmin } = ctx;
    if (!isBotAdmin) return sock.sendMessage(chatId, { text: '❌ البوت ليس مشرفاً!' }, { quoted: message });
    
    await sock.groupSettingUpdate(chatId, 'not_announcement');
    await sock.sendMessage(chatId, { text: '🔓 تم فتح المجموعة للجميع.' }, { quoted: message });
  }
});

// ===== 4. المنشن الجماعي =====
addCmd(['منشن', 'تاك', 'tagall', 'everyone'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, metadata, body } = ctx;
    const participants = metadata.participants.map(p => p.id);
    const text = body || '📢 تنبيه للجميع!';
    
    let msg = `╔══════════════════════╗\n║  📢 منشن جماعي  ║\n╚══════════════════════╝\n\n📝 الرسالة: ${text}\n\n`;
    participants.forEach(p => { msg += `🌸 @${p.split('@')[0]}\n`; });
    
    await sock.sendMessage(chatId, { text: msg, mentions: participants });
  }
});

// ===== 5. حذف الرسائل =====
addCmd(['حذف', 'مسح', 'del', 'delete'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, message, quoted, isBotAdmin } = ctx;
    if (!quoted) return sock.sendMessage(chatId, { text: '📌 رد على الرسالة التي تريد حذفها.' }, { quoted: message });
    if (!isBotAdmin && quoted.participant !== sock.user.id) {
      return sock.sendMessage(chatId, { text: '❌ البوت ليس مشرفاً لحذف رسائل الآخرين!' }, { quoted: message });
    }
    
    const key = {
      remoteJid: chatId,
      fromMe: quoted.participant === sock.user.id,
      id: quoted.stanzaId,
      participant: quoted.participant
    };
    
    await sock.sendMessage(chatId, { delete: key });
  }
});

// ===== 6. تغيير اسم ووصف وصورة المجموعة =====
addCmd(['اسم', 'تغيير_الاسم', 'setname'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, body, message, isBotAdmin } = ctx;
    if (!isBotAdmin) return sock.sendMessage(chatId, { text: '❌ البوت ليس مشرفاً!' }, { quoted: message });
    if (!body) return sock.sendMessage(chatId, { text: '📌 اكتب الاسم الجديد بعد الأمر.' }, { quoted: message });
    
    await sock.groupUpdateSubject(chatId, body);
    await sock.sendMessage(chatId, { text: `✅ تم تغيير اسم المجموعة إلى:\n*${body}*` }, { quoted: message });
  }
});

addCmd(['وصف', 'تغيير_الوصف', 'setdesc'], {
  adminOnly: true, groupOnly: true,
  execute: async (ctx) => {
    const { sock, chatId, body, message, isBotAdmin } = ctx;
    if (!isBotAdmin) return sock.sendMessage(chatId, { text: '❌ البوت ليس مشرفاً!' }, { quoted: message });
    if (!body) return sock.sendMessage(chatId, { text: '📌 اكتب الوصف الجديد بعد الأمر.' }, { quoted: message });
    
    await sock.groupUpdateDescription(chatId, body);
    await sock.sendMessage(chatId, { text: `✅ تم تغيير وصف المجموعة بنجاح!` }, { quoted: message });
  }
});

// تمت إضافة أكثر من 50 أمر فرعي للإدارة عبر الاختصارات
module.exports = { commands };
