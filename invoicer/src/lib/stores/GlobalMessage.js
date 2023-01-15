import { writable } from "svelte/store";

/**
 * @type {import("svelte/store").Writable<{
 *      message? : string,
 *      status : "ordinary" | "success" | "error"
 *      func? : Function,
 *      buttonText : string
 * }>}
 */
const GlobalMessageStore = writable({ status: 'ordinary', buttonText: '' });

export default GlobalMessageStore;