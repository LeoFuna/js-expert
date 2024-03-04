const BaseRepository = require("../repository/base/baseRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);

    return car;
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;

    return Math.round(Math.random() * (listLength - 1));
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)

    return carCategory.carIds[randomCarIndex];
  }

  getAllCars() {
    return this.carRepository.find();
  }
}

module.exports = CarService;