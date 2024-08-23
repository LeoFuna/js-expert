import fsPromises from 'fs/promises';
import fs from 'fs';
import templates from './templates/index.js';
import Util from './util.js';

const defaultDependencies = (layer, componentName) => {
    const dependencies = {
        repository: [],
        service: [`${componentName}Repository`],
        factory: [`${componentName}Service`, `${componentName}Repository`],
    }

    return dependencies[layer].map(Util.lowerCaseFirstLetter);
}

async function executeWrites(pendingFilesToWrite) {
    return Promise.all(pendingFilesToWrite.map(({ targetFileName, txtFile }) => fsPromises.writeFile(targetFileName, txtFile)));
}

export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
    const keys = Object.keys(templates);

    const pendingFilesToWrite = []

    for(const layer of layers) {
        const layerTemplate = `${layer}Template`;
        if(!keys.includes(layerTemplate)) {
            return { error: 'the chosen layer doesnt has a template' }
        }
        const template = templates[layerTemplate]; 
        const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;
        const dependencies = defaultDependencies(layer, componentName);
        const { fileName, template: txtFile } = template(componentName, ...dependencies);
        
        const targetFileName = `${targetFolder}/${Util.lowerCaseFirstLetter(fileName)}.js`;

        pendingFilesToWrite.push({ targetFileName, txtFile });
    }
    await executeWrites(pendingFilesToWrite);

    return { success: true }
}