const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require("assert");

// IFEE
;(async () => {

  // variáveis criadas nesse bloco, só são válidas durante sua execuçao
  {
    const filePath = './mock/emptyFile-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = './mock/fiveItems-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = './mock/header-invalid.csv'
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = './mock/threeItems-valid.csv'
    const expected = [
      {
        id: 1,
        name: 'Joao',
        profession: 'developer',
        age: 50,
      },
      {
        id: 2,
        name: 'Maria Joaquina',
        profession: 'tester',
        age: 30,
      },
      {
        id: 3,
        name: 'Marta',
        profession: 'jogadora',
        age: 43,
      }
    ];
    const result = await File.csvToJson(filePath);
    assert.deepEqual(result, expected);
  }

})();