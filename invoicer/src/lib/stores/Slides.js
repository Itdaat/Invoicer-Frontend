import { writable } from "svelte/store";

/**
 * @type {import("svelte/store").Writable<{
 *      slider? : import('swiper').Swiper
 *      activeIndex? : number
 * }>}
 */
const SliderStore = writable({ activeIndex: 0 });

export default SliderStore;
