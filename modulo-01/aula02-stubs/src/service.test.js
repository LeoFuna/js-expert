const assert = require("assert");
const Service = require("./service");
const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";
const { createSandbox } = require("sinon");
const sinon = createSandbox();
const mocks = {
  alderaan: require("../mocks/alderaan.json"),
  tatooine: require("../mocks/tatooine.json"),
};

(async () => {
  // Isso vai bater a API, o que não é recomendado para o caso de testes
  // {
  //   const service = new Service();
  //   const response = await service.makeRequest(BASE_URL_2);
  //   console.log(JSON.stringify(response))
  // }

  const service = new Service();

  {
    const stub = sinon.stub(
      service,
      service.makeRequest.name
    )

    stub.withArgs(BASE_URL_1).resolves(mocks.alderaan);
    stub.withArgs(BASE_URL_2).resolves(mocks.tatooine);

    {
      console.log('If Data is valid - Should return Alderaan planet with correct format: ')
      const expected = {
        name: 'Alderaan',
        surfaceWater: '40',
        appearedIn: 2
      }

      const response = await service.getPlanets(BASE_URL_1);
      assert.deepStrictEqual(response, expected);
    }

    {
      console.log('If Data is valid - Should return Tatooine planet with correct format: ')
      const expected = {
        name: 'Tatooine',
        surfaceWater: '1',
        appearedIn: 
        5
      }
      
      const response = await service.getPlanets(BASE_URL_2);
      assert.deepStrictEqual(response, expected);
    }
  }
})();