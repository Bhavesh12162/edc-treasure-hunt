const QRCode = require('qrcode');
const fs = require('fs');

const BASE_URL = 'https://edc-treasure-hunt.vercel.app';

async function generate() {
  if (!fs.existsSync('./public/qrcodes')) {
    fs.mkdirSync('./public/qrcodes', { recursive: true });
  }

  for (let stage = 1; stage <= 12; stage++) {
    const url = `${BASE_URL}/scan/${stage}`;

    await QRCode.toFile(
      `./public/qrcodes/stage-${stage}.png`,
      url,
      { width: 500 }
    );

    console.log('Generated:', url);
  }
}

generate();