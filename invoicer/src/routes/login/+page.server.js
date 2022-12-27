export let ssr = false;
export let csr = true;

import en from '../../translations/en.json';
import ua from '../../translations/ua.json';

let tt = 1;

export function load() {
    return {
        t: tt > 2 ? en : ua,
    }
}