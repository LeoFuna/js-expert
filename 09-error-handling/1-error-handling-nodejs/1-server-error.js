import Http from 'http';

// Até no NODE 16 o erro dentro do for await não era capturado no catch do handler
// sendo necessário um try catch dentro do for await
// Entretanto testando no NODE 18 o erro dentro do for await é capturado no catch do handler

let cont = 0;
async function handler(req, res) {
    cont ++;
    try {
        if (cont % 2 === 0) {
            await Promise.reject('Erro dentro do handler')
        }
        for await (const data of req) {
            try {
                if (cont % 2 !== 0) {
                    await Promise.reject('Erro dentro do loop');
                }
                res.end();
            } catch (error) {
                console.log('A request error happened', error)
                res.writeHead(500);
                res.write(JSON.stringify({ message: 'internal server error' }));
                res.end();
            }
        }
    } catch(error) {
        console.log('A server error happened', error);
        res.writeHead(500);
        res.write(JSON.stringify({ message: 'internal server error' }));
        res.end();
    } 
}

Http.createServer(handler).listen(3000, () => console.log('Server started at http://localhost:3000'));