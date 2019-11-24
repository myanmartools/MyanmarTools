"use strict";
/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-import-side-effect
// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
require("zone.js/dist/zone-node");
// tslint:disable-next-line: no-implicit-dependencies
require("reflect-metadata");
const fs_1 = require("fs");
const path_1 = require("path");
// Import module map for lazy loading
const platform_server_1 = require("@angular/platform-server");
const module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
exports.ROUTES = [
    '/',
    '/zawgyi-unicode-converter',
    '/zawgyi-unicode-converter-android',
    '/unicode-code-points-lookup',
    '/ng-translit',
    '/ng-zawgyi-detector',
    '/zawgyi-unicode-translit-rules',
    '/404',
];
const PUBLIC_FOLDER = path_1.join(__dirname, 'app');
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
// tslint:disable-next-line: no-unsafe-any
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');
// Load the index.html file containing referances to your application bundle.
const index = fs_1.readFileSync(path_1.join(PUBLIC_FOLDER, 'index.html'), 'utf8');
let previousRender = Promise.resolve();
// Iterate each route path
exports.ROUTES.forEach(route => {
    const fullPath = path_1.join(PUBLIC_FOLDER, route);
    // Make sure the directory structure is there
    if (!fs_1.existsSync(fullPath)) {
        fs_1.mkdirSync(fullPath);
    }
    // Writes rendered HTML to index.html, replacing the file if it already exists.
    // tslint:disable-next-line: no-unsafe-any
    previousRender = previousRender.then(_ => platform_server_1.renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [
            // tslint:disable-next-line: no-unsafe-any
            module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
        ]
    })).then(html => {
        fs_1.writeFileSync(path_1.join(fullPath, 'index.html'), html);
    });
});
//# sourceMappingURL=prerender.js.map