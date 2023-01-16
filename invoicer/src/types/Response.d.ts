export class AppResponse {
    code? : number;
    message? : string;
    token? : string;
}

export type ResponseStatus = 'done' | 'inProcess' | 'none';