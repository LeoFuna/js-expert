import {
    expect, describe, test, jest, beforeEach,
} from '@jest/globals';
import { createLayersIfNotExists } from '../../src/createLayers.js';
import fsPromises from 'fs/promises';
import fs from 'fs';

describe('#Layers - Folder Structure', () => {
    const defaultLayers = ['repository', 'service', 'factory'];
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    test('should create folders if doesnt exists', async () => {
        jest.spyOn(fsPromises, 'mkdir').mockResolvedValue();
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);

        await createLayersIfNotExists({ mainPath: 'mainPath', defaultMainFolder: 'defaultMainFolder', layers: defaultLayers });

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
        expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
    });
    test('should not create folders if already exists', async () => {
        jest.spyOn(fsPromises, 'mkdir').mockResolvedValue();
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);

        await createLayersIfNotExists({ mainPath: 'mainPath', defaultMainFolder: 'defaultMainFolder', layers: defaultLayers });

        expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
        expect(fsPromises.mkdir).not.toHaveBeenCalled();
    });
})