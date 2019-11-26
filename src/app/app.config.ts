/**
 * @license
 * Copyright DagonMetric. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found under the LICENSE file in the root directory of this source tree.
 */

import { AppConfig } from './shared/app-config';

export const appConfig: AppConfig = {
    socialImageUrl: 'assets/images/social-image.jpg',
    pageInfo: {
        home: {
            title: 'Myanmar Tools - Open Source Myanmar Software Tools',
            description: 'Open source projects for Myanmar specific software applications, libraries, utilities, language, script, Unicode and font tools by DagonMetric Myanmar Tools.',
            keywords: 'myanmar tools,open source,myanmar language,myanmar script,myanmar software,myanmar unicode,myanmar,unicode,dagonmetric',
            socialImageUrl: 'assets/images/social-image.jpg',
            pageType: 'home'
        },
        'zawgyi-unicode-converter': {
            title: 'Zawgyi Unicode Converter - Online / Offline Intelligent Converter',
            description: 'Zawgyi Unicode Converter is a free & open source Zawgyi to Unicode or Unicode to Zawgyi cross platform online / offline Myanmar (Burmese) font converter created by DagonMetric Myanmar Tools.',
            keywords: 'zawgyi unicode converter,zawgyi unicode converter online,zawgyi,unicode converter,zawgyi to unicode,unicode to zawgyi,zawgyi unicode,burmese font converter,open source,myanmar tools,dagonmetric',
            socialImageUrl: 'assets/images/zawgyi-unicode-converter.jpg'
        },
        'zawgyi-unicode-converter-android': {
            title: 'Zawgyi Unicode Converter - Free & Open Source Android App',
            description: 'Zawgyi Unicode Converter Android app / apk is a free open source Zawgyi to Unicode or Unicode to Zawgyi Myanmar (Burmese) font converter created by DagonMetric Myanmar Tools.',
            keywords: 'zawgyi unicode converter,zawgyi unicode converter android,zawgyi,unicode converter,zawgyi to unicode,unicode to zawgyi,zawgyi unicode,burmese font converter,open source,myanmar tools,dagonmetric',
            socialImageUrl: 'assets/images/zawgyi-unicode-converter-android.jpg'
        },
        'unicode-code-points-lookup': {
            title: 'Unicode Code Points Lookup - Encode / Decode Unicode Codepoints',
            description: 'Unicode Code Points Lookup is a Unicode converter (Unicode encode / decode) for converting UTF-32/UTF-16/UTF-8 code point sequences to text and vice versa created by DagonMetric MyanmarTools.',
            keywords: 'unicode code points lookup,unicode lookup,unicode codepoints,unicode converter,unicode encode decode,unicode,myanmar tools,dagonmetric',
            socialImageUrl: 'assets/images/unicode-code-points-lookup.jpg'
        },
        'ng-translit': {
            title: 'DagonMetric/ng-translit - Transliterate Service for Angular',
            description: 'Open source transliteration service for Angular which can be used in swapping letters such as α → a, ၎ → ၎င်း or Zawgyi-One to standard Myanmar Unicode.',
            keywords: 'ng translit,transliterate service,transliteration,transliterate,angular,zawgyi,unicode,open source,myanmar tools,dagonmetric'
        },
        'ng-zawgyi-detector': {
            title: 'myanmartools/ng-zawgyi-detector - Zawgyi Unicode Detector for Angular',
            description: 'Open source Zawgyi-One and standard Myanmar Unicode detector library for Angular applications.',
            keywords: 'zawgyi unicode detector,zawgyi detector,zawgyi,unicode,angular,open source,myanmartools,myanmar tools'
        },
        'zawgyi-unicode-translit-rules': {
            title: 'myanmartools/zawgyi-unicode-translit-rules - Zawgyi Unicode Transliterate Rules',
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
