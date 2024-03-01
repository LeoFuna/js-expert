const { once } = require('events');
const http = require('http');

const USER_FROM_DB = {
  username: 'LeoFuna',
  password: 'secret'
}

const routes = {
  '/contact:get': (req, res) => {
    res.write('contact page')
    return res.end()
  },
  '/login:post': async (req, res) => {
    // Esse data é um BUFFER!!
    const data = await once(req, 'data');

    const parsedData = JSON.parse(data);
    if (
      parsedData?.username.toLowerCase() !== USER_FROM_DB.username.toLowerCase() 
      || parsedData?.password !== USER_FROM_DB.password
    ) {
      res.writeHead(401);
      res.write('Login failed!');
      return res.end();
    }

    res.write('Success login!')
    return res.end()
  },
  default: (req, res) => {
    res.writeHead(404)
    return res.end('Page Not Found')
  }
}

function handler(req, res) {
  const { url, method } = req;
  const routeKey = `${url}:${method.toLowerCase()}`;
  
  const routeChosen = routes[routeKey] || routes.default;

  return routeChosen(req, res);
}

const app = http.createServer(handler)
  .listen(3000, () => console.log('Server running at port 3000'));

module.exports = app;