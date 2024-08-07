// curl "localhost:3000?salary=3000&discount=15"
// REPL: Read, Eval, Print, Loop
import http from 'http';

function netSalary({ discount, salary }) {
    const percent = discount / 100;
    const cost = salary * percent;
    return salary - cost;
}

http.createServer((req, res) => {
    const url = req.url.replace('/', '');
    const params = new URLSearchParams(url);
    const data = Object.fromEntries(params);
    const result = netSalary(data)
    debugger
    res.end(`O seu salário final é: ${result}`);
}).listen(3000, () => console.log('Server is running on port 3000'));