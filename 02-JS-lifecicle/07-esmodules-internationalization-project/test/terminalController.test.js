import mocha, { afterEach, beforeEach } from 'mocha'
const { describe, it, after, before } = mocha
import chai from 'chai'
const { expect } = chai
import sinon from 'sinon'
import readline from 'readline'

import TerminalController from '../src/terminalController.js'
import databaseMock from './mock/database.mock.js';


describe('TerminalController', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })
  
  afterEach(() => {
    sandbox.restore()
  })
  
  it('should initialize terminal', () => {
    const terminal = new TerminalController();

    const DEFAULT_LANG = 'en';
    terminal.initializeTerminal(databaseMock, DEFAULT_LANG)
    const dataExpected = [
      {
        id: 1,
        vehicles: 'Motocicleta, Carro, and Caminhão',
        kmTraveled: '10,000 km',
        from: 'January 01, 2009',
        to: 'November 26, 2020'
      },
      {
        id: 2,
        vehicles: 'Patinete, Rolima, and Bicicleta',
        kmTraveled: '3,000 km',
        from: 'January 01, 2009',
        to: 'November 26, 2020'
      }
    ]

    expect(terminal.getTerminal()).to.be.instanceOf(readline.Interface)
    expect(terminal.getPrint()).to.be.instanceOf(Function)
    expect(terminal.getData()).to.deep.equal(dataExpected)
  })
})