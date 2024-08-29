import { PassThrough, Writable } from 'stream';
import axios from "axios";
const API_01 = 'http://localhost:3000';
const API_02 = 'http://localhost:3001';

const request = await Promise.all([
    axios({
        method: 'get',
        url: API_01,
        responseType: 'stream'
    }),
    axios({
        method: 'get',
        url: API_02,
        responseType: 'stream'
    })
]);

const result = request.map(({ data }) => data);

const output = new Writable({
    write(chunk, encoding, callback) {
        const data = chunk.toString().replace(/\n/g, '');
        // ?=- -> ele faz procurar a partir do - e olhar para traz
        // :"(?<name>.*) -> procura pelo conteudo dentro das aspas apos o : e extrai somente o name (grouped names)
        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
        console.log(`[${name.toLowerCase()}] ${data}`);
        callback();
    }
})

function merge(streams) {
    return streams.reduce((prev, curr, index, items) => {
        // end FALSE implede que a stream feche sozinha
        curr.pipe(prev, { end: false });
        // como colocamos end: false, temos que fazer o controle manual de quando o nosso current terminar.
        curr.on('end', () => items.every(stream => stream.ended) && prev.end());
        return prev;
    }, new PassThrough());
}

merge(result).pipe(output);

// result[0].pipe(output)
// result[1].pipe(output)
