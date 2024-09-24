import os from 'os';
import cluster from 'cluster';
import { initializeServer } from './server.js';

(() => {
    // Se nao for o processo Main, o orquestrador pode criar novas cópias
    if (!cluster.isPrimary) {
        initializeServer()
        return;
    }
    const cpusNumber = os.cpus().length;
    console.log(`Primary ${process.pid} is running`);
    console.log(`Forking server for ${cpusNumber} CPUs`);

    for (let index = 0; index < cpusNumber; index++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        const FINISHED_SUCCESSFULLY = 0;
        if (code !== FINISHED_SUCCESSFULLY && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.process.pid} crashed`);
            cluster.fork();
            return;
        }
    });
})()