import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from '../src/person.js'


describe('Person', () => {
  it('should return a person instance from a string', () => {
    const VALID_TEXT = '3 Car,plane,motocycle 3000 2024-01-01 2024-03-07'
    const person = Person.generateInstaceFromString(VALID_TEXT)
    const expected = {
      id: '3',
      vehicles: ['Car', 'plane', 'motocycle'],
      kmTraveled: '3000',
      from: '2024-01-01',
      to: '2024-03-07'
    }

    expect(person).to.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      id: '3',
      vehicles: ['Truck', 'motocycle'],
      kmTraveled: '2000',
      from: '2024-01-01',
      to: '2024-03-07'
    })
    const DEFAULT_LANG = 'en'
    const formatedPerson = person.formatted(DEFAULT_LANG)

    expect(formatedPerson).to.deep.equal({
      id: 3,
      vehicles: 'Truck and motocycle',
      kmTraveled: '2,000 km',
      from: 'January 01, 2024',
      to: 'March 07, 2024'
    })
  })
})
