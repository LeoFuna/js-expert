import {
    expect, describe, test, jest, beforeEach,
} from '@jest/globals';

import templates from '../../src/templates/index.js';

const { repositoryTemplate, serviceTemplate, factoryTemplate } = templates;

import { factoryTemplateMock, repositoryTemplateMock, serviceTemplateMock } from './mocks/index.js';

describe('#Codegen 3-layers arch', () => {
    const componentName = 'product';
    const repositoryName = `${componentName}Repository`;
    const serviceName = `${componentName}Service`;
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('#should generate repository template', () => {
        const expected = {
            fileName: repositoryName, 
            template: repositoryTemplateMock
        }
        const result = repositoryTemplate(componentName);
        expect(result).toStrictEqual(expected);
    });
    test('#should generate service template', () => {
        const expected = {
            fileName: `${componentName}Service`,
            template: serviceTemplateMock
        }
        const result = serviceTemplate(componentName, repositoryName);
        expect(result).toStrictEqual(expected);
    });
    test('#should generate factory template', () => {
        const expected = {
            fileName: `${componentName}Factory`,
            template: factoryTemplateMock
        }
        const result = factoryTemplate(componentName, serviceName, repositoryName);
        expect(result).toStrictEqual(expected);
    });
})