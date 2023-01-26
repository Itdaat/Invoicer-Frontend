import { postAuthRequestJson } from '$lib/helpers/apiHelper';

/**
 * 
 * 
 * @export
 * @param {any} firmId 
 * @param {any} filters 
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Order[]>>}
 */
export async function getOrders(firmId, filters) {
    const reqBody = { firmId, ...filters };
    const result = await postAuthRequestJson('order/get', reqBody);
    return result;
}

/**
 * 
 * 
 * @export
 * @param {any} firmId 
 * @param {any} orderId 
 * @returns {Promise<import('../../../types/Entities').Order>}
 */
export async function getOrder(firmId, orderId) {
    const reqBody = { firmId, orderId };
    const result = await postAuthRequestJson('order/get', reqBody);
    return result.result[0];
}

/**
 * 
 * 
 * @export
 * @param {any} orderId 
 * @param {any} firmId 
 * @param {import('../../../types/Entities').Transport} truck 
 * @param {import('../../../types/Entities').Transport} trailer 
 * @param {import('../../../types/Entities').Person} driver 
 * @param {any} [orderNumber=null] 
 * @returns 
 */
export async function updateOrder(orderId, firmId, truck, trailer, driver, orderNumber = null) {
    // const reqBody = { orderId, firmId, orderNumber };
    // const result = await postAuthRequestJson('/order/update', reqBody);
    // return result;


}

