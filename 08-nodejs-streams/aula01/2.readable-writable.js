import { Readable, Writable } from 'stream';

// Fonte de Dados
const readable = Readable({
    read() {
        this.push('Hello World');
        this.push('Hello World 2');

        // Ele informa que os dados acabaram!!
        this.push(null);
    }
})

// Saida de dados

const writable = Writable({
    write(chunk, encoding, cb) {
        console.log('msg', chunk.toString());
        // Callback para informar que terminou de processar, necessário nesse caso
        cb();
    }
})

readable
    // o writable é sempre a saida -> imprimir, salvar, ignorar
    .pipe(writable);