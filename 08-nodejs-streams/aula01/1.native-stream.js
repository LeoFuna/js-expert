// process.stdin.pipe(process.stdout)
//     .on('data', msg => console.log('Mensagem: ', msg.toString()))
//     .on('error', err => console.log('Erro: ', err))
//     .on('end', () => console.log('Fim da mensagem'))
//     .on('close', () => console.log('Stream fechado'))

// Terminal 1 - cliente
// node -e "process.stdin.pipe(require('net').connect(1338))"

// Terminal 2 - servidor
// node -e "require('net').createServer(socket => {
//     socket.pipe(process.stdout)
// }).listen(1338)"

import http from 'http';
import { createReadStream, readFileSync } from 'fs';

http.createServer((req, res) => {
    // Má pratica - String muito grande na memória
    // const file = readFileSync('big.file').toString();
    // res.write(file);
    // res.end();
    createReadStream('big.file').pipe(res);
}).listen(3000, () => console.log('Servidor rodando na porta 3000'));

// curl localhost:3000 -o output.txt