import { createReadStream } from 'fs';
import csvtojson from 'csvtojson';
import { pipeline } from 'stream/promises';
import { setTimeout } from 'timers/promises';

// O pai está enviando esse argumento no momento de criar o processo filho
const database = process.argv[2];

async function* TransformIntoLineByLine(stream) {
    for await (const chunk of stream) {
        const arrayOflines = chunk.toString().trim().split('\n');
        for (const line of arrayOflines) {
            yield line;
        }
    }
}

async function* informParentProcess(stream) {
    for await (const pokemonName of stream) {
        if (pokemonName) process.send(pokemonName);
    }
}


async function onMessage(msg) {
    const firstTimeRan = [];

    async function* checkIfNameAlreadyExists(stream) {
        for await (const chunk of stream) {
            const data = JSON.parse(chunk);
            if (data.Name !== msg.Name) continue;
            if (firstTimeRan.includes(msg.Name)) {
                yield msg.Name;
                continue;
            };
            firstTimeRan.push(msg.Name);
        }
    }

    await pipeline(
        createReadStream(database),
        csvtojson(),
        TransformIntoLineByLine,
        checkIfNameAlreadyExists,
        informParentProcess
    )
}

process.on('message', onMessage);

// console.log(`I'm ready ${process.pid}`);

// para falar que o subprocesso pode morrer apos inatividade
await setTimeout(5000);
process.channel.unref();