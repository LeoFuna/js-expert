import { createServer } from 'http';
import { appendFile } from 'fs/promises';

export function initializeServer() {
    async function handler(req, res) {
        await appendFile('logs.txt', `processed by ${process.pid}\n`);
        const result = Array.from({ length: 1e3 }, _ => Math.floor(Math.random() * 40))
            .reduce((acc, curr) => acc + curr, 0);
    
        res.end(result.toString());
    }
    
    createServer(handler)
        .listen(3000, () => console.log(`Server is running on port 3000 and pid ${process.pid}`));

    const INTERNAL_OS_ERROR = 1; 
    setTimeout(() => process.exit(INTERNAL_OS_ERROR), Math.random() * 1e4);
}
