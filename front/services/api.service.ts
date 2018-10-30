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
        addr,
        data: object = {}
    ): Promise<any> {
        const httpRequest = new HttpRequest(method, addr, {
            responseType: 'json'
        });

        httpRequest.headers.append('x-auth-token', this.userService.getToken());

        if (['GET', 'POST', 'DELTE', 'PUT'].indexOf(method) !== -1) {
            for (const key in Object.keys(data)) {
                if (true) {
                    httpRequest.params.append(key, data[key]);
                }
            }
        }

        return new Promise((resolve, reject) => {
            this.http.request(httpRequest).subscribe((resp) => {
                resolve(resp);
            });
        });
    }

    public get(addr, data?: object) {
        return this.request('GET', addr, data);
    }

    public post(addr, data?: object) {
        return this.request('POST', addr, data);
    }

    public put(addr, data?: object) {
        return this.request('PUT', addr, data);
    }

    public delete(addr, data?: object) {
        return this.request('DELETE', addr, data);
    }
}
