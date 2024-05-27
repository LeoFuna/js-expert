const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert');

const dbData = [{ name: 'Maria' }, { name: 'João' }];
class MockDatabase {
    async connect() {
        return this
    }

    async find(query) {
        return dbData
    }
}

rewiremock(() => require('./../src/util/database')).with(MockDatabase)

;(async () => {
    {
        const expected = [{ name: 'MARIA' }, { name: 'JOÃO' }]
        rewiremock.enable();
        // Pois precisamos que o rewiremock seja executado antes de importar o UserFactory, para que ele possa substituir o Database
        const UserFactory = require('../src/factory/userFactory');
        const userFactory = await UserFactory.createInstance()
        const result = await userFactory.find()
        deepStrictEqual(result, expected)
        rewiremock.disable()
    }
})()