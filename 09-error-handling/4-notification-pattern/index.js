import Http from 'http';
import httpStatusCodes from './util/httpStatusCodes.js';
import HeroEntity from './heroEntity.js';

const handler = async (req, res) => {
    for await (const data of req) {
        try {
            const parsedData = JSON.parse(data);
            // Simulando um outro erro, por exemplo, de banco de dados
            if (Reflect.has(parsedData, 'connectionError')) throw new Error('connection error to DB');
            const hero = new HeroEntity(parsedData);
            if (!hero.isValid()) {
                res.writeHead(httpStatusCodes.BAD_REQUEST);
                res.end(hero.notifications.join('\n'));
                continue;
            };

            res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
            res.end()
        } catch (error) {
            res.writeHead(httpStatusCodes.INTERNAL_SERVER_ERROR);
            res.end();
        }
    }
}

Http.createServer(handler)
    .listen(3000, () => console.log('Server is running on port 3000'));

/*
curl -i -X POST http://localhost:3000 -d '{"name": "John", "age": 80}' -H 'Content-Type: application/json'
*/