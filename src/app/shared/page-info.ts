/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

export interface PageInfo {
    title: string;
    pageTitle?: string;
    description: string;
    keywords: string;
    pageType?: 'home' | '404' | string;
    socialTitle?: string;
    socialDescription?: string;
    socialImageUrl?: string;
}
