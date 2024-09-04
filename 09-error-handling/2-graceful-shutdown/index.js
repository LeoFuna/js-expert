import { MongoClient } from "mongodb";
import Http from "http";
import { promisify } from 'util'

async function dbConnect() {
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('comics');

    return {
        collections: {
            heroes: db.collection('heroes'),
        },
        client
    }
}

const { collections, client } = await dbConnect();

async function handler(request, response) {
    for await (const data of request) {
        try {
            const hero = JSON.parse(data);
            await collections.heroes.insertOne({ updatedAt: new Date().toISOString(), ...hero });
            const heroes = await collections.heroes.find().toArray();

            response.writeHead(200);
            response.write(JSON.stringify(heroes));
        } catch (error) {
            console.log('a request error has happened');
            response.writeHead(500);
            response.write(JSON.stringify({ message: 'internal server error!' }));
        } finally {
            response.end();
        }
    }


}

// await client.close();

/*
    curl -i localhost:3000 -d '{"name": "Superman"}' -H "Content-Type: application/json"
*/

const server = Http.createServer(handler).listen(3000, () => console.log('Server is running on port 3000', process.pid));

// SIGINT => controle o CTRL + C para terminar o processo
process.on('SIGINT', async (e) => {
    console.info('SIGINT signal received.');

    console.log('Closing http server...');
    await promisify(server.close.bind(server))();
    console.log('Http server closed');

    await client.close();
    console.log('MongoDB connection closed');

    // Zero é tudo certo, 1 eh erro
    process.exit(0);
})

// SIGTERM => sinal de termino de processo quando uso o comando kill
process.on('SIGTERM', async (e) => {
    console.info('SIGTERM signal received.');
    process.exit(0);
})