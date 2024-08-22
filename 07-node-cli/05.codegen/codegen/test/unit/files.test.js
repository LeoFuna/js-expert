import {
    expect, describe, test, jest, beforeEach,
} from '@jest/globals';
import fsPromises from 'fs/promises';
import { createFiles } from '../../src/createFiles.js';
import templates from '../../src/templates/index.js';

describe('#Layers - Files Structure', () => {
    const defaultLayers = ['repository', 'service', 'factory'];
    const config = {
        mainPath: 'mainPath',
        defaultMainFolder: 'src',
        layers: defaultLayers,
        componentName: 'heroes'
    };
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
    const repositoryLayer = `${config.componentName}Repository`;
    const serviceLayer = `${config.componentName}Service`;

    test('should not create file structure on inexistent templates', async () => {
        const myConfig = {
            ...config,
            layers: ['inexistent']
        }
        const expected = { error: 'the chosen layer doesnt has a template' }
        const result = await createFiles(myConfig);
        expect(result).toStrictEqual(expected);
    });
    test('repository should not add any additional dependencies', async () => {
        jest.spyOn(fsPromises, 'writeFile').mockResolvedValue();
        jest.spyOn(templates, templates.repositoryTemplate.name)
            .mockReturnValue({ fileName: '', template: '' });
        const myConfig = {
            ...config,
            layers: ['repository']
        }
        const expected = { success: true }
        const result = await createFiles(myConfig);
        expect(result).toStrictEqual(expected);
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
        expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName)
    });
    test('service should has repository dependency', async () => {
        jest.spyOn(fsPromises, 'writeFile').mockResolvedValue();
        jest.spyOn(templates, 'repositoryTemplate')
            .mockReturnValue({ fileName: '', template: '' });
        jest.spyOn(templates, 'serviceTemplate')
            .mockReturnValue({ fileName: '', template: '' });
        const myConfig = {
            ...config,
            layers: ['repository', 'service']
        }
        const expected = { success: true }
        const result = await createFiles(myConfig);
        expect(result).toStrictEqual(expected);
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
        expect(templates.serviceTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer)
    });
    test('factory should has service and repository dependencies', async () => {
        jest.spyOn(fsPromises, 'writeFile').mockResolvedValue();
        jest.spyOn(templates, 'repositoryTemplate')
            .mockReturnValue({ fileName: '', template: '' });
        jest.spyOn(templates, 'serviceTemplate')
            .mockReturnValue({ fileName: '', template: '' });
        jest.spyOn(templates, 'factoryTemplate')
            .mockReturnValue({ fileName: '', template: '' });
        const myConfig = {
            ...config,
        }
        const expected = { success: true }
        const result = await createFiles(myConfig);
        expect(result).toStrictEqual(expected);
        expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
        expect(templates.factoryTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer, serviceLayer)
    });
})