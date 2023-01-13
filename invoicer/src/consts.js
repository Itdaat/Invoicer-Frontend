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

export const responseErrors = [
    userExists, notValidPassword, needRealLogin, userNotFound, entityAlreadyExists, dataDuplication, entityIsUsed, notLatinSymbol
]
