/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { ConfigService } from '@dagonmetric/ng-config';

import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { LinkService } from '../modules/seo';

import { PageInfo } from './shared/page-info';
import { UrlHelper } from './shared/url-helper';

/**
 * Core app component.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
    pageTitle = '';
    is404 = false;

    private readonly _pageInfoMap: { [key: string]: PageInfo };
    private readonly _onDestroy = new Subject<void>();

    constructor(
        private readonly _configService: ConfigService,
        private readonly _titleService: Title,
        private readonly _metaService: Meta,
        private readonly _linkService: LinkService,
        private readonly _urlHelper: UrlHelper,
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute) {
        this._pageInfoMap = this._configService.getValue<{ [key: string]: PageInfo }>('pageInfo');

        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map((event: NavigationEnd) => {
                    let child = this._activatedRoute.firstChild;
                    while (child && child.firstChild) {
                        child = child.firstChild;
                    }

                    if (!child) {
                        return {};
                    }

                    return {
                        pagePath: event.urlAfterRedirects,
                        pageId: child.snapshot.data.pageId
                    };
                }),
                takeUntil(this._onDestroy)
            )
            .subscribe((routeData: { pagePath?: string; pageId?: string }) => {
                if (routeData.pagePath) {
                    this.updateMeta(routeData.pagePath, routeData.pageId);
                }
            });
    }

    ngOnInit(): void {
        // Do nothing
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    private updateMeta(pagePath: string, pageId?: string): void {
        pageId = pageId || pagePath;
        const pageInfo = this._pageInfoMap[pageId];

        if (!pageInfo) {
            return;
        }

        if (pageId === 'not-found') {
            this.is404 = true;
            this._metaService.updateTag({
                name: 'robots',
                content: 'noindex'
            });
        } else {
            this.is404 = false;
            this._metaService.removeTag("name='robots'");
        }

        const url = this._urlHelper.toAbsoluteUrl(pagePath);
        this._linkService.updateTag({
            rel: 'canonical',
            href: url
        });
        this._metaService.updateTag({
            property: 'og:url',
            content: url
        });

        this.pageTitle = pageInfo.title;
        this._titleService.setTitle(this.pageTitle);

        const socialTitle = pageInfo.socialTitle ? pageInfo.socialTitle : this.pageTitle;
        this._metaService.updateTag({
            name: 'twitter:title',
            content: socialTitle
        });
        this._metaService.updateTag({
            property: 'og:title',
            content: socialTitle
        });

        const metaDescription = pageInfo.description;
        this._metaService.updateTag({
            name: 'description',
            content: metaDescription
        });

        const socialDescription = pageInfo.socialDescription ? pageInfo.socialDescription : metaDescription;
        this._metaService.updateTag({
            name: 'twitter:description',
            content: socialDescription
        });
        this._metaService.updateTag({
            property: 'og:description',
            content: socialDescription
        });

        const keywords = pageInfo.keywords;
        this._metaService.updateTag({
            name: 'keywords',
            content: keywords
        });

        const socialImageUrl = pageInfo.socialImageUrl || this._configService.getValue<string>('socialImageUrl');
        const socialImageAbsUrl = this._urlHelper.toAbsoluteUrl(socialImageUrl);
        this._metaService.updateTag({
            name: 'twitter:image',
            content: socialImageAbsUrl
        });
        this._metaService.updateTag({
            property: 'og:image',
            content: socialImageAbsUrl
        });
    }
}
