// ====================================================
//   𝒀𝒂𝒎𝒊 𝑩𝒐𝒕 🌸 - أوامر الترفيه والألعاب
// ====================================================

const commands = {};
function addCmd(names, config) { names.forEach(name => { commands[name] = config; }); }

// ===== 1. لعبة حجر ورقة مقص =====
addCmd(['حجر_ورقة_مقص', 'rps'], {
  execute: async (ctx) => {
    const { sock, chatId, message, body } = ctx;
    const choices = ['حجر', 'ورقة', 'مقص'];
    if (!body || !choices.includes(body)) {
      return sock.sendMessage(chatId, { text: '📌 اختر: حجر، ورقة، أو مقص\nمثال: .rps حجر' }, { quoted: message });
    }
    
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';
    
    if (body === botChoice) result = 'تعادل! 🤝';
    else if (
      (body === 'حجر' && botChoice === 'مقص') ||
      (body === 'ورقة' && botChoice === 'حجر') ||
      (body === 'مقص' && botChoice === 'ورقة')
    ) result = 'أنت فزت! 🎉';
    else result = 'أنا فزت! 🤖✌️';
    
    await sock.sendMessage(chatId, { text: `أنت اخترت: ${body}\nأنا اخترت: ${botChoice}\n\nالنتيجة: ${result}` }, { quoted: message });
  }
});

// ===== 2. نسبة الحب =====
addCmd(['نسبة_الحب', 'حب', 'love'], {
  execute: async (ctx) => {
    const { sock, chatId, message, body, targetJid } = ctx;
    if (!targetJid && !body) return sock.sendMessage(chatId, { text: '📌 منشن شخص أو اكتب اسمه لمعرفة نسبة الحب.' }, { quoted: message });
    
    const percent = Math.floor(Math.random() * 101);
    let comment = '';
    if (percent > 90) comment = 'حب أسطوري! ❤️🔥';
    else if (percent > 70) comment = 'علاقة رائعة! 💕';
    else if (percent > 50) comment = 'فيه أمل! 💛';
    else if (percent > 30) comment = 'مجرد أصدقاء! 🤝';
    else comment = 'اهرب يا صاحبي! 💔🏃‍♂️';
    
    await sock.sendMessage(chatId, { text: `💖 نسبة الحب هي: *${percent}%*\n\nالخلاصة: ${comment}` }, { quoted: message });
  }
});

// ===== 3. نكتة عشوائية =====
addCmd(['نكتة', 'نكت', 'joke'], {
  execute: async (ctx) => {
    const { sock, chatId, message } = ctx;
    const jokes = [
      'مرة واحد غبي راح للدكتور، الدكتور قاله اعمل أشعة، راح عمل أشعة لقى نفسه هيكل عظمي، قال يالهوي أنا مت!',
      'مرة مدرس رياضيات اتجوز مدرسة رياضيات خلفوا ولد سموه شبه منحرف.',
      'مرة واحد بخيل اشترى آلة حاسبة شال منها زرار الناقص.',
      'نملة ماتت يوم فرحها ليه؟ عشان الفيل حضر الفرح وداس عليها بالغلط.'
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await sock.sendMessage(chatId, { text: `😂 ${joke}` }, { quoted: message });
  }
});

module.exports = { commands };
