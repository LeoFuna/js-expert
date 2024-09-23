import { createServer } from 'http';

import Events from 'events';

const myEvent = new Events();

function onData() {
    const data = [];
    setInterval(function myInvertal() { data.push('data')});
}

createServer(function handler(req, res) {
    myEvent.on('data', onData);

    myEvent.emit('data', Date.now());
    res.end('ok');
}).listen(3000, () => console.log('Server running on http://localhost:3000'));