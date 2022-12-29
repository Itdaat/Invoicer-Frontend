import { writable } from "svelte/store";

/**
 * @type {import("svelte/store").Writable<import('../../types/Entities').Firm>}
 */
const FirmStore = writable();

export default FirmStore;

