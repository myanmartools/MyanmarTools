/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material';

import { Observable, of } from 'rxjs';

/**
 * Use SVG_ICONS (and SvgIconInfo) as "multi" providers to provide the SVG source
 * code for the icons that you wish to have preloaded in the `CustomIconRegistry`
 * For compatibility with the MdIconComponent, please ensure that the SVG source has
 * the following attributes:
 *
 * * `xmlns="http://www.w3.org/2000/svg"`
 * * `focusable="false"` (disable IE11 default behavior to make SVGs focusable)
 * * `height="100%"` (the default)
 * * `width="100%"` (the default)
 * * `preserveAspectRatio="xMidYMid meet"` (the default)
 *
 */

export interface SvgIconInfo {
    name: string;
    svgSource: string;
}

export const SVG_ICON = new InjectionToken<SvgIconInfo[]>('SVG_ICON');

interface SvgIconMap {
    [iconName: string]: SVGElement;
}

/**
 * A custom replacement for Angular Material's `MdIconRegistry`, which allows
 * us to provide preloaded icon SVG sources.
 */
@Injectable({
    providedIn: 'root'
})
export class CustomIconRegistry extends MatIconRegistry {
    private readonly _preloadedSvgElements: SvgIconMap = {};

    constructor(
        httpClient: HttpClient,
        sanitizer: DomSanitizer,
        @Inject(SVG_ICON) svgIcons: SvgIconInfo[],
        // tslint:disable-next-line:no-any
        @Optional() @Inject(DOCUMENT) document?: any) {
        super(httpClient, sanitizer, document);

        if (document) {
            this.loadSvgElements(svgIcons, document as HTMLDocument);
        }
    }

    getNamedSvgIcon(iconName: string, namespace?: string): Observable<SVGElement> {
        if (this._preloadedSvgElements[iconName]) {
            return of(this._preloadedSvgElements[iconName].cloneNode(true) as SVGElement);
        }

        return super.getNamedSvgIcon(iconName, namespace);
    }

    // tslint:disable-next-line:no-any
    private loadSvgElements(svgIcons: SvgIconInfo[], doc?: HTMLDocument): void {
        if (doc || typeof document === 'object') {
            svgIcons.forEach(icon => {
                const div = (doc || document).createElement('DIV');

                // SECURITY: the source for the SVG icons is provided in code by trusted developers
                // tslint:disable-next-line:no-inner-html
                div.innerHTML = icon.svgSource;
                const svgElement = div.querySelector('svg');
                if (svgElement) {
                    this._preloadedSvgElements[icon.name] = svgElement;
                }
            });
        } else {
            throw new Error('CustomIconRegistry could not resolve document.');
        }
    }
}
