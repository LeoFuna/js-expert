export default class Shipment {
    update(data) {
        // importante lembrar que o update é responsavel por gerenciar seus erros e excecoes
        // nao deve se ter await no notify porque a responsabilidade do notify eh so emitir eventos
        console.log(`\nShipping to ${data.userName}`);
    }
}