import knex from "knex";

export default class PostgresStrategy {
    #instance
    constructor(connectionString) {
        this.connecconnectionString = connectionString;
        this.table = "warriors"; // nao é uma boa prática mas para o exemplo serve
    }

    async connect() {
        this.#instance = knex({
            client: 'pg',
            connection: {
                connectionString: this.connecconnectionString,
            },
        });
        // essa linha é uma limitação do knex para saber se ele connectou ao banco
        return this.#instance.raw('select 1+1 as result');
    }

    async create(item) {
        return this.#instance(this.table).insert(item);
    }

    async read(item) {
        return this.#instance.select('*').from(this.table);
    }
}