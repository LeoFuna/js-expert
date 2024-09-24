import { createServer } from 'http';
import { randomUUID } from 'crypto';
import { pipeline } from 'stream/promises';
import { createWriteStream } from 'fs';

async function handler(req, res) {
    const fileName = `file-${randomUUID()}.csv`;
    await pipeline(
        req,
        createWriteStream(fileName),
    );
    res.end(`File uploaded successfully`)
}
createServer(handler).listen(3000, () => {
  console.log('Server running on port 3000');
});