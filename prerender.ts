/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

// tslint:disable:no-import-side-effect
// tslint:disable:no-var-requires
// tslint:disable:no-require-imports

import 'zone.js/dist/zone-node';

// tslint:disable-next-line: no-implicit-dependencies
import 'reflect-metadata';

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Import module map for lazy loading
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

export const ROUTES = [
    '/',
    '/zawgyi-unicode-converter',
    '/zawgyi-unicode-converter-android',
    '/unicode-code-point-lookup',
    '/ng-translit',
    '/ng-zawgyi-detector',
    '/zawgyi-unicode-translit-rules',
    '/404',
];

const PUBLIC_FOLDER = join(__dirname, 'app');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
// tslint:disable-next-line: no-unsafe-any
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join(PUBLIC_FOLDER, 'index.html'), 'utf8');

let previousRender = Promise.resolve();

// Iterate each route path
ROUTES.forEach(route => {
    const fullPath = join(PUBLIC_FOLDER, route);

    // Make sure the directory structure is there
    if (!existsSync(fullPath)) {
        mkdirSync(fullPath);
    }

    // Writes rendered HTML to index.html, replacing the file if it already exists.
    // tslint:disable-next-line: no-unsafe-any
    previousRender = previousRender.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [
            // tslint:disable-next-line: no-unsafe-any
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    })).then(html => {
        writeFileSync(join(fullPath, 'index.html'), html);
    });
});
