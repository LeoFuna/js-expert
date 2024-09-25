import { fork } from 'child_process';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import csvtojson from 'csvtojson';

const database =  './data/All_Pokemon.csv';
const PROCESS_COUNT = 10;
const replications = [];

const backgroundTaskFile = './src/backgroundTask.js';
const processes = new Map();
for(let index = 0; index < PROCESS_COUNT; index++) {
    const child = fork(backgroundTaskFile, [database]);
    child.on('exit', () => {
        console.log(`process ${child.pid} exited`);
        processes.delete(child.pid);
    })
    child.on('error', (error) => {
        console.error(`process ${child.pid} errored:`, error);
        process.exit(1);
    })

    child.on('message', (message) => {
        // workaround para multi processamento
        if (replications.includes(message)) return;
        replications.push(message);
        console.log(`${message} is replicated!`);
    })
    processes.set(child.pid, child);
}

function roundRobin(array, index=0) {
    return function(){
        if (index >= array.length) index=0;
        return array[index++];
    }
}

// Pool de conexoes, ou uma ideia de load balance
const getProcess = roundRobin([...processes.values()]);
console.log(`starting with ${processes.size} processes`);

async function* ChooseProcesToWork(stream) {
    for await (const chunk of stream) {
        const chosenProcess = getProcess();
        chosenProcess.send(JSON.parse(chunk));
    }
}

async function* TransformIntoLineByLine(stream) {
    for await (const chunk of stream) {
        const arrayOflines = chunk.toString().trim().split('\n');
        for (const line of arrayOflines) {
            yield line;
        }
    }
}

await pipeline(
    createReadStream(database),
    csvtojson(),
    TransformIntoLineByLine,
    ChooseProcesToWork
)
