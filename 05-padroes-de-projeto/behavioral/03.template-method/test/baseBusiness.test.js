import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import BaseBusiness from "../src/business/base/baseBusiness.js";
import { NotImplementedException } from "../src/util/exceptions.js";

describe('#BaseBusiness', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    })
    test('should throw and error when child class doesnt implment _validateRequiredFields function', () => {
        class ConcreteClass extends BaseBusiness {}
        const concreteClass = new ConcreteClass();
        const validationError = new NotImplementedException(
            concreteClass._validateRequiredFields.name
        );
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should throw and error when _validateRequiredFields returns false', () => {
        const VALIDATION_DOESNT_PASS = false;
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_PASS)
        }
        const concreteClass = new ConcreteClass();
        const validationError = new Error('Invalid data');
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should throw and error when child class doesnt implment _create function', () => {
        const VALIDATION_PASS = true;
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_PASS)
        }
        const concreteClass = new ConcreteClass();
        const validationError = new NotImplementedException(
            concreteClass._create.name
        );
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should call _create and _validateRequiredFields on create', () => {
        const VALIDATION_PASS = true;
        const CREATE_PASS = true;
        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_PASS)
            _create = jest.fn().mockReturnValue(CREATE_PASS)
        }
        const concreteClass = new ConcreteClass();
        // Queremos garantir que o create tenha sido chamadao da classe BaseBusiness
        const createFromBaseClass = jest.spyOn(
            BaseBusiness.prototype,
            BaseBusiness.prototype.create.name
        );
        const result = concreteClass.create({});
        expect(result).toBeTruthy()
        expect(createFromBaseClass).toHaveBeenCalled();
        expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
        expect(concreteClass._create).toHaveBeenCalled();
    })
})