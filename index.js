const express= require('express');
const { MessageMedia, Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const wwebVersion = '2.2407.3';
const client = new Client({
    authStrategy: new LocalAuth(), // your authstrategy here
    puppeteer: {
        
    },
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    },
});
client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});
// client initialization...

async function sendMsg(lat,lng) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    client.on('ready', async()=>{
        console.log("ready");
        const number = `917011263403`;
        const chatId = number + "@c.us";
        await client.sendMessage(chatId, `https://maps.google.com?q=${lat},${lng}`).then(()=>{
            console.log("sent")
        }).catch((e)=>{
            console.log(e);
        });
    })
}
client.initialize();

const app= express();
app.use(express.json());
app.listen(3000, ()=>{
    console.log("i am listening at port 3000");
});

app.post('/',(req, res)=>{
    console.log("POST req");
    sendMsg(req.params.lat, req.params.lng);
    res.status(200).json({
        success: true,
    })
})