import {
    expect, describe, test, jest, beforeEach,
} from '@jest/globals';
import Util from '../../src/util';

describe('#Util - Strings', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('#upperCaseFirstLetter should transform the first letter in upperCase', () => {
        const str = 'product';
        const expected = 'Product';
        const resultString = Util.upperCaseFirstLetter(str);
        expect(resultString).toStrictEqual(expected);
    });
    test('#lowerCaseFirstLetter should transform the first letter in lowercase', () => {
        const str = 'Product';
        const expected = 'product';
        const resultString = Util.lowerCaseFirstLetter(str);
        expect(resultString).toStrictEqual(expected);
    });
    test('#upperCaseFirstLetter given an empty string it should return empty', () => {
        const str = '';
        const expected = '';
        const resultString = Util.upperCaseFirstLetter(str);
        expect(resultString).toStrictEqual(expected);
    });
    test('#lowerCaseFirstLetter given an empty string it should return empty', () => {
        const str = '';
        const expected = '';
        const resultString = Util.lowerCaseFirstLetter(str);
        expect(resultString).toStrictEqual(expected);
    });
})