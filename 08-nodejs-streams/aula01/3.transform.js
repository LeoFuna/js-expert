import { Readable, Transform, Writable } from 'stream';
import { createWriteStream } from 'fs';

// Fonte de Dados
const readable = Readable({
    read() {
        for (let index = 0; index < 2; index++) {
            const person = { id: Date.now() + index, name: `Person-${index}` };
            const data = JSON.stringify(person);
            this.push(data)
        }
        // Ele informa que os dados acabaram!!
        this.push(null);
    }
})

// Processamento dos Dados
const mapFields = Transform({
    transform(chunk, encoding, cb) {
        const data = JSON.parse(chunk);
        const result = `${data.id} - ${data.name.toUpperCase()}\n`;
        cb(null, result);
    }
})
const mapHeaders = Transform({
    transform(chunk, encoding, cb) {
        this.counter = this.counter ?? 0;
        if (this.counter) {
            return cb(null, chunk);
        }
        this.counter++;
        cb(null, "id,name\n".concat(chunk));
    }
})

// Saida de dados
const writable = Writable({
    write(chunk, encoding, cb) {
        console.log(chunk.toString());
        // Callback para informar que terminou de processar, necessário nesse caso
        cb();
    }
})

const pipeline = readable
    .pipe(mapFields)
    .pipe(mapHeaders)
    // o writable é sempre a saida -> imprimir, salvar, ignorar
    // .pipe(writable);
    .pipe(createWriteStream('my.csv'))

pipeline.on('end', () => console.log('Pipeline terminou'))