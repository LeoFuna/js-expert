import database from './../database.json' assert { type: 'json' }
import Person from './person.js';
// ES modules precisa ser passado a extençao do arquivo se nao estivermos
// trabalhando com mjs
import TerminalController from './terminalController.js'


const DEFAULT_LANG = 'pt-BR'
const STOP_TERMINAL = ":q"

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question('Type a language: ')
    if (answer === STOP_TERMINAL) {
      console.log('Process exited!')
      terminalController.closeTerminal()
      return;
    }
    const person = Person.generateInstaceFromString(answer)
    console.log(person.formatted(DEFAULT_LANG))
    // terminalController.initializeTable(database, answer)
    return mainLoop()
  } catch (error) {
    console.error(error)
    return mainLoop()
  }
}

await mainLoop()