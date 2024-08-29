import http from 'http';
import { Readable } from 'stream';

function api1(request, response) {
    let count = 0;
    const maxItems = 99;
    const readable = new Readable({
        read() {
            const everySecond = (interval) => {
                if (count++ <= maxItems) {
                    this.push(JSON.stringify({ id: Date.now() + count, name: `Leo-${count}` }) + "\n");
                    return;
                }
                clearInterval(interval);
                this.push(null);
            }
            setInterval(function() { everySecond(this) })
        }
    });
    // a response é uma writable stream
    readable.pipe(response);
}

function api2(request, response) {
    let count = 0;
    const maxItems = 99;
    const readable = new Readable({
        read() {
            const everySecond = (interval) => {
                if (count++ <= maxItems) {
                    this.push(JSON.stringify({ id: Date.now() + count, name: `Zezin-${count}` }) + "\n");
                    return;
                }
                clearInterval(interval);
                this.push(null);
            }
            setInterval(function() { everySecond(this) })
        }
    });
    // a response é uma writable stream
    readable.pipe(response);
}

// PS: para acessar pelo terminal use o comando: curl http://localhost:3000
// Lembrar do comando | tee arquivo.txt para salvar o resultado em um arquivo (isso é bom para se ter um histórico)
// curl http://localhost:3000 | tee arquivo.txt

http.createServer(api1).listen(3000, () => console.log('Server is running on port 3000'));
http.createServer(api2).listen(3001, () => console.log('Server is running on port 3001'));