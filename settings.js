// ====================================================
//         يامي بوت - إعدادات النظام الرئيسية
//   Yami Bot - Main Configuration File
// ====================================================

const settings = {
  // ===== معلومات البوت =====
  botName: "𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸",
  botNameAr: "يامي بوت",
  version: "3.0.0",
  prefix: ".",

  // ===== أرقام المالك والمطور =====
  ownerNumber: "967716229780",          // رقم صاحب البوت
  ownerName: "صاحب البوت",
  devNumber: "201116282235",            // رقم المطور
  devName: "𝑴𝒂𝒏𝒖𝒔 𝑫𝒆𝒗",

  // ===== إعدادات عامة =====
  commandMode: "public",                // public | private
  language: "ar",
  timezone: "Asia/Aden",

  // ===== إعدادات الحماية =====
  antiSpam: true,
  antiLink: false,
  antiBadWords: false,
  antiBot: true,
  antiCall: true,                       // رفض المكالمات تلقائياً
  antiCallKick: true,                   // طرد من يتصل

  // ===== إعدادات الترحيب =====
  welcomeMsg: true,
  goodbyeMsg: true,

  // ===== إعدادات الذكاء الاصطناعي =====
  aiEnabled: true,
  aiTrigger: ["يامي", "yami", "بوت"],  // كلمات تشغيل الذكاء الاصطناعي

  // ===== حدود الإرسال =====
  spamMsgLimit: 5,
  spamTimeWindow: 10000,
  spamCooldown: 30000,

  // ===== رسائل النظام =====
  notAdminMsg: "❌ هذا الأمر للمشرفين فقط!",
  notOwnerMsg: "❌ هذا الأمر لصاحب البوت فقط!",
  notGroupMsg: "❌ هذا الأمر يعمل في المجموعات فقط!",
  errorMsg: "⚠️ حدث خطأ، حاول مرة أخرى.",

  // ===== وصف البوت =====
  description: `
╔══════════════════════╗
║   𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸 v3.0.0   ║
╚══════════════════════╝
بوت واتساب متكامل مزود بالذكاء الاصطناعي
يحتوي على أكثر من 600 أمر متنوع
  `.trim(),

  // ===== مفاتيح API =====
  openaiKey: process.env.OPENAI_API_KEY || "",
  giphyKey: "qnl7ssQChTdPjsKta2Ax2LMaGXz303tq",
};

module.exports = settings;
