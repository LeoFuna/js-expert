import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline'

import database from './../database.json' assert { type: 'json' }
// ES modules precisa ser passado a extençao do arquivo se nao estivermos
// trabalhando com mjs
import Person from './person.js'


DraftLog(console).addLineListener(process.stdin)
const DEFAULT_LANGUAGE = 'pt-BR'

const options = {
  leftPad: 2,
  columns: [
    { field: 'id', name: chalk.cyan('ID') },
    { field: 'vehicles', name: chalk.magenta('Vehicles') },
    { field: 'kmTraveled', name: chalk.blue('Km Traveled') },
    { field: 'from', name: chalk.red('From') },
    { field: 'to', name: chalk.yellow('To') },
  ]
}

const table = chalkTable(
  options,
  database.map(item => new Person(item).formatted(DEFAULT_LANGUAGE))
)
const print = console.draft(table)

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

terminal.question('Qual ;e o seu nome?', (msg) => {
  console.log('meu nome é: ', msg)
})