import { postAuthRequestJson } from '$lib/helpers/apiHelper';

export async function getOrders(orderId, firmId, externalOrderNumber, orderNumber = null) {
    const reqBody = { orderId, firmId, externalOrderNumber, orderNumber };
    const result = await postAuthRequestJson('/order/get', reqBody);
    return result;
}

export async function updateOrder(orderId, firmId, externalOrderNumber, orderNumber = null) {
    const reqBody = { orderId, firmId, externalOrderNumber, orderNumber };
    const result = await postAuthRequestJson('/order/update', reqBody);
    return result;
}