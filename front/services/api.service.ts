import { Injectable } from '@angular/core';

import {
    HttpClient,
    HttpRequest
} from '@angular/common/http';
import { UserService } from './user.service';

export class ApiInstance {
    public url: string;
    private api: ApiRequester;

    constructor (api: ApiRequester) {
        this.api = api;
    }

    public get(url, data?: object): Promise<any> {
        return this.api.get(this.url + url, data);
    }

    public post(url, data?: object): Promise<any> {
        return this.api.post(this.url + url, data);
    }

    public put(url, data?: object): Promise<any> {
        return this.api.put(this.url + url, data);
    }

    public delete(url, data?: object): Promise<any> {
        return this.api.delete(this.url + url, data);
    }
}

export class ApiRequester {
    private http: HttpClient;
    private userService: UserService;

    constructor(http: HttpClient, userService: UserService) {
        this.http = http;
        this.userService = userService;
    }

    private request(
        method,
        url,
        data = {}
    ): Promise<any> {
        const requestOptions = {
            headers: {},
            params: {},
            body: {},
            responceType: 'json'
        };

        const userToken = this.userService.getToken();
        if (userToken) {
            requestOptions.headers['x-auth-token'] = userToken;
        }

        if (method === 'GET') {
            for (const key of Object.keys(data)) {
                requestOptions.params[key] = data[key];
            }
        } else if (['POST', 'PUT', 'DELETE'].indexOf(method) !== -1) {
            for (const key of Object.keys(data)) {
                requestOptions.body[key] = data[key];
            }
        }

        return new Promise((resolve, reject) => {
            this.http.request(method, url, requestOptions).toPromise().then((responce: any) => {
                if (responce.code && (responce.code + '').startsWith('2')) {
                    resolve(responce);
                } else {
                    reject(responce);
                }
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public get(url, data?: object): Promise<any> {
        return this.request('GET', url, data);
    }

    public post(url, data?: object): Promise<any> {
        return this.request('POST', url, data);
    }

    public put(url, data?: object): Promise<any> {
        return this.request('PUT', url, data);
    }

    public delete(url, data?: object): Promise<any> {
        return this.request('DELETE', url, data);
    }
}

@Injectable()
export class ApiService {
    private apiInstances = {};
    private defaultApiInstance: ApiInstance;
    private apiRequester: ApiRequester;

    constructor(private http: HttpClient, private userService: UserService) {
        this.apiRequester = new ApiRequester(http, userService);
        this.defaultApiInstance = new ApiInstance(this.apiRequester);
    }

    public get(url, data?: object): Promise<any> {
        return this.defaultApiInstance.get(url, data);
    }

    public post(url, data?: object): Promise<any> {
        return this.defaultApiInstance.post(url, data);
    }

    public put(url, data?: object): Promise<any> {
        return this.defaultApiInstance.put(url, data);
    }

    public delete(url, data?: object): Promise<any> {
        return this.defaultApiInstance.delete(url, data);
    }

    public setDefaultApiInstanceUrl(url: string): void {
        this.defaultApiInstance.url = url;
    }

    public createApiInstance(name: string, url: string): ApiInstance {
        this.apiInstances[name] = new ApiInstance(this.apiRequester);
        this.apiInstances[name].url = url;
        return this.apiInstances[name];
    }

    public getApiInstance(name: string): ApiInstance {
        return this.apiInstances[name];
    }
}
