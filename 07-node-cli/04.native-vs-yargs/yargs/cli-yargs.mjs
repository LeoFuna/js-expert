#!/usr/bin/env node
// o de cima é para rodar o arquivo como um script
// chmod +x cli-yargs.mjs
// o commando acima é para dar permissão de execução direta no arquivo via terminal
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const hero = ({ name, age }) => ({ name, age, id: Date.now() });
const { argv } = yargs(hideBin(process.argv))
    .command('createHero', 'create a hero', (builder) => {
        return builder
            .option('name', {
                alias: 'n',
                demandOption: true,
                describe: 'Hero name',
                type: 'string'
            })
            .option('age', {
                alias: 'a',
                demandOption: true,
                describe: 'Hero age',
                type: 'number'
            })
            .example('createHero --name "Superman" --age 35', 'Create a hero')
            .example('createHero -n "Superman" -a 35', 'Create a hero')
    })
    .epilog('copyright 2024')

console.log(hero(argv));