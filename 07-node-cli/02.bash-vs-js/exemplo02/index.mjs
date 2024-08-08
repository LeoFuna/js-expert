// (?<containerId>\w+)\W+(?=nginx)
$.verbose = false

import { setTimeout } from 'timers/promises'
await $`docker run -p 8080:80 -d nginx`;
await setTimeout(500);
const res = await $`curl --silent localhost:8080`;
console.log(`res\n`, res.stdout);

const containers = await $`docker ps`;

const exp = /(?<containerId>\w+)\W+(?=nginx)/;

const { groups: {containerId} } = containers.toString().match(exp);
console.log(`containerId: `, containerId);

const logs = await $`docker logs ${containerId}`;
console.log(`logs\n`, logs.stdout);

const rm = await $`docker rm -f ${containerId}`;
console.log(`rm -f\n`, rm.stdout);