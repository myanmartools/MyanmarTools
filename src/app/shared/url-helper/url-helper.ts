/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

/**
 * App url helper service.
 */
@Injectable({
    providedIn: 'root'
})
export class UrlHelper {
    constructor(@Optional() @Inject(APP_BASE_HREF) private readonly _baseHref?: string) { }

    toAbsoluteUrl(url: string): string {
        let formattedUrl = (url || '').trim();

        if (this.isAbsoluteUrl(formattedUrl)) {
            return formattedUrl;
        }

        const originalUrl = 'https://myanmartools.org';

        if (formattedUrl.startsWith('/') && !/^\/\//i.test(formattedUrl)) {
            formattedUrl = formattedUrl.substr(1);
        }

        formattedUrl = originalUrl + (this._baseHref || '/') + formattedUrl;

        return formattedUrl;
    }

    private isAbsoluteUrl(url: string): boolean {
        return /^https?\:\/\//i.test(url);
    }
}
