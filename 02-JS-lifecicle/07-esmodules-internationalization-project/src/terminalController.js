import readline from 'readline'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import DraftLog from 'draftlog'

import Person from './person.js'

export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
    this.terminal = {}
  }
  
  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'vehicles', name: chalk.magenta('Vehicles') },
        { field: 'kmTraveled', name: chalk.blue('Km Traveled') },
        { field: 'from', name: chalk.red('From') },
        { field: 'to', name: chalk.yellow('To') },
      ]
    }
  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language));
    const options = this.getTableOptions();
    const table = chalkTable(
      options,
      data
    );
    this.print = console.draft(table)
    this.data = data
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.initializeTable(database, language)
  }

  closeTerminal() {
    this.terminal.close()
  }
}
 