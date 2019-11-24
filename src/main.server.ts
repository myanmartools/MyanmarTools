/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
