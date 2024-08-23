import {
    expect, describe, test, jest, beforeEach, beforeAll, afterAll
} from '@jest/globals';
// Aqui estamos pegando o diretório temporário do sistema operacional
import { tmpdir } from 'os';
import fsPromises from 'fs/promises';
import { join } from 'path';
import {createLayersIfNotExists} from './../../src/createLayers.js'

describe('#Integration - Layers - Folders Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        // colocamos um sort, pq o sistema no teste retorna em ordem alfabética
        layers: ['service', 'factory', 'repository'].sort(),
    }
    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'));
    })
    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true });
    })
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test('should create folders if it doesnt exists', async () => {
        const beforeRun = await fsPromises.readdir(config.mainPath);

        await createLayersIfNotExists(config)

        const afterRun = await fsPromises.readdir(join(config.mainPath, config.defaultMainFolder));

        expect(beforeRun).not.toStrictEqual(afterRun);
        expect(afterRun).toEqual(config.layers);
    });
    test('should not create folders if it exists', async () => {
        // Aqui como foi criado anteriormente no teste, ele vai existir. Vale lembrar que nao é uma boa pratica pois esse teste depende do outro
        const beforeRun = await fsPromises.readdir(join(config.mainPath, config.defaultMainFolder));
        await createLayersIfNotExists(config)

        const afterRun = await fsPromises.readdir(join(config.mainPath, config.defaultMainFolder));
        expect(afterRun).toEqual(config.layers);
    });
})