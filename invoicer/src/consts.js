export const HostApiUrl = 'https://192.168.0.164:3000/';

// ! res codes
export const NOTFOUND = 404;
export const INTERNAL_SERVER_ERR = 500;
export const FORBIDDEN_ERR = 403;
export const OK_RES = 200;

// ! transport type 
export const TRANSPORT_TRUCK = 1;
export const TRANSPORT_TRAILER = 2;

/** @typedef {{code : number , message : string}} responseError */

// ! responses
export const unreachableError = { code: 0, message: 'Server is not reachable' };
export const userExists = { code: 1, message: "This login is already used" };
export const notValidPassword = { code: 2, message: 'This password is not valid' };
export const needRealLogin = { code: 3, message: 'You need to create new login' };
export const userNotFound = { code: 4, message: 'User was not found please check your data' };
export const entityAlreadyExists = { code: 5, message: 'This entity already exists' };
export const dataDuplication = { code: 6, message: 'Entity data duplication' };
export const entityIsUsed = { code: 7, message: 'Entity is used' }
export const notLatinSymbol = { code: 8, message: 'Some entity uses not latin symbols' };
export const notValidLogin = { code: 9, message: 'This login is not valid' };

// ! tags
export const driverTag = 'driver';
export const casherTag = 'casher';

// ! contact data type
export const emailDataType = 1;
export const phoneDataType = 2;

// ! sliders
export const messagesSlide = 0;
export const invoiceSlide = 1;
export const orderSlide = 2;
export const paymentSlide = 3;
export const transactionSlide = 4;

// ! path
export const mobile = '/mobile';
export const messages = '/messages';
export const invoices = '/invoices';
export const orders = '/orders';
export const transactions = '/transactions';
export const payments = '/payments';
export const drivers = '/drivers';
export const cmrs = '/cmrs';
export const trucks = '/trucks';
export const trailers = '/trailers';
export const settings = '/settings';
export const pocket = '/pocket';
export const cmr = '/cmr';
export const truck = '/truck';
export const trailer = '/trailer';
export const driver = '/driver';
export const invoice = '/invoice';
export const order = '/order';
export const payment = '/payment';
export const transaction = '/transaction';

export const mobileDrivers = mobile + drivers;
export const mobileCmrs = mobile + cmrs;
export const mobileTrucks = mobile + trucks;
export const mobileTrailers = mobile + trailers;
export const mobilePocket = mobile + pocket;
export const mobileSettings = mobile + settings;

export const maxMessagesCount = 1;

// ! 
export const paymentIban = 1;

// ! address type
export const postalAddressType = 1;
export const legalAddressType = 2;


export const responseErrors = [
    userExists, notValidPassword, needRealLogin, userNotFound, entityAlreadyExists, dataDuplication, entityIsUsed, notLatinSymbol
]
