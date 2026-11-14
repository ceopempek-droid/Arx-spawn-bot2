const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

const CHANNEL_ID = '0029VbDqsVe59PwYb3g5hP3K@newsletter';
const NOMOR_KAU = '6283178162622';

const chromePath = ['/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable'].find(p => fs.existsSync(p));

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        executablePath: chromePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process']
    }
});

// INI KUNCINYO! KALO ADO KODE, LANGSUNG TAMPILIN, DAK USAH QR!
client.on('code', (code) => {
    console.log('====================');
    console.log('KODE PAIRING KAU: ' + code);
    console.log('====================');
    console.log('CARA PAKAI: Buka WA > Perangkat Tertaut > Tautkan dengan Nomor Telepon > Masukin kode ini!');
});

client.on('ready', async () => {
    console.log('BOT UDAH IDUP!');
    try {
        await client.sendMessage(CHANNEL_ID, '🔥 ARX SQUAD BOT ONLINE! 🔥');
    } catch (e) {}
});

client.initialize().then(async () => {
    // Minta kode pairing, jangan QR
    setTimeout(async () => {
        try {
            const code = await client.requestPairingCode(NOMOR_KAU);
            console.log('====================');
            console.log('KODE PAIRING KAU: ' + code);
            console.log('====================');
        } catch (e) {
            console.log('Gagal pairing: ' + e.message);
        }
    }, 3000);
});
