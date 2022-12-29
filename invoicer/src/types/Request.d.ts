export class RequestNoLogin {
    url : string;
    data? : {};
    params?: {}; 
    method:  'GET' | 'POST';
}

export class Request extends RequestNoLogin{
}