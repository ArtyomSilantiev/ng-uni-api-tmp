import { Injectable } from '@angular/core';

import {
    HttpClient,
    HttpRequest
} from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient, private userService: UserService) {}

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

    public get(url, data?: object) {
        return this.request('GET', url, data);
    }

    public post(url, data?: object) {
        return this.request('POST', url, data);
    }

    public put(url, data?: object) {
        return this.request('PUT', url, data);
    }

    public delete(url, data?: object) {
        return this.request('DELETE', url, data);
    }
}
