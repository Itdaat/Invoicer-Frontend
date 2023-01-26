import { writable } from 'svelte/store';

/**
 * @type {import("svelte/store").Writable<{
 *      count? : number,
 *      cleared?: boolean
 * }>}
*/
// @ts-ignore
const FilterStoreHelper = writable({});

export default FilterStoreHelper;