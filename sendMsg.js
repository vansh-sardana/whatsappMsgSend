const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', qr => {
    console.log('QR code received');
    // Display QR code for user to scan
});

client.on('ready', () => {
    console.log('Client is ready!');
    sendMessage();
});

client.on('message', message => {
    console.log(`Received message: ${message.body}`);
});

client.initialize();

async function sendMessage() {
    const chatId = 'recipientPhoneNumber@c.us'; // Replace with recipient's phone number
    const message = 'Hello, this is a test message!'; // Replace with your message

    await client.sendMessage(chatId, message)
        .then(() => {
            console.log('Message sent successfully');
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}
