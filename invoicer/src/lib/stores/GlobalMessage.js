import { writable } from "svelte/store";

/**
 * @type {import("svelte/store").Writable<{arr : [{
 *      id : number
 *      message? : string,
 *      status : "ordinary" | "success" | "error"
 *      func? : Function,
 *      timeout : number
*      buttonText : string
 * }]
 * lastId : number}>}
 */
// @ts-ignore
const GlobalMessageStore = writable({ arr: [], lastId: 0 });

export default GlobalMessageStore;