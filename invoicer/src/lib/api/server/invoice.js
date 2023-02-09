import { postAuthRequestJson } from '$lib/helpers/apiHelper';


/**
 * 
 * 
 * @export
 * @param {string} firmId 
 * @param {string} number 
 * @param {string} downloadAddress 
 * @param {string} unloadAddress 
 * @param {string} orderNumber 
 * @param {string} truckLicense 
 * @param {string} trailerLicense
 * @param {string} date 
 * @param {number} sum 
 * @param {Array<{id : string}>} orders 
 * @param {Array<{name : string, price : string}>} products 
 */
export async function createInvoice(firmId, number, downloadAddress, unloadAddress, orderNumber, truckLicense, trailerLicense, date, sum, orders, products) {
    const reqBody = {
        firmId, invoiceNumber: number, downloadAddress, unloadAddress, orderNumber, truckLicense, trailerLicense, invoiceDate: date, sum, orders, products
    }
    const result = await postAuthRequestJson('invoice/create', reqBody);
    return result;
}


/**
 * 
 * 
 * @export
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Invoice[]>>}
 */
export async function getInvoices() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let monthStr = month < 10 ? '0' + month : month;
    let dayStr = day < 10 ? '0' + day : day;
    const formedDate = `${dayStr}.${monthStr}.${year}`;
    return {
        error: null,
        result: [{
            creationDate: formedDate,
            paymentDate: formedDate,
            number: 'super',
            order: {
                currency: 'EUR',
                downloadAddress: 'Makaka',
                unloadAddress: 'Lupa',
                myNumber: 'super',
                price: 12923.12,
                paymentTerms: formedDate,
                date: formedDate,
                number: '123',
                truck: {
                    number: "AA0000PO",
                    type: 'truck'
                },
                trailer: {
                    number: "OO9090PP",
                    type: 'trailer'
                }
            },
            paymentTerms: formedDate,
            status: 'missed',
            cmr: {
                image: '',
                transport: {
                    number: '123',
                    type: 'trailer'
                },
                number: '123'
            }
        }]
    }
}

/**
 * 
 * 
 * @export
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').InvoiceCounts>>}
 */
export async function getInvoicesCount() {
    return {
        error: null,
        result: {
            all: 222444,
            future: 10000,
            overdue: 300,
            soon: 125444
        }
    }
}

/**
 * 
 * 
 * @export
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Invoice>>}
 */
export async function getInvoice() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let monthStr = month < 10 ? '0' + month : month;
    let dayStr = day < 10 ? '0' + day : day;
    const formedDate = `${dayStr}.${monthStr}.${year}`;
    return {
        error: null,
        result: {
            creationDate: formedDate,
            paymentDate: formedDate,
            number: 'super',
            order: {
                currency: 'EUR',
                downloadAddress: 'Makaka',
                unloadAddress: 'Lupa',
                myNumber: 'super',
                price: 12923.12,
                paymentTerms: formedDate,
                date: formedDate,
                number: '123',
                truck: {
                    number: "AA0000PO",
                    type: 'truck'
                },
                trailer: {
                    number: "OO9090PP",
                    type: 'trailer'
                }
            },
            paymentTerms: formedDate,
            status: 'missed',
            cmr: {
                image: '',
                transport: {
                    number: '123',
                    type: 'trailer'
                },
                number: '123'
            }
        }
    }
}