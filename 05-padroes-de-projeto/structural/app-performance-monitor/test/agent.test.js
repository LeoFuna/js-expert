import debug from 'debug';
const log = debug('agent:test');

import { Server } from 'http'
import assert from 'node:assert';
import nodeTest from 'node:test';
import { start as InjectMiddleware } from '../agent/agent.js';
import { resolve } from 'path';
import { readdir } from 'fs/promises';

const tracker = nodeTest.mock.fn();

const eventName = 'request';

const database = [{
    "id": 1,
    "name": "joaozinho",
    "paidIn": "USD",
    "speaks": ["fr", "pt-br"]
}];

const user = database[0];
const request = {
    headers: {
        'x-app-id': user.id
    }
}

const response = {
    setHeader: tracker,
    on(m, cb) { cb() }
}
// TO DO: https://medium.com/@erickwendel/node-v14-x-is-up-deep-diving-into-new-features-ace6dd89ac0b
InjectMiddleware(database);
const serverInstance = new Server();

{
    const expectedCallCount = 1;

    serverInstance.emit(eventName, request, response);

    log('user', JSON.stringify(request.user));

    assert.ok(request.user.requestId);
    assert.deepEqual(request.user.name, user.name);
    assert.deepEqual(tracker.mock.calls.length, expectedCallCount);
}

{
    const reportsFolder = `${resolve()}/reports`
    const dirBefore = await readdir(reportsFolder)

    const { headers, user, ...requestData } = request
    const messageError = "Cannot read property 'x-app-id' of undefined"

    process.on('uncaughtException', async (err) => {
        if (!(!!~err.message.indexOf(messageError))) {
            return log(err);
        }
        const dirAfter = await readdir(reportsFolder) 
        assert.notEqual(dirBefore.length, dirAfter.length) 
    });
    serverInstance.emit(eventName, requestData, response)
}

process.on('exit', () => tracker.verify());