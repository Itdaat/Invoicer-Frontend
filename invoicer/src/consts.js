export const ServerApiUrl = 'localhost:3000/';

// ! res codes
export const NOTFOUND = 404;
export const INTERNAL_SERVER_ERR = 500;
export const FORBIDDEN_ERR = 403;
export const OK_RES = 200;

// ! responses
export const userExists = { code: 1, message: "This login is already used" };
export const notValidPassword = { code: 2, message: 'This password is not valid' };
export const needRealLogin = { code: 3, message: 'You need to create new login' };
export const userNotFound = { code: 4, message: 'User was not found please check your data' };
export const entityAlreadyExists = { code: 5, message: 'This entity already exists' };
export const dataDuplication = { code: 6, message: 'Entity data duplication' };
export const entityIsUsed = { code: 7, message: 'Entity is used' }
export const notLatinSymbol = { code: 8, message: 'Some entity uses not latin symbols' };
