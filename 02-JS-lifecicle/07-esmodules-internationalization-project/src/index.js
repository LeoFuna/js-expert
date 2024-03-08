import database from './../database.json' assert { type: 'json' }
import Person from './person.js';
import { save } from './repository.js';
// ES modules precisa ser passado a extençao do arquivo se nao estivermos
// trabalhando com mjs
import TerminalController from './terminalController.js'


const DEFAULT_LANG = 'en'
const STOP_TERMINAL = ":q"

const terminalController = new TerminalController({ Person });
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question('Insert a new user with pattern: id vehicles(use ,) kmTraveled dateFrom dateTo\n')
    if (answer === STOP_TERMINAL) {
      console.log('Process exited!')
      terminalController.closeTerminal()
      return;
    }
    const person = Person.generateInstaceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    save(person)
    return mainLoop()
  } catch (error) {
    console.error(error)
    return mainLoop()
  }
}

await mainLoop()