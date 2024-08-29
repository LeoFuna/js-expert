import axios from "axios";
import { pipeline } from 'stream/promises';
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

// PassThrough stream
async function* mergeApis(streams) {
    for await (const stream of streams) {
        // faz com que o stream seja interpretado como uma string diretamente
        stream.setEncoding('utf-8');
        for await (const chunk of stream) {
            const arrayOflines = chunk.trim().split('\n');
            for (const line of arrayOflines) {
                yield line;
            }
        }
    }
}

// Transform stream
async function* serializeStream(stream) {
    for await (const chunk of stream) {
        const data = chunk;
        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;

        yield `[${name.toLowerCase()}]: ${data}`;
    }
}

// Writable stream
async function* sendData(stream) {
    for await (const chunk of stream) {
        console.log(chunk)
    }
}

const result = request.map(({ data }) => data);

await pipeline(
    mergeApis(result),
    serializeStream,
    sendData,
)
