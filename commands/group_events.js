// ====================================================
//   𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸 - أحداث المجموعة (ترحيب / توديع)
// ====================================================

const settings = require('../settings');
const fs = require('fs');
const path = require('path');

// ===== قاعدة بيانات إعدادات المجموعات =====
const groupSettingsPath = path.join(__dirname, '..', 'data', 'group_settings.json');
function loadGroupSettings() {
  try {
    if (fs.existsSync(groupSettingsPath)) return JSON.parse(fs.readFileSync(groupSettingsPath, 'utf8'));
  } catch (e) {}
  return {};
}
function saveGroupSettings(data) {
  try {
    const dir = path.dirname(groupSettingsPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(groupSettingsPath, JSON.stringify(data, null, 2));
  } catch (e) {}
}

async function handleGroupUpdate(sock, update) {
  const { id: chatId, participants, action } = update;
  const groupSettings = loadGroupSettings();
  const gs = groupSettings[chatId] || {};

  let metadata;
  try { metadata = await sock.groupMetadata(chatId); } catch (e) { return; }

  const groupName = metadata.subject;
  const totalMembers = metadata.participants.length;

  for (const participant of participants) {
    const number = participant.split('@')[0];
    const mention = `@${number}`;

    // ===== رسالة الترحيب =====
    if (action === 'add' && (gs.welcome !== false) && settings.welcomeMsg) {
      const welcomeText =
        `╔══════════════════════╗\n` +
        `║  🌸 أهلاً وسهلاً! 🌸  ║\n` +
        `╚══════════════════════╝\n\n` +
        `👋 مرحباً ${mention}\n` +
        `في مجموعة *${groupName}*\n\n` +
        `👥 عدد الأعضاء الآن: *${totalMembers}*\n` +
        `📜 يرجى قراءة قوانين المجموعة\n` +
        `🤖 للمساعدة اكتب: *.اوامر*\n\n` +
        `_𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸_`;

      await sock.sendMessage(chatId, {
        text: welcomeText,
        mentions: [participant]
      });
    }

    // ===== رسالة الوداع =====
    if ((action === 'remove' || action === 'leave') && (gs.goodbye !== false) && settings.goodbyeMsg) {
      const goodbyeText =
        `╔══════════════════════╗\n` +
        `║  😢 وداعاً وإلى اللقاء  ║\n` +
        `╚══════════════════════╝\n\n` +
        `👋 وداعاً ${mention}\n` +
        `غادر مجموعة *${groupName}*\n\n` +
        `👥 عدد الأعضاء الآن: *${totalMembers}*\n\n` +
        `_𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸_`;

      await sock.sendMessage(chatId, {
        text: goodbyeText,
        mentions: [participant]
      });
    }

    // ===== إشعار المالك عند إضافة البوت =====
    const botId = sock.user?.id?.split(':')[0];
    if (action === 'add' && number === botId) {
      const ownerJid = settings.ownerNumber + '@s.whatsapp.net';
      await sock.sendMessage(ownerJid, {
        text: `🌸 *يامي بوت*\n\nتم إضافتي لمجموعة جديدة!\n📌 الاسم: ${groupName}\n👥 الأعضاء: ${totalMembers}`
      });
    }
  }
}

module.exports = { handleGroupUpdate, loadGroupSettings, saveGroupSettings };
