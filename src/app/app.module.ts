/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { APP_BASE_HREF, CommonModule, DOCUMENT } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { CacheModule, MemoryCacheModule } from '@dagonmetric/ng-cache';
import { ConfigModule } from '@dagonmetric/ng-config';
import { StaticConfigLoaderModule } from '@dagonmetric/ng-config/static-loader';
import { LogModule } from '@dagonmetric/ng-log';
import { ConsoleLoggerModule } from '@dagonmetric/ng-log/console';

import { environment } from '../environments/environment';

import { CustomIconRegistry } from '../modules/mat-extensions';
import { LinkService } from '../modules/seo';

import { UrlHelper } from './shared/url-helper';

import { HomeComponent } from './home';
import { NGTranslitComponent } from './ng-translit';
import { NGZawgyiDetectorComponent } from './ng-zawgyi-detector';
import { NotFoundComponent } from './not-found';
import { UnicodeCodePointLookupComponent } from './unicode-code-point-lookup';
import { ZawgyiUnicodeConverterComponent } from './zawgyi-unicode-converter';
import { ZawgyiUnicodeConverterAndroidComponent } from './zawgyi-unicode-converter-android';
import { ZawgyiUnicodeTranslitRulesComponent } from './zawgyi-unicode-translit-rules';

import { appSettings } from './app.settings';

import { AppComponent } from './app.component';
import { appSvgIconProviders } from './app.svg-icons';

export const appId = 'myanmar-tools';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        data: {
            pageId: 'home'
        }
    },
    {
        path: 'zawgyi-unicode-converter',
        component: ZawgyiUnicodeConverterComponent,
        data: {
            pageId: 'zawgyi-unicode-converter'
        }
    },
    {
        path: 'zawgyi-unicode-converter-android',
        component: ZawgyiUnicodeConverterAndroidComponent,
        data: {
            pageId: 'zawgyi-unicode-converter-android'
        }
    },
    {
        path: 'unicode-code-point-lookup',
        component: UnicodeCodePointLookupComponent,
        data: {
            pageId: 'unicode-code-point-lookup'
        }
    },
    {
        path: 'ng-translit',
        component: NGTranslitComponent,
        data: {
            pageId: 'ng-translit'
        }
    },
    {
        path: 'ng-zawgyi-detector',
        component: NGZawgyiDetectorComponent,
        data: {
            pageId: 'ng-zawgyi-detector'
        }
    },
    {
        path: 'zawgyi-unicode-translit-rules',
        component: ZawgyiUnicodeTranslitRulesComponent,
        data: {
            pageId: 'zawgyi-unicode-translit-rules'
        }
    },
    {
        path: '404',
        component: NotFoundComponent,
        data: {
            pageId: 'not-found'
        }
    },
    { path: 'unicode-code-points-lookup', redirectTo: 'unicode-code-point-lookup' },
    { path: '**', redirectTo: '404' }
];

export function baseHrefFactory(doc: Document): string | null | undefined {
    // return document.getElementsByTagName('base')[0].href;

    if (doc && doc.head) {
        const baseEle = doc.head.querySelector('base') as HTMLBaseElement;

        if (baseEle) {
            return baseEle.getAttribute('href');
        }
    }

    return undefined;
}

/**
 * App shared module for server, browser and test platforms.
 */
@NgModule({
    declarations: [
        AppComponent,

        HomeComponent,
        NGTranslitComponent,
        NGZawgyiDetectorComponent,
        NotFoundComponent,
        UnicodeCodePointLookupComponent,
        ZawgyiUnicodeConverterComponent,
        ZawgyiUnicodeConverterAndroidComponent,
        ZawgyiUnicodeTranslitRulesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes),

        MatButtonModule,
        MatCardModule,
        MatIconModule,

        // ng-config modules
        ConfigModule.init(),
        StaticConfigLoaderModule.withSettings(appSettings),

        // ng-cache modules
        CacheModule,
        MemoryCacheModule,

        // ng-log modules
        LogModule.withConfig({
            minLevel: environment.production ? 'warn' : 'trace'
        }),
        ConsoleLoggerModule.withOptions({
            enableDebug: !environment.production
        }),
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useFactory: baseHrefFactory,
            deps: [DOCUMENT]
        },
        LinkService,
        UrlHelper,
        {
            provide: MatIconRegistry,
            useClass: CustomIconRegistry
        },
        appSvgIconProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
