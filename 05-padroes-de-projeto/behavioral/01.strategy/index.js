import ContextStrategy from "./src/base/contextStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionString = "postgres://leofuna:123456@localhost:5432/heroes";
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
await postgresContext.connect();

const mongoDBConnectionString = "mongodb://leofuna:123456@localhost:27017/heroes";
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString));
await mongoDBContext.connect();

const data = [{
    name: 'leofuna',
    type: 'transaction'
}, {
    name: 'maria',
    type: 'activitylog'
}];

const contextTypes = {
    transaction: postgresContext,
    activitylog: mongoDBContext
}

for (const { name, type } of data) {
    const context = contextTypes[type];
    await context.create({ name });
    const result = await context.read();
    console.log(result);
}