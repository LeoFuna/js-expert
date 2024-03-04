const BaseRepository = require("../repository/base/baseRepository");

class CarCategoryService {
  constructor({ carCategories, carService }) {
    this.carCategoryRepository = new BaseRepository({ file: carCategories });
    this.carService = carService
  }

  async getCarsFromCategory(categoryId) {
    const carCategory = this.carCategoryRepository.find(categoryId);

    const cars = this.carService.getAllCars();

    return cars.filter(car => carCategory.carIds.includes(car.id));
  }
}

module.exports = CarCategoryService;