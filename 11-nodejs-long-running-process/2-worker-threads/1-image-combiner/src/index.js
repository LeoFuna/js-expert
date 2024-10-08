import { createServer } from 'http';
import { parse, fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
// necessário de acordo com a documentação do sharp
import sharp from 'sharp';

import { dirname } from 'path'

const currentFolder = dirname(fileURLToPath(import.meta.url));
const workerFileName = `worker.js`;

async function joinImages(images) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`${currentFolder}/${workerFileName}`);
        worker.postMessage(images);
        worker.on('message', (message) => {
            resolve(message);
        })
        worker.on('error', (error) => {
            reject(error);
        })
        worker.once('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Thread ${worker.threadId} stopped with exit code ${code}`));
            }
        })
    })
}

async function handler(request, response) {
    if (request.url.includes('joinImages')) {
        const { query: { background, img } } = parse(request.url, true);
        const result = await joinImages({ background, img });
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(`<img style="width:100dvw;height:100dvh" src="data:image/jpeg;base64,${result}" />`);
        return;
    }
    return response.end('ok');
}

createServer(handler).listen(3000, () => {
    console.log('Server is running');
})