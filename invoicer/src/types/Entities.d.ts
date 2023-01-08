export class Transport {
    number : string;
    type : 'truck' | 'trailer'
}

export class Person {
    firstName : string; 
    lastName: string;
    telNumber: string;
    nick : string;
}

export class Order {
    myNumber : string;
    number? : string;
    date? : Date;
    truck? : Transport;
    trailer? : Transport;
    person? : Person;
    downloadAddress : string;
    unloadAddress : string;
    price: number;
    currency : 'EUR' | 'USD';
    paymentTerms: Date;
}

export class CMR {
    number : string;
    transport: Transport;
    image: string;
    order? : Order
}

export class Invoice {
    number: string;
    creationDate: Date;
    paymentDate : Date;
    order : Order;
    cmr? : CMR;
    paymentTerms : Date;
    status : 'created' | 'missed' | 'payed'  
}

export class InvoiceMini {
    number: string;
    price: number;
    date: Date;
    truckNumber: string;
    trailerNumber: string;
    sign?: string;
    status : 'created' | 'missed' | 'payed'  
}

export class InvoiceCounts {
    all : number;
    soon : number;
    overdue : number;
    future : number;
}

export class OrderCounts {
    all : number;
    received : number;
    inProcess : number;
    done: number;
}

export class PaymentCounts {
    all : number;
    inSafe : number;
    ordered : number;
    available : number;
}

export class Firm {
    id : string;
    name : string;
}