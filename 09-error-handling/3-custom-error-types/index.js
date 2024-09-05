import Http from 'http';
import BusinessError from './errors/businessError.js';
import httpStatusCodes from './util/httpStatusCodes.js';

function validateHero(hero) {
    if (hero.age < 20) throw new BusinessError("age must be higher than 20");
    if (hero.name?.length < 4) throw new BusinessError("name must have at least 4 characters");

    //simulando um outor erro, por exemplo, um erro de banco de dados
    if (Reflect.has(hero, 'connectionError')) throw new Error('connection error to DB');
}

const handler = async (req, res) => {
    for await (const data of req) {
        try {
            const hero = JSON.parse(data);
            validateHero(hero);
            res.writeHead(httpStatusCodes.OK, { 'Content-Type': 'application/json' });
            res.end()
        } catch (error) {
            if (error instanceof BusinessError) {
                res.writeHead(httpStatusCodes.BAD_REQUEST);
                res.end(error.message);
                continue;
            }
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