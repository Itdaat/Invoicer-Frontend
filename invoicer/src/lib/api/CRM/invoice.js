/**
 * 
 * @param {string} firmId
 * @export
 * @returns {Promise<import('../../../types/Entities').Invoice[]>}
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
 * @returns {Promise<import('../../../types/Entities').InvoiceCounts>}
 */
export async function getInvoicesCount() {
    return {
        all: 222444,
        future: 10000,
        overdue: 300,
        soon: 125444
    }
}

/**
 * 
 * 
 * @export
 * @returns {Promise<import('../../../types/Entities').Invoice>}
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