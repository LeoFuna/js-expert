import readline from 'readline'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import DraftLog from 'draftlog'

export default class TerminalController {
  /* c8 ignore next */
  _print = () => null;
  _terminal = {};
  _data = [];
  
  constructor({ Person }) {
    this._Person = Person;
  }
  
  question(msg = '') {
    return new Promise(resolve => this._terminal.question(msg, resolve))
  }

  _getTableOptions() {
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

  _initializeTable(database, language) {
    const data = database.map(item => new this._Person(item).formatted(language));
    const options = this._getTableOptions();
    const table = chalkTable(
      options,
      data
    );

    this._print = console.draft(table)
    this._data = data
  }

  updateTable(item) {
    this._data.push(item)
    this._print(chalkTable(this._getTableOptions(), this._data))
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this._terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this._initializeTable(database, language)
  }

  closeTerminal() {
    return this._terminal.close()
  }
}
 