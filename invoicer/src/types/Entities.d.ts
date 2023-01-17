import type { responseError } from "src/consts";

export class Transport {
    id : number;
    licenseNumber : string;
    name : string;
    transportBrandId : number;
    transportTypeId : number;
    brandName : string;
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
    date? : string;
    truck? : Transport;
    trailer? : Transport;
    person? : Person;
    downloadAddress : string;
    unloadAddress : string;
    price: number;
    currency : 'EUR' | 'USD';
    paymentTerms: string;
}

export class CMR {
    externalNumber : string;
    transport: Transport;
    image: string;
    order? : Order
}

export class Invoice {
    number: string;
    creationDate: string;
    paymentDate : string;
    order : Order;
    cmr? : CMR;
    paymentTerms : string;
    status : 'created' | 'missed' | 'payed'  
}

export class InvoiceMini {
    id : number;
    number: string;
    price: number;
    date: string;
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
    messageCount? : number
}

export class Response<T> {
    error : responseError | null;
    result : T
}