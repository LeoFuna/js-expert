const { readFile } = require("fs/promises");
const { error, fileConst } = require("./constants");

class File {
  static async csvToJson(filePath) {
    const fileString = await readFile(filePath, 'utf8');
    
    const validation = this.isValid(fileString);
    if (!validation.valid) throw new Error(validation.error);

    const employees = this.parseCSVToJSON(fileString);

    return employees;
  }

  static isValid(csvString) {
    const lines = csvString.split('\n');

    const [headers, ...fileWithoutHeaders] = lines;

    const isValidHeader = headers === fileConst.FIELDS.join(',');

    if (!isValidHeader) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      }
    }

    if (
      !fileWithoutHeaders.length
      || fileWithoutHeaders.length > fileConst.MAX_LENGTH
    ) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      }
    };

    return {
      error: null,
      valid: true,
    }
  }

  static parseCSVToJSON(csvString) {
    const [headers, ...fileWithoutHeaders] = csvString.split('\n');
    const employees = fileWithoutHeaders.map((line) => {
      const employeeData = line.split(',');
      return employeeData.reduce((acc, curr, index) => {
        return {
          ...acc,
          [headers.split(',')[index]]: curr.trim(),
        }
      }, {});
    });

    return employees;
  }
}

module.exports = File;
