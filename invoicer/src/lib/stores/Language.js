import { writable } from 'svelte/store';
/**
 * @type {import("svelte/store").Writable<import('../../translations/en.json')>}
 */
const LanguageStore = writable();

export default LanguageStore;