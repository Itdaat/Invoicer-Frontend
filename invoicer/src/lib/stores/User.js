import { writable } from 'svelte/store';
/**
 * @type {import("svelte/store").Writable<string>}
 */
const UserStore = writable();

export default UserStore;