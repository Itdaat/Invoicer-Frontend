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
    id : number;
    firstName : string; 
    lastName: string;
    telNumber: string;
    nickname : string;
    isUsed : boolean;
    phone : ContactData;
    email : ContactData;
    tags : Tag[];
}

export class ContactData {
    id : number;
    contactDataTypeId : number;
    value : string;
}

export class Tag {
    id : number;
    name : string;
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
    id : number;
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
	length: number;
}

export class Response<T> {
    error : responseError | null;
    result : T
}

export class Address {
    country : string;
    town : string;
    street : string;
    postCode : string;
    houseNumber : string;
}