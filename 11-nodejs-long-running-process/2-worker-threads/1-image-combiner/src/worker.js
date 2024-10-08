import { parentPort } from 'worker_threads';
import sharp from 'sharp';
import axios from 'axios';

async function downloadFile(url) {
    const response = await axios.get(url, {
        responseType: 'arraybuffer'
    });
    return response.data;
}

async function onMessage({ img, background }) {
    const firstLayer = await sharp(await downloadFile(img)).toBuffer();

    const secondLayer = await sharp(await downloadFile(background))
        .composite([
            { input: firstLayer, gravity: sharp.gravity.south },
            { input: firstLayer, gravity: sharp.gravity.east }
        ])
        .toBuffer();

    parentPort.postMessage(secondLayer.toString('base64'));
}

parentPort.on('message', onMessage)