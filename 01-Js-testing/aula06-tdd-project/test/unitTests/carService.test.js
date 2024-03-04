const { describe, it, before, beforeEach, afterEach, after } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
const CarService = require('../../src/service/carService');
const { join } = require('path');

const carsDatabase = join(__dirname, './../../database', 'cars.json')

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
}

describe('CarService Suite Tests', () => {
  let carService = {}
  let sandbox = {}
  // Para garantir que entre cada teste o estado do objeto seja resetado
  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4]

    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lt(data.length).and.be.gte(0);
  })

  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory;
    const firstCar = carCategory.carIds[0];

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name,
    ).returns(0);

    const result = carService.chooseRandomCar(carCategory);
    const expected = firstCar;

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  })

  it('given a car category it should return an available car', async () => {
    const car = mocks.validCar;
    // Faz com que ao substituir carIds nao sujemos o objeto original
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car);

    sandbox.spy(
      carService,
      carService.chooseRandomCar.name,
    )

    const result = await carService.getAvailableCar(carCategory);

    const expected = car;

    expect(result).to.be.deep.equal(expected);
    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.chooseRandomCar.calledWithExactly(carCategory)).to.be.ok;
    expect(carService.carRepository.find.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
  })
})