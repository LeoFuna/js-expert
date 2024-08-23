#!/usr/bin/env node

// Transformar o arquivo em executável
//chmod +x src/index.js

// Criar um link simbólico para o arquivo (o bin no package.json deve apontar para o arquivo)
// npm link

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { createLayersIfNotExists } from './createLayers.js';
import { createFiles } from './createFiles.js';

const { argv: { componentName } } = yargs(hideBin(process.argv))
    .command('skeleton', 'Create project skeleton', (builder) => {
        return builder
            .option('component-name', {
                alias: 'c',
                demandOption: true,
                describe: 'Component name',
                type: 'array'
            })
            .example('skeleton --component-name product', 'Create a project with a single domain')
            .example('skeleton -c product -c person -c color', 'Create a project with multiple domains')
    })
    .epilog('copyright 2024 - Leonardo Funabashi')

const env = process.env.NODE_ENV;
const defaultMainFolder = env === 'dev' ? 'tmp' : 'src';

const layers = ['repository', 'service', 'factory'].sort();
const config = {
    layers,
    defaultMainFolder,
    mainPath: '.'
}

await createLayersIfNotExists(config);

const pendingPromises = [];
for (const domain of componentName) {
    const result = createFiles({
        ...config,
        componentName: domain
    });
    pendingPromises.push(result);
}

await Promise.all(pendingPromises);
