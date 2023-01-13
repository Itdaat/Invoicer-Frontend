import { writable } from "svelte/store";

/**
 * @type {import("svelte/store").Writable<{
 *      slider? : import('swiper').Swiper
 *      activeIndex? : number
 * }>}
 */
const SliderStore = writable({ activeIndex: 1 });

export default SliderStore;
