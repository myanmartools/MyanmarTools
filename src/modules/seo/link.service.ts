/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2, ViewEncapsulation } from '@angular/core';

/**
 * The seo link service.
 */
@Injectable({
    providedIn: 'root'
})
export class LinkService {
    private readonly _document: HTMLDocument;

    constructor(
        private readonly _rendererFactory: RendererFactory2,
        // tslint:disable-next-line:no-any
        @Inject(DOCUMENT) doc: any) {
        // tslint:disable-next-line: no-unsafe-any
        this._document = doc;
    }

    addTag(tag: LinkDefinition, forceCreation: boolean = false): HTMLLinkElement | null | undefined {
        if (!tag) {
            return undefined;
        }

        return this.getOrCreateElement(tag, forceCreation);
    }

    addTags(tags: LinkDefinition[], forceCreation: boolean = false): HTMLLinkElement[] {
        if (!tags) {
            return [];
        }

        return tags.reduce((result: HTMLLinkElement[], tag: LinkDefinition) => {
            if (tag) {
                result.push(this.getOrCreateElement(tag, forceCreation));
            }

            return result;
        }, []);
    }

    updateTag(tag: LinkDefinition, selector?: string): HTMLLinkElement | null | undefined {
        if (this._document.head === null) {
            return undefined;
        }

        if (!tag) {
            return undefined;
        }

        const parsedSelector = selector || this.parseSelector(tag);
        const link = this.getTag(parsedSelector);

        if (link) {
            const renderer = this.createRenderer();

            return this.setLinkElementAttributes(tag, link, renderer);
        }

        return this.getOrCreateElement(tag, true);
    }

    getTag(attrSelector: string): HTMLLinkElement | null | undefined {
        if (this._document.head === null) {
            return undefined;
        }

        const selector = this.normalizeSelector(attrSelector);

        return this._document.head.querySelector(selector) as HTMLLinkElement;
    }

    getTags(attrSelector: string): HTMLLinkElement[] {
        if (!attrSelector) {
            return [];
        }

        const selector = this.normalizeSelector(attrSelector);

        if (!this._document.head) {
            return [];
        }

        const nodeList = this._document.head.querySelectorAll<HTMLLinkElement>(selector);

        // tslint:disable-next-line: no-unsafe-any
        return nodeList ? [].slice.call(nodeList) : [];
    }

    removeTag(attrSelector: string): void {
        // tslint:disable-next-line:no-non-null-assertion
        this.removeTagElement(this.getTag(attrSelector)!);
    }

    removeTagElement(link: HTMLLinkElement): void {
        if (link && this._document.head) {
            const renderer = this.createRenderer();
            renderer.removeChild(this._document.head, link);
        }
    }

    private getOrCreateElement(tag: LinkDefinition, forceCreation: boolean = false):
        HTMLLinkElement {
        if (!forceCreation) {
            const selector: string = this.parseSelector(tag);
            // tslint:disable-next-line:no-non-null-assertion
            const elem: HTMLLinkElement = this.getTag(selector)!;
            // It's allowed to have multiple elements with the same name so it's not enough to
            // just check that element with the same name already present on the page. We also need to
            // check if element has tag attributes
            if (elem && this.containsAttributes(tag, elem)) {
                return elem;
            }
        }

        const renderer = this.createRenderer();

        const element = renderer.createElement('link');
        const head = this._document.head;
        // const selector = this._parseSelector(tag);

        if (head === null) {
            throw new Error('<head> not found within DOCUMENT.');
        }

        // tslint:disable-next-line: no-unsafe-any
        this.setLinkElementAttributes(tag, element, renderer);
        renderer.appendChild(head, element);

        // tslint:disable-next-line: no-unsafe-any
        return element;
    }

    private createRenderer(): Renderer2 {
        return this._rendererFactory.createRenderer(this._document, {
            id: '-1',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
        });
    }

    private setLinkElementAttributes(tag: LinkDefinition, el: HTMLLinkElement, renderer?: Renderer2): HTMLLinkElement {
        Object.keys(tag)
            .forEach((prop: string) => {
                if (renderer) {
                    renderer.setAttribute(el, prop, tag[prop]);
                } else {
                    el.setAttribute(prop, tag[prop]);
                }
            });

        return el;
    }

    private parseSelector(tag: LinkDefinition): string {
        const attr: string = tag.rel ? 'rel' : 'hreflang';

        return `${attr}="${tag[attr]}"`;
    }

    private normalizeSelector(attrSelector: string): string {
        if (/^link\[/.test(attrSelector)) {
            return attrSelector;
        }

        return `link[${attrSelector}]`;
    }

    private containsAttributes(tag: LinkDefinition, elem: HTMLLinkElement): boolean {
        return Object.keys(tag)
            .every((key: string) => elem.getAttribute(key) === tag[key]);
    }
}

export declare type LinkDefinition = {
    charset?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
    // tslint:disable-next-line:no-reserved-keywords
    type?: string;
} & {
    [prop: string]: string;
};
