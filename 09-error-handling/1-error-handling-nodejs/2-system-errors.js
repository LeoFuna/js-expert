import timers from 'timers/promises';
const timeoutAsync = timers.setTimeout;

// setTimeout(async () => {
//     console.log('starting process!!');
//     await timeoutAsync(100);
//     console.count('debug');
//     console.log(await Promise.resolve('timeout order!'));
//     await timeoutAsync(100);
//     console.count('debug');

//     await Promise.reject('Promise error on timeout');
// }, 1000);

const throwError = (msg) => { throw new Error(msg); }

try {
    console.log('hello');
    console.log('world');
    throwError('Erro dentro do try catch');
} catch (error) {
    console.log('pego no catch', error.message);
} finally {
    console.log('executed after all')
}

process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection', error.message || error);
});

process.on('uncaughtException', (error) => {
    console.log('uncaughtException', error.message || error);
})

Promise.reject('Promise error outside try catch')

// Se o Promise.reject estiver dentro de um outro contexto, ele cai no unhandledRejection
setTimeout(async () => {
    await Promise.reject('AWAIT: Promise error outside try catch');
})
// mas se ele estiver no contexto global, ele cai no uncaughtException
// await Promise.reject('Promise error outside try catch');

// uncaughtException
setTimeout(() => {
    throwError('Erro fora do catch');
})