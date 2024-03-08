import mocha, { afterEach, beforeEach } from 'mocha'
const { describe, it, before } = mocha
import chai from 'chai'
const { expect } = chai
import sinon from 'sinon'
import readline from 'readline'

import TerminalController from '../src/terminalController.js'
import databaseMock from './mock/database.mock.js';
import Person from '../src/person.js'
import formattedDbMock from './mock/formatted-db.mock.js'

describe('TerminalController', () => {
  let sandbox = {};
  let terminal = {};
  before(() => {
    terminal = new TerminalController({ Person });
  })
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  
  afterEach(() => {
    sandbox.restore()
  })
  
  it('should initialize terminal', () => {
    sandbox.stub(
      terminal,
      terminal._initializeTable.name,
    ).returns(undefined);

    const DEFAULT_LANG = 'en';
    terminal.initializeTerminal(databaseMock, DEFAULT_LANG);

    expect(terminal._terminal).to.be.instanceOf(readline.Interface)
  })

  it('should initialize table', () => {
    const tableOptionsMock = {
      leftPad: 2,
      columns: [
        { field: 'id', name: 'id' },
        { field: 'vehicles', name: 'Vehicles' },
        { field: 'kmTraveled', name: 'Km Traveled' },
        { field: 'from', name: 'From' },
        { field: 'to', name: 'To' },
      ]
    }

    const formattedStub = sandbox.stub().returns(formattedDbMock)
    sandbox.stub(
      terminal,
      '_Person'
    ).callsFake(() => ({ formatted: formattedStub }))

    const getTableOptionsStub = sandbox.stub(
      terminal,
      terminal._getTableOptions.name
    ).returns(tableOptionsMock)

    const draftStub = sandbox.stub(
      console,
      'draft'
    ).returns(() => 'table drafted!')

    const DEFAULT_LANG = 'en'
    terminal._initializeTable([databaseMock[0]], DEFAULT_LANG)
    
    expect(terminal._print).to.be.instanceOf(Function)
    expect(terminal._data).to.deep.equal([formattedDbMock])
    expect(formattedStub.calledOnce).to.be.ok;
    expect(getTableOptionsStub.calledOnce).to.be.ok;
    expect(draftStub.calledOnce).to.be.ok;
  })

  it('should get table options', () => {    
    const expected = {
      leftPad: 2,
      columns: [
        { field: 'id', name: "\u001b[36mID\u001b[39m" },
        { field: 'vehicles', name: "\u001b[35mVehicles\u001b[39m" },
        { field: 'kmTraveled', name: "\u001b[34mKm Traveled\u001b[39m" },
        { field: 'from', name: "\u001b[31mFrom\u001b[39m" },
        { field: 'to', name: "\u001b[33mTo\u001b[39m" },
      ]
    }
    const result = terminal._getTableOptions();
    
    expect(result).to.deep.equal(expected)
  })

  it('should make a question', async () => {
    sandbox.stub(
      terminal._terminal,
      'question'
    ).callsFake((msg, cb) => cb(msg))
    const MSG = 'Hello World'
    const result = await terminal.question(MSG)

    expect(result).to.be.equal(MSG)
  })

  it('should update table', () => {
    const terminal = new TerminalController({ Person })
    sandbox.stub(
      terminal,
      '_print'
    ).callsFake(() => undefined)
    terminal.updateTable(formattedDbMock);

    expect(terminal._data).to.deep.equal([formattedDbMock])
  })

  it('should close terminal', () => {
    sandbox.stub(
      terminal._terminal,
      'close'
    ).callsFake(() => 'closing terminal...')

    const result = terminal.closeTerminal();
    expect(result).to.be.equal('closing terminal...');
  })
})