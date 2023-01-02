/**
 * 
 * @param {string} firmId
 * @export
 * @returns {Promise<import('../../types/Entities').Invoice[]>}
 */
export async function getInvoices(firmId) {
    console.log(firmId);
    return [{
        order: {
            currency: 'EUR',
            downloadAddress: 'Kiev',
            unloadAddress: 'Uzhorod',
            myNumber: '1034142',
            paymentTerms: new Date('2019-10-11'),
            price: 100
        },
        date: new Date(),
        number: '23423523',
        status: 'created',
        paymentTerms: new Date(30)
    }]
}
/**
 * 
 * 
 * @export
 * @returns {Promise<import('../../types/Entities').InvoiceCounts>}
 */
export async function getInvoicesCount() {
    return {
        all: 222444,
        future: 10000,
        overdue: 300,
        soon: 125444
    }
}