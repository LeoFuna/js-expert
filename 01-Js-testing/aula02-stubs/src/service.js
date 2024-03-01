class Service {
  async makeRequest(url) {
    const data = await (await fetch(url)).json();

    return data;
  }

  async getPlanets(url) {
    const response = await this.makeRequest(url);

    return {
      name: response.name,
      surfaceWater: response.surface_water,
      appearedIn: response.films.length,
    };
  }
}

module.exports = Service;
