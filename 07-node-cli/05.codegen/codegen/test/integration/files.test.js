import {
    expect, describe, test, jest, beforeEach, beforeAll, afterAll
} from '@jest/globals';
// Aqui estamos pegando o diretório temporário do sistema operacional
import { tmpdir } from 'os';
import fsPromises from 'fs/promises';
import { join } from 'path';
import {createFiles} from './../../src/createFiles.js'
import Util from '../../src/util.js';
import { createLayersIfNotExists } from '../../src/createLayers.js';

function getAllFunctionsFromInstance(instance) {
    return Reflect.ownKeys(Object.getPrototypeOf(instance))
        .filter(method => method !== 'constructor');
}

async function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
    return layers.map(layer => {
        const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;
        // mainPath/src/layer/fileName
        return join(mainPath, defaultMainFolder, layer, fileName);
    })
}

describe('#Integration - Files - Files Structure', () => {
    const config = {
        defaultMainFolder: 'src',
        mainPath: '',
        // colocamos um sort, pq o sistema no teste retorna em ordem alfabética
        layers: ['service', 'factory', 'repository'].sort(),
        componentName: 'heroes'
    }
    // Como nao obtivemos o caminho relativo, estamos pensando que o comando vai rodar do package.json que esta na raiz, por isso,
    // iniciamos pegando da pasta test
    const packageJSONLocation = join('./test/integration/mocks/package.json');

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'));
        await fsPromises.copyFile(
            packageJSONLocation,
            join(config.mainPath, 'package.json')
        );
        await createLayersIfNotExists(config);
    })
    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true });
    })
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test('Repository class should has create, read, update and delete methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository']
        };

        await createFiles(myConfig);
        const [repositoryFile] = await generateFilePath(myConfig);
        const { default: Repository } = await import(repositoryFile)
        const instance = new Repository();
        const expectNotImplemented = fn => expect(() => fn.call()).rejects.toEqual("method not implemented");

        expectNotImplemented(instance.create);
        expectNotImplemented(instance.read);
        expectNotImplemented(instance.update);
        expectNotImplemented(instance.delete);
    });
    test('Service should has the same signature as repostory and call all its methods', async () => {
        const myConfig = {
            ...config,
            layers: ['repository', 'service']
        };

        await createFiles(myConfig);
        const [repositoryFile, serviceFile] = await generateFilePath(myConfig);
        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)
        const repositoryInstance = new Repository();
        const serviceInstance = new Service({ repository: repositoryInstance });

        const allRepositoryMethods = getAllFunctionsFromInstance(repositoryInstance);

        allRepositoryMethods
            .forEach(method => jest.spyOn(repositoryInstance, method).mockResolvedValue());

        // Executa todos os métodos do service
        getAllFunctionsFromInstance(serviceInstance)
            .forEach(method => serviceInstance[method].call(serviceInstance, []));

        allRepositoryMethods
            .forEach(method => expect(repositoryInstance[method]).toHaveBeenCalled());
    })

    test('Factory instance should match layers', async () => {
        const myConfig = {
            ...config,
        };

        await createFiles(myConfig);
        const [factoryFile, repositoryFile, serviceFile] = await generateFilePath(myConfig);

        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)
        const { default: Factory } = await import(factoryFile)
        const repositoryInstance = new Repository();
        const expectedInstance = new Service({ repository: repositoryInstance });
        const instance = Factory.getInstance();

        expect(instance).toMatchObject(expectedInstance);
        expect(instance).toBeInstanceOf(Service);
    })
})