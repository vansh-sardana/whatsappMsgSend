const express= require('express');
const { MessageMedia, Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const wwebVersion = '2.2407.3';
const client = new Client({
    authStrategy: new LocalAuth(), // your authstrategy here
    puppeteer: {
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    },
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    },
});
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', ()=>{
    console.log("Ready");
})

data=[['Vansh', 7011263403]];

const app= express();
app.use(express.json());
app.listen(3000, ()=>{
    console.log("i am listening at port 3000");
});

app.post('/',(req, res)=>{
    sendMsg(req.body.lat, req.body.lng);
    res.status(200);
})

async function sendMsg(lat, lng) {
    for (let i = 0; i < data.length; i++) {
        const number = `91${data[i][1]}`;
        const name = `${data[i][0]}`;
        const msg = `EMERGENCY ALERT!
        Fall Detected!
        A fall has been detected.
        Last Known Location: https://maps.google.com?q=${lat},${lng}
        Please check on the person as soon as possible`;

        const chatId = number + "@c.us";
        await client.sendMessage(chatId, msg)
            .then(() => {
                console.log(`Message sent to ${name}!`);
            })

            .catch(err => console.error(err));
    }
}

client.initialize();