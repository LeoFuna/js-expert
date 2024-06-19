import http from 'http';

async function InjectHttpInterceptor() {
    const oldEmit = http.Server.prototype.emit;
    http.Server.prototype.emit = function(...args) {
        const [type, req, res] = args;
        if (type === 'request') {
            res.setHeader('X-Instrumented-By', 'LeoFuna');
        }

        return oldEmit.apply(this, args);
    }
}

export { InjectHttpInterceptor }