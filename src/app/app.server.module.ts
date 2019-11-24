/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppComponent } from './app.component';
import { appId, AppModule } from './app.module';

/**
 * App server module for node platform.
 */
@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: appId }),
        BrowserTransferStateModule,
        HttpClientModule,

        AppModule,

        ServerModule,
        ServerTransferStateModule,
        ModuleMapLoaderModule,
        NoopAnimationsModule
    ],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
