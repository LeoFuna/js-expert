import { Duplex, Transform } from 'stream'

let count = 0
const server = new Duplex({
    objectMode: true, // faz nao precisar trabalhar com buffer, mas gasta mais memoria
    encoding: 'utf-8',
    read() {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`My name is Leo[${count}]`)
                return;
            }
            clearInterval(intervalContext);
            this.push(null);
        }
        setInterval(function() { everySecond(this) });
    },
    // é como se fosse um objeto completamente diferente!!
    write(chunk, encoding, cb) {
        console.log(`[writable] saving`, chunk);
        cb()
    }
})

// server.pipe(process.stdout)

const transformToUpperCase = new Transform({
    objectMode: true,
    transform(chunk, encoding, cb) {
        cb(null, chunk.toUpperCase())
    }
});

// transform também é um duples, mas nao possuem comunucaçao independente
transformToUpperCase.write();
transformToUpperCase.push()

server
    .pipe(transformToUpperCase)
    // redireciona todos os dados de readable para writable da duplex
    .pipe(server)
    