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
    console.log('puk')
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
 * @param {import('../../../types/Entities').Person} personId 
 * @param {any} [orderNumber=null] 
 * @returns 
 */
export async function updateOrder(orderId, firmId, truck, trailer, personId, orderNumber = null) {
    // const reqBody = { orderId, firmId, orderNumber };
    // const result = await postAuthRequestJson('/order/update', reqBody);
    // return result;

    const reqBody = { orderId, firmId, truck, trailer, personId };
    const result = await postAuthRequestJson('order/update', reqBody);
    return result;
}

export async function getOrderAutoComplete(firmId, orderNumber) {
    const reqBody = { name: orderNumber, firmId: firmId };
    const orders = await postAuthRequestJson('order/get/autocomplete', reqBody)
    // let orders = await getOrders(firmId, { orderNumber });

    // const ordersExternal = await getOrder(firmId, { externalOrderNumber: orderNumber });
    // const ordersTrailer = await getOrder

    if (!orders.result || orders.result.length <= 0) {
        return;
    }

    /**
     * @type {{ value: any; name: string; }[]}
     */
    let ordersRes = [];
    orders.result.forEach(order => {
        // order.orderNumber;
        let res = '';
        res += ' (' + order.truck.licenseNumber + ") ";
        res = order.orderNumber + res;
        ordersRes.push({
            value: order.orderNumber,
            pseudoValue: order.id,
            name: res
        })
    })

    return ordersRes;

}