const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({ authStrategy: new LocalAuth(), puppeteer: { 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process'] 
}
const CHANNEL_ID = '0029VbDqsVe59PwYb3g5hP3K@newsletter';
const NOMOR_KAU = '6283178162622';
client.on('qr', (qr) => { qrcode.generate(qr, { small: true }); });
client.on('ready', async () => { console.log('BOT UDAH IDUP!'); try { await client.sendMessage(CHANNEL_ID, `⚡🔥 ARX SQUAD BOT ONLINE! 🔥⚡`); } catch(e){} });
client.initialize().then(async () => { setTimeout(async () => { try { const code = await client.requestPairingCode(NOMOR_KAU); console.log('KODE PAIRING KAU: ' + code); } catch(e){} }, 5000); });
