import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

export function addLocalization() {

    register('en', () => import('./en.json'));
    // en, en-US and pt are not available yet

    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });
}