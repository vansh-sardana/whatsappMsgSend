const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const wwebVersion = '2.2407.3';
const client = new Client({
    authStrategy: new LocalAuth(), // your authstrategy here
    puppeteer: {},
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    },
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.initialize();

async function sendMsg(lat, lng) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const number = '917011263403';
    const chatId = number + '@c.us';
    await client.sendMessage(chatId, 
`EMERGENCY ALERT!
Fall Detected!
A fall has been detected.
Last Known Location: https://maps.google.com?q=${lat},${lng}
Please check on the person as soon as possible`);
}

const app = express();
app.use(express.json());

app.get('/send-message', (req, res) => {
    const { lat, lng } = req.body.params;
    if (lat && lng) {
        sendMsg(lat, lng)
            .then(() => {
                res.status(200).send('Message sent successfully.');
            })
            .catch(err => {
                console.error('Error sending message:', err);
                res.status(500).send('Error sending message.');
            });
    } else {
        res.status(400).send('Latitude and longitude must be provided.');
    }
});

app.get('/', (req, res)=>{
    res.send("Hi");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
