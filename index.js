const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const fs = require('fs');
const CHANNEL_ID = '0029VbDqsVe59PwYb3g5hP3K@newsletter';
const NOMOR_KAU = '6283178162622';
const app = express();
app.use(express.json());
const chromePath = ['/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable'].find(p => fs.existsSync(p));
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true, executablePath: chromePath, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process'] }
});
client.on('code', (code) => { console.log('KODE PAIRING KAU: ' + code); });
client.on('ready', () => console.log('BOT UDAH IDUP!'));
client.on('message', async (msg) => {
    if (msg.fromMe) return;
    const teks = msg.body.toLowerCase();
    if (teks === '!egg') { await msg.reply('🥚 *INFO SPAWN EGG* 🥚\n\nRESET TIAP 5 MENIT!\nEternal / Divine muncul ACAK!\nKetik *!update* buat info update!'); }
    else if (teks === '!update') { await msg.reply('🔥 *UPDATE STEAL AN EGG* 🔥\n\nALIEN UPDATE - 7 NOV 2026!\nBiome Alien, Crystal Egg, UFO Invasion!\nHALLOWEEN - Cursed Monarch!'); }
    else if (teks === '!menu') { await msg.reply('🔥 *ARX SQUAD BOT* 🔥\n\n*!egg* - Info Spawn\n*!update* - Info Update\n*!gas* - Semangat!'); }
    else if (teks === '!gas') { await msg.reply('GASSS CIO! 🔥🔥🔥'); }
});
app.post('/webhook/spawn', async (req, res) => {
    const { egg, rarity, biome, player } = req.body;
    const pesan = `🚨 *SPAWN AUTO TERDETEKSI!* 🚨\n\n🥚 *${egg}*\n⭐ Rarity: ${rarity}\n📍 Biome: ${biome}\n👤 Dilaporin: ${player || 'Auto Tracker'}\n\nGASSS CIO! 🔥`;
    try { await client.sendMessage(CHANNEL_ID, pesan); res.json({ sukses: true }); }
    catch (e) { await client.sendMessage(NOMOR_KAU + '@c.us', pesan); res.json({ sukses: true }); }
});
app.get('/', (req, res) => res.send('ARX BOT AUTO IDUP!'));
client.initialize().then(async () => {
    setTimeout(async () => {
        try { const code = await client.requestPairingCode(NOMOR_KAU); console.log('KODE PAIRING KAU: ' + code); } catch(e) {}
    }, 3000);
});
app.listen(3000, () => console.log('WEBHOOK IDUP DI PORT 3000'));
