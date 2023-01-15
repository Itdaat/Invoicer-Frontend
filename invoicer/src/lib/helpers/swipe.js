/**
 * 
 * 
 * @param {number} touchstartX 
 * @param {number} touchendX 
 * @param {number} touchstartY 
 * @param {number} touchendY 
 */
function checkDirection(touchstartX, touchendX, touchstartY, touchendY) {
    let right = 0, left = 0, bottom = 0, top = 0;
    if (touchendX < touchstartX) {
        // console.log('left ' + Math.abs(touchendX - touchstartX));
        left = Math.abs(touchendX - touchstartX);
    }
    if (touchendX > touchstartX) {
        // console.log('right ' + Math.abs(touchendX - touchstartX));
        right = Math.abs(touchendX - touchstartX);
    }
    if (touchendY > touchstartY) {
        // console.log('bottom ' + Math.abs(touchendY - touchstartY));
        bottom = Math.abs(touchendY - touchstartY)
    }
    if (touchendY < touchstartY) {
        // console.log('top ' + Math.abs(touchendY - touchstartY));
        top = Math.abs(touchendY - touchstartY)
    }
    return {
        left, right, bottom, top, y: bottom - top, x: right - left
    }
}

/**
 * 
 * 
 * @export
 * @param  {{
 *  left: number 
 *  right: number;
 *  bottom: number;
 *  top: number;
 *  x : number,
 *  y : number,          
 *      }} directions 
 * @param {HTMLElement} node
 */
export function standardSwipe(directions, node) {
    // node.style=`transition-duration: 0ms; transform: translate3d(-1700px, 0px, 0px);`
    node.style.transform = `translate3d(${directions.x}px, 0px, 0px)`;
    node.style.transitionDuration = '300ms';
}

/**
 * @export
 * @param {HTMLElement} node
 * @param {((arg0: { left: number; right: number; bottom: number; top: number; }) => void) | undefined} [params]
 * @returns
 */
export function swipe(node, params) {
    let touchendX = 0, touchendY = 0, touchstartX = 0, touchstartY = 0;

    node.addEventListener('touchstart', (e) => {
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
    });
    node.addEventListener('touchmove', (e) => {
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        const directions = checkDirection(touchstartX, touchendX, touchstartY, touchendY);
        if (params) {
            params(directions, node, 'move');
        }
    });

    node.addEventListener('touchend', (e) => {
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        const directions = checkDirection(touchstartX, touchendX, touchstartY, touchendY);
        if (params) {
            params(directions, node, 'end');
        }
    })
    return {
        destroy() {
            node.removeEventListener('touchstart', () => { }, true);
            node.removeEventListener('touchmove', () => { }, true);
        }
    }
}