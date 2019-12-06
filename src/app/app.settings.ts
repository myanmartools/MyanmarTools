/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { AppConfig } from './shared/app-config';

export const appSettings: AppConfig = {
    socialImageUrl: 'assets/images/social-image.jpg',
    pageInfo: {
        home: {
            title: 'Myanmar Tools - Open Source Myanmar Software Tools',
            description: 'Open source projects for Myanmar specific software applications, libraries, utilities, language, script, Unicode and font tools by DagonMetric Myanmar Tools.',
            keywords: 'myanmar tools,open source myanmar tools,myanmar language,myanmar script,myanmar software,myanmar unicode,open source,myanmar,unicode,dagonmetric',
            socialImageUrl: 'assets/images/social-image.jpg',
            pageType: 'home'
        },
        'zawgyi-unicode-converter': {
            title: 'Zawgyi Unicode Converter - Intelligent & Accurate',
            pageTitle: 'Zawgyi Unicode Converter - Intelligent & Accurate - Myanmar Tools',
            description: 'Zawgyi Unicode Converter is a free & open source Zawgyi to Unicode or Unicode to Zawgyi cross platform online / offline Myanmar font converter created by DagonMetric Myanmar Tools.',
            keywords: 'zawgyi unicode converter,zawgyi unicode online converter,zawgyi converter,unicode converter,zawgyi to unicode,unicode to zawgyi,zawgyi unicode,myanmar font converter,open source,myanmar tools,dagonmetric',
            socialImageUrl: 'assets/images/zawgyi-unicode-converter.jpg'
        },
        'zawgyi-unicode-converter-android': {
            title: 'Zawgyi Unicode Converter Android App - Free & Open Source',
            pageTitle: 'Zawgyi Unicode Converter Android App - Free & Open Source - Myanmar Tools',
            description: 'Zawgyi Unicode Converter Android app / apk is a free open source Zawgyi to Unicode or Unicode to Zawgyi Myanmar font converter created by DagonMetric Myanmar Tools.',
            keywords: 'zawgyi unicode converter,zawgyi unicode converter android,zawgyi converter,unicode converter,zawgyi to unicode,unicode to zawgyi,zawgyi unicode,myanmar font converter,open source,myanmar tools,dagonmetric',
            socialImageUrl: 'assets/images/zawgyi-unicode-converter-android.jpg'
        },
        'unicode-code-point-lookup': {
            title: 'Unicode Code Point Lookup - Unicode Encode / Decode',
            pageTitle: 'Unicode Code Point Lookup - Unicode Encode / Decode - Myanmar Tools',
            description: 'Unicode Code Point Lookup is an online Unicode encode / decode converter for converting UTF-32/UTF-16/UTF-8 code point sequences to text and vice versa created by DagonMetric Myanmar Tools.',
            keywords: 'unicode code point lookup,unicode lookup,unicode codepoints,online unicode converter,unicode converter,unicode encode decode,unicode code point to text,unicode,myanmar tools,dagonmetric',
            socialImageUrl: 'assets/images/unicode-code-point-lookup.jpg'
        },
        'ng-translit': {
            title: 'ng-translit - Transliterate Service for Angular',
            pageTitle: 'ng-translit - Transliterate Service for Angular - Myanmar Tools',
            description: 'Open source transliteration service for Angular which can be used in swapping letters such as α → a, ၎ → ၎င်း or Zawgyi-One to standard Myanmar Unicode.',
            keywords: 'ng translit,transliterate service,transliteration,transliterate,angular,zawgyi,unicode,open source,myanmar tools,dagonmetric'
        },
        'ng-zawgyi-detector': {
            title: 'ng-zawgyi-detector - Zawgyi Unicode Detector for Angular',
            pageTitle: 'ng-zawgyi-detector - Zawgyi Unicode Detector for Angular - Myanmar Tools',
            description: 'Open source Zawgyi-One and standard Myanmar Unicode detector library for Angular applications.',
            keywords: 'zawgyi unicode detector,zawgyi detector,zawgyi,unicode,angular,open source,myanmartools,myanmar tools'
        },
        'zawgyi-unicode-translit-rules': {
            title: 'zawgyi-unicode-translit-rules - Zawgyi Unicode Transliterate Rules',
            pageTitle: 'zawgyi-unicode-translit-rules - Zawgyi Unicode Transliterate Rules - Myanmar Tools',
            description: 'Open source Zawgyi Unicode transliterate / convert regular expression rules in JSON and JavaScript formats using @DagonMetric/ng-translit.',
            keywords: 'zawgyi unicode translit rules,zawgyi unicode convert rules,zawgyi unicode converter,transliterate rules,transliteration,transliterate,unicode,zawgyi,open source,myanmartools,myanmar tools'
        },
        'not-found': {
            title: 'Page Not Found',
            description: '',
            keywords: '',
            pageType: '404'
        }
    }
};
