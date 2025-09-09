/**
 * @fileoverview
 * Utility function to detect locale from the browser setting or paramenter on the URL.
 */

import queryString from 'query-string';

/**
 * look for language setting in the browser. Check against supported locales.
 * If there's a parameter in the URL, override the browser setting
 * @param supportedLocales An array of supported locale codes.
 * @return the preferred locale
 */
const detectLocale = (supportedLocales: string[]): string => {
    let locale = 'en'; // default
    let browserLocale = (window.navigator as any).userLanguage || window.navigator.language;
    browserLocale = browserLocale.toLowerCase();
    // try to set locale from browserLocale
    if (supportedLocales.includes(browserLocale)) {
        locale = browserLocale;
    } else {
        browserLocale = browserLocale.split('-')[0];
        if (supportedLocales.includes(browserLocale)) {
            locale = browserLocale;
        }
    }

    const queryParams = queryString.parse(location.search);
    // Flatten potential arrays and remove falsy values
    const potentialLocales = ([] as any[])
        .concat(queryParams.locale as any, queryParams.lang as any)
        .filter(l => l);
    if (!potentialLocales.length) {
        return locale;
    }

    const urlLocale = String(potentialLocales[0]).toLowerCase();
    if (supportedLocales.includes(urlLocale)) {
        return urlLocale;
    }

    return locale;
};

export {
    detectLocale
};
